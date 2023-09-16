from flask import Flask
import requests
import pickle
import os
from os.path import join, dirname
from dotenv import load_dotenv
from flask_cors import CORS
import pandas as pd


app = Flask(__name__)
CORS(app)

dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)
PA_TOKEN = os.environ.get("PA_TOKEN")

headers = {
    "Authorization": f"Bearer {PA_TOKEN}",
}

gql_query = """
query GetUser($username: String!) {
    user1: user(login: $username) { # my username
        login
        id
        contributionsCollection {
            contributionCalendar {
                totalContributions
            }
        }
        pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
                ... on Repository {
                    name
                    id
                    languages(first: 10) {
                        edges {
                            size
                        }
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    }
}
"""

with open("./data/kmeansmodel.pkl", "rb") as f:
    model = pickle.load(f)
with open("./data/means.csv", "rb") as f:
    means = [float(x) for x in f.readlines()]


@app.route('/')
def hello_world():
  return 'Hello world!'


def get_user(username):
    data = {
      'query': gql_query,
      'variables': {
        "username": username
      }
    }
    
    response = requests.post("https://api.github.com/graphql", headers=headers, json=data)
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        result = response.json()
        print(f"-----------------\n{result}")
    else:
        print(f"Request failed with status code {response.status_code}")
        print(response.text)
        raise ValueError
    return response.json()


def standardize(data):
    print(means)


@app.route('/find_matches/<username>')
def find_matches(username):
    global model, means

    data = standardize(get_user(username))
    print(model.cluster_centers_)

    return data

