# Instructions
Please fork this repository and submit your task as a github pull request.  
Your fronend application should be implemented a "frontend" directory that you should create.
You are provided with an implemented simple backend app to be used to fetch the dataset. You can modify it as you wish.

# Running the backend app
## Dependencies
python 3.8

## Install python requirements
```bash
python3 -m venv ./dealsumm-env
source ./dealsumm-env/bin/activate
pip install -r ./backend/requirements.txt
```

## Start server
```bash
cd backend
flask run
```

app will be exposed on port 5000 of localhost.

## Backend APIs
1. `localhost:5000/` - default "live" test API
2. `localhost:5000/get_dataset` - GET API to get the dataset to be used.
