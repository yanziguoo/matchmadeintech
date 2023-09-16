from flask import Flask
import requests
import pickle
import os
import base64
from collections import defaultdict
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

column_headers = ["Username", "Id", "Contributions", "JavaScript", "Python", "Java", "C#", "PHP", "TypeScript", "Ruby", "C++", "C", "Swift", "Go", "Shell", "Kotlin", "Rust", "PowerShell", "Objective-C", "R", "MATLAB", "Dart", "Vue", "Assembly", "Sass", "CSS", "HTML", "Pascal", "Racket", "Zig", "Other"]
knownLangs = set(column_headers)

gql_query = """
query GetUser($username: String!) {
    user: user(login: $username) { # my username
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
    
    user_csv = "";
    response = requests.post("https://api.github.com/graphql", headers=headers, json=data)
    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        result = response.json()
    
        try:
            login = result['data']['user']['login']
            id = int(str(base64.b64decode(result['data']['user']['id'])).split('r')[-1].split('n')[-1][:-1])
            contributions = result['data']['user']['contributionsCollection']['contributionCalendar']['totalContributions']
        except:
            return {"success":False, "message":"Invalid user"}

        langs = defaultdict(int)
        num_bytes = 0
        pinned_projects = result['data']['user']['pinnedItems']['nodes']

        for i in range(len(pinned_projects)): # all pinned projects
            for j in range(len(pinned_projects[i]['languages']['nodes'])): # all languages in project
                lang = pinned_projects[i]['languages']['nodes'][j]['name']
                b = pinned_projects[i]['languages']['edges'][j]['size']
                num_bytes += b
                if lang in knownLangs:
                    langs[lang] += b
                else:
                    langs["Other"] += b

        if num_bytes == 0:
            return {"success":False, "message":"User has no pinned projects..."}

        user_csv = f"{login},{id},{contributions}"
        for x in column_headers[2:]:
            user_csv += "," + str(langs[x])
    else:
        print(f"Request failed with status code {response.status_code}")
        print(response.text)
        raise ValueError

    return {"success":True, "message":user_csv}


def standardize(data):
    print(means)


@app.route('/find_matches/<username>')
def find_matches(username):
    global model, means

    data = standardize(get_user(username))
    print(model.cluster_centers_)

    return data

