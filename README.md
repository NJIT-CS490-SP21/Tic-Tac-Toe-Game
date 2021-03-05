# Flask and create-react-app

## Requirements
1. `npm install`
2. `pip install -r requirements.txt`

## Setup
1. Run `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local` in the project directory

## Run Application Locally
1. Run command in terminal (in your project directory): `python app.py`
2. Run command in another terminal, `cd` into the project directory, and run `npm run start`
3. Preview web page in browser '/'

## Deploy to Heroku
1. Run command in terminal to install Heroku CLI: npm install -g heroku
2. Create an account on Heroku: https://signup.heroku.com/login
3. Log in to Heroku in terminal: heroku login -i
4. Create your Heroku app: heroku create --buildpack heroku/python
5. Add nodejs buildpack: heroku buildpack:add -- index 1 heroku/nodejs
6. Push to Heroku: git push heroku milestone_1:main

## Known Problems
1. Although the code runs an if statement checking for inputRed as null, the user is allowed to log in with an empty username. The code should work in theory, but the problem wasn't able to be addressed on time. It is not something that is specified on the specs to not accept empty usernames, so for the next milestone, I can find where the error is by printing out console.log messages. Or, I can try to make if statements with empty string instead of checking if InputRef is null. 
2. From my app.py file, I pass an array of usernames to my App.js. It would be better practice and code to pass a dictionary instead so that I am able to keep track of Player X, Player Y, and spectators more easily. Currently, I pass a prop value (from App.js to Board.js)to distinguish if they are X or Y. In order to give scores to each player, I would need to distinguish who is Player X and who is Player O. Creating a dictionary would solve any complications and make the code more readable. Following is an example: {"Player X": "firstuser", "Player O":"seconduser" , "Spectators": [ "someone else", "another one"]}
3. The code can be more modular. CalculateWinner, GetStatus, and ResetBoard can definitely be separate components. Passing values from Board.js would be the most troublesome, so I would first look at the values to be passed down to address this.

## Technical Issues
1. At first, I was confused on how socketio.emit worked. I used the following doc to learn more about it: https://flask-socketio.readthedocs.io/en/latest/. I was trying to emit back information from app.py to the client without broadcasting to all users. Although my broadcast was equal to false, it still wasn't working. I found out that I can utilize rooms, so I decided to use that. I also found how to utilize request.sid to easily identify which clients to send it to (https://gist.github.com/ericremoreynolds/dbea9361a97179379f3b).
2. React components have to be in a closing tag. I was getting JSX errors because I wasn't doing this. I copied and pasted the error to find this documentation on it, which helped me understand better: https://stackoverflow.com/questions/31284169/parse-error-adjacent-jsx-elements-must-be-wrapped-in-an-enclosing-tag.
3. I would have minor issues where the code will not do what I wanted. For example, infinite redendering errors and JSX errors. For most of them, I used console.log to solve them. If that did not work, I googled the error message. 
4. I had some trouble when trying to define my Square component. The onClick functionality was not working for some reason. I tried to rewatch the lectures from class to understand props better since that was what was used for ListItem example. I ended up googling it to learn more and made it work after some time.

