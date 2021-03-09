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

##Deploy to Heroku
1. Run command in terminal to install Heroku CLI: npm install -g heroku
2. Create an account on Heroku: https://signup.heroku.com/login
3. Log in to Heroku in terminal: heroku login -i
4. Create your Heroku app: heroku create --buildpack heroku/python
5. Add nodejs buildpack: heroku buildpack:add -- index 1 heroku/nodejs
6. Push to Heroku: git push heroku milestone_1:main

## Known Problems
1. The code currently is not modular as it can be. Time constraint made me throw in somewhat bad code to try to get it to work. This might've caused inefficiency and slow response.
2. The clients must all be in open tabs before the game can start and for correct behavior to display. If a new client is called during or at a random point during the game, it will enter as Player X instead of a spectator. The code was written with the assumption that all clients at least log in before the game is started.
3. This might not be a problem for the milestone specifically, but there is no way to clear the leaderboard once the users are logged. This can cause a very long leaderboard eventually.

## Technical Issues
1. In the beginning, my socket was emitting infinitely that the game was over. This was because I was emitting in a function. So I tried to put it in useEffect. However, after I decided to put in my useEffect, I wasn't sure what to put in the array. I looked up YouTube videos to understand useEffect more and what to put in the array.
2. I didn't have an understanding of what my CalculatorWinner function did in the beginning. I copied and pasted the code without too much thought for milestone 1. And so when I wrote the function for calculating who won, Player X or Player O, I did not use the winner variable to determine that because I did not know that CalculateWinner actually returns which player won. I checked whose turn it was to determine which player won. And this was creating a lot of trouble for me because it kept switching the winner to an incorrect one and therefore emitted wrong winner to the socket. I was able to find out my issue and utilize the winner variable after looking through the cheat sheet for milestone 1.
3. My leaderboard was not rendering and this was because I put return statements in my onClick function. I went to TA office hours and fixed this issue.
4. In my app.py, the way that I was querying the database and adding to my userscores list was not working out. I wanted to do it so that the userscores list is kept global and I can keep adding to it when new users log in. However, I decided to just regenerate the list by querying from the database whenever the user logs in. The TA in office hours helped me clear up some of my confusion.