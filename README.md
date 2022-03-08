# Instructions
Please fork this repository and submit your task as a github pull request.  
Your fronend application should be implemented in the "frontend" directory.  
You are provided with an implemented simple backend app to be used to fetch the dataset. You can modify it as you wish.

# Running the backend app
## Dependencies
python 3.8

## Install python requirements
`pip install -r ./backend/requirements.txt`

## Start app
```bash
cd backend
flask run
```

app will be exporsed on port 5000 of localhost.

## Backend APIs
1. `localhost:5000/` - default "live" test API
2. `localhost:5000/get_dataset` - GET API to get the dataset to be used.