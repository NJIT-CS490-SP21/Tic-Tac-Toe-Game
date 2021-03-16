"""
this is my server python file for my Tic Tac Toe app
"""
import os
from flask import Flask, send_from_directory, json, session, request
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv
import models

load_dotenv(find_dotenv())

APP = Flask(__name__, static_folder='./build/static')

APP.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
APP.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(APP)

db.create_all()

CORS = CORS(APP, resources={r"/*": {"origins": "*"}})
SCORE_RECEIVED = 0
USERLIST = {"X": None, "O": None, "Spectators": []}

SOCKETIO = SocketIO(APP,
                    cors_allowed_origins="*",
                    json=json,
                    manage_session=False)


@APP.route('/', defaults={"filename": "index.html"})
@APP.route('/<path:filename>')
def index(filename):
    """default function"""
    return send_from_directory('./build', filename)

def players_from_db():
    """ database call for all users """
    all_players = (db.session.query(models.Person).order_by(
        models.Person.score.desc()))
    return all_players


def list_player_info(all_players_info):
    """ spits back out usernames and scores arrays """
    scores = []
    usernames = []
    update_user = []

    for each in all_players_info:
        usernames.append(each.username)
        scores.append(each.score)

    update_user = [usernames, scores]

    return update_user


def update_db_score(username, win_status):
    """ depending on win_status, player's score is deducted or increased """
    player = db.session.query(
        models.Person).filter_by(username=username).first()
    if win_status:
        player.score = player.score + 1
    else:
        player.score = player.score - 1
    DB.session.commit()

    return player.username, player.score


def check_if_exists(username):
    """ checks if user is already in databse """
    exists = models.Person.query.filter_by(username=username).first()
    if exists:
        return True
    return False

def add_user_to_db(username):
    """ add new users to database """
    new_user = models.Person(username=username, score=100)
    db.session.add(new_user)
    db.session.commit()
    all_players = models.Person.query.all()
    users = []
    for player in all_players:
        users.append(player.username)

    return users


def add_user(username, userlist):
    """ checks for existing users stored in userlist """
    if userlist['X'] is None:
        userlist['X'] = username
    elif userlist['O'] is None:
        userlist['O'] = username
    else:
        userlist['Spectators'].append(username)

    return userlist


def check_winner(winner, player_x, username):
    """ will only take in player_x username and check if it matches with curr user """
    if winner == "X":
        return username == player_x
    return username != player_x



@SOCKETIO.on('connect')
def on_connect():
    """When a client connects from this Socket connection, this function is run"""
    print('User connected!')


@SOCKETIO.on('disconnect')
def on_disconnect():
    """user disconnect does not work all the time"""
    print('User disconnected!')

@SOCKETIO.on('tic')
def on_click(data):
    """when square in board is clicked, it emits to all clients"""
    SOCKETIO.emit('tic', data, broadcast=True, include_self=False)


@SOCKETIO.on('logging')
def logging_in(data):
    """when new user logs in, userlist is updated and database is called"""

    global USERLIST

    name = data['username']
    USERLIST = add_user(data['username'], USERLIST)

    exists = check_if_exists(name)  #checks for username in the database

    #adding new user to DB if they are not there already
    if not exists:
        add_user_to_db(name)

    all_players_info = players_from_db()  #fetch from database all the players
    update_user = list_player_info(all_players_info)

    SOCKETIO.emit('update_score',
                  update_user,
                  broadcast=True,
                  include_self=True)
    SOCKETIO.emit('logging', name, room=request.sid)
    SOCKETIO.emit('userlist', USERLIST, broadcast=True, include_self=True)


@SOCKETIO.on('gameover')
def update_score(data):
    """when game is over, new scores are calculated and database is updated"""

    global SCORE_RECEIVED
    if SCORE_RECEIVED < 2:  #Player X and Player O each allowed to send info once

        is_winner = check_winner(data["winner"], data["playerX"], data["username"])
        update_db_score(data["username"],
                        is_winner)  #checks for win status and updates score
        SCORE_RECEIVED += 1

        if SCORE_RECEIVED == 2:  #either Player X or Player O, only done once
            all_players_info = players_from_db(
            )  #fetch from database all the players
            update_user = list_player_info(
                all_players_info
            )  #makes score and username lists to be sent to all clients

            SOCKETIO.emit('update_score',
                          update_user,
                          broadcast=True,
                          include_self=True)


@SOCKETIO.on('reset')
def reset(data):
    """resets win data to zero"""
    global SCORE_RECEIVED
    SCORE_RECEIVED = 0
    SOCKETIO.emit('reset', data, broadcast=True, include_self=True)


if __name__ == "__main__":
    SOCKETIO.run(
        APP,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )
