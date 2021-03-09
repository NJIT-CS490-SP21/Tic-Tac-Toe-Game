import os
from flask import Flask, send_from_directory, json, session, request
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

app = Flask(__name__, static_folder='./build/static')

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
import models
db.create_all()

cors = CORS(app, resources={r"/*": {"origins": "*"}})
userIDs = {}
usernames = []
scores = []
score_received = 0
update_user = []

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    #if request.sid not in server_ids.keys():
    #    server_ids[request.sid] = {sid: request.sid}
    print('User connected!')
    
# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('tic')
def on_click(data): # data is whatever arg you pass in your emit call on client
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('tic',  data, broadcast=True, include_self=False)

@socketio.on('logging')
def logging_in(data):

    name = data['username']
    userlist = data['userlist']
    
    if len(userIDs) == 0:
        db.session.query(models.Person).delete()
        db.session.commit()
    
    #adding new user to DB if they are not there already
    if str(request.sid) not in userIDs.keys():
        userIDs[str(request.sid)] = name
        new_user = models.Person(username=name, score=100)
        db.session.add(new_user)
        db.session.commit()

    new_player = db.session.query(models.Person).filter_by(username=name).first()
    new_player_name = new_player.username
    new_player_score = new_player.score
    
    usernames.append(new_player_name)
    scores.append(new_player_score)
    
    update_user = [usernames, scores]

    socketio.emit('update_score', update_user, broadcast=True, include_self=True)
    socketio.emit('logging', name, room=request.sid)
    socketio.emit('userlist', userlist, broadcast=True, include_self=True)
    socketio.emit('username', name, room=request.sid)

@socketio.on('gameover')
def update_score(data):

    global score_received
    global update_user
    
    if score_received < 2:
        
        player = db.session.query(models.Person).filter_by(username=data["username"]).first()
        print(player)
        if data['iWon']:
            player.score = player.score +1
        else:
            player.score = player.score -1
        db.session.commit()
    
        all_scores = (db.session.query(models.Person)
                    .order_by(models.Person.score.desc())
                    )

        score_received += 1
        
        if score_received == 2:
            usernames.clear()
            scores.clear()
            update_user.clear()
            for each in all_scores:
                usernames.append(each.username)
                scores.append(each.score)
            update_user = [usernames, scores]
        
            print(update_user)
            socketio.emit('update_score', update_user, broadcast=True, include_self=True)
        
@socketio.on('reset')
def reset(data):
    global score_received
    score_received = 0
    usernames.clear()
    scores.clear()
    update_user.clear()
    socketio.emit('reset', data, broadcast=True, include_self=True)

if __name__ == "__main__":
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )