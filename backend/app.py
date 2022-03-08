from flask import Flask

app = Flask(__name__)

@app.route("/")
def live():
    return "live"

@app.route('/get_dataset', methods=['GET'])
def get_dataset():
    return {}