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

## Snapshots of the tictactoe app

Login page:

![logi page tictactoe](https://user-images.githubusercontent.com/68924449/186937968-11f82d84-702b-4b0c-b127-89fcfdf37762.png)

Once logged in:

![board page](https://user-images.githubusercontent.com/68924449/186938061-98621fb6-9914-42de-aa95-020a6b9f3c12.png)
