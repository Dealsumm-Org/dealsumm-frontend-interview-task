from flask import Flask
import pandas as pd
from random import uniform

app = Flask(__name__)

@app.route("/")
def live():
    return "live"

@app.route('/get_dataset', methods=['GET'])
def get_dataset():
    df = pd.read_csv('./frontend_interview_dataset - payments.csv')
    df.payment_amt = df.payment_amt.apply(lambda x: x * (1 + uniform(-0.1, 0.1)))
    return df.to_json()