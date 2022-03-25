import json
from flask import Flask
import pandas as pd
from random import uniform
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

print(__name__)

@app.route("/")
def live():
    return "live"


def randomize_payments(records):
    random_coefficient = 1 + uniform(-0.1, 0.1)
    df = pd.DataFrame.from_dict(records)
    for col in [c for c in df.columns if c.startswith('tenant_')]:
        df[col] = df[col].apply(lambda x: round(x * random_coefficient, 2))
    return json.loads(df.to_json(orient='records'))


@app.route('/get_dataset', methods=['GET'])
def get_dataset():
    data = json.loads(open('./data.json').read())
    data['payments'] = randomize_payments(data['payments'])
    return data
