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
score_received = 0
userlist = {"X": None, "O": None, "Spectators": []}

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

def players_from_db():
    all_players = (db.session.query(models.Person)
            .order_by(models.Person.score.desc())
            )
           
    return all_players
            
def collect_usernames(all_players_info):
    
    usernames = []
 
    for each in all_players_info:
        usernames.append(each.username)

    return usernames
    
def collect_scores(all_players_info):
    
    scores = []
 
    for each in all_players_info:
        scores.append(each.score)

    return scores
    
def update_db_score(username, win_status):
    player = db.session.query(models.Person).filter_by(username=username).first()
    if win_status:
        player.score = player.score +1
    else:
        player.score = player.score -1
    db.session.commit()

def check_if_exists(username):
    exists = db.session.query(models.Person).filter_by(username=username).first()
    return exists
    
def add_user_to_db(username):
    new_user = models.Person(username=username, score=100)
    db.session.add(new_user)
    db.session.commit()
    
def add_user(username, userlist):
    if userlist['X'] == None:
        userlist['X'] = username
    elif userlist['O'] == None:
        userlist['O'] = username
    else:
        userlist['Spectators'].append(username)
    
    return userlist

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

    global userlist

    name = data['username']
    userlist = add_user(data['username'], userlist)
    
    update_user = []
    users = []
    scores = []

    exists = check_if_exists(name) #checks for username in the database
    
    #adding new user to DB if they are not there already
    if not exists:
        add_user_to_db(name)
    
    all_players_info = players_from_db() #fetch from database all the players
    users = collect_usernames(all_players_info) #makes score and username lists to be sent to all clients
    scores = collect_scores(all_players_info)
    
    update_user = [users, scores]

    socketio.emit('update_score', update_user, broadcast=True, include_self=True)
    socketio.emit('logging', name, room=request.sid)
    socketio.emit('userlist', userlist, broadcast=True, include_self=True)

@socketio.on('gameover')
def update_score(data):

    global score_received
    if score_received < 2: #Player X and Player O each allowed to send info once 
        
        update_db_score(data["username"], data["iWon"]) #checks for win status and updates score
        score_received += 1
        
        if score_received == 2: #either Player X or Player O, only done once
            all_players_info = players_from_db() #fetch from database all the players
            update_user = list_player_info(all_players_info) #makes score and username lists to be sent to all clients
            
            socketio.emit('update_score', update_user, broadcast=True, include_self=True)

@socketio.on('reset')
def reset(data):
    global score_received
    score_received = 0
    socketio.emit('reset', data, broadcast=True, include_self=True)

if __name__ == "__main__":
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )