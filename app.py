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

cors = CORS(app, resources={r"/*": {"origins": "*"}})
userIDs = {}
users = []

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
    if request.sid in userIDs.keys():
        userToDelete = userIDs[str(request.sid)]
        del userIDs[str(request.sid)]
        users.remove(userToDelete)
    socketio.emit('userlist', users , broadcast=True, include_self=True)

# When a client emits the event 'chat' to the server, this function is run
# 'chat' is a custom event name that we just decided
@socketio.on('tic')
def on_click(data): # data is whatever arg you pass in your emit call on client
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('tic',  data, broadcast=True, include_self=False)

@socketio.on('logging')
def logging_in(data): # data is whatever arg you pass in your emit call on client
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    new_user = models.Person(username=data['userName'], score=100)
    db.session.add(new_user)
    db.session.commit()
    everyone = models.Person.query.all()
    for person in everyone:
        print(person.username)
        print(person.score)
    
    name = data['userName']
    if str(request.sid) not in userIDs.keys():
        userIDs[str(request.sid)] = name
        users.append(name)
    socketio.emit('logging', users, room=request.sid)
    socketio.emit('username', name, room=request.sid)
    socketio.emit('userlist', users , broadcast=True, include_self=True)

@socketio.on('reset')
def reset(data): # data is whatever arg you pass in your emit call on client
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('reset', data, broadcast=True, include_self=True)

if __name__ == "__main__":
    models.db.create_all()
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )