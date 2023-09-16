from flask import Flask
import requests
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)
PA_TOKEN = os.environ.get("PA_TOKEN")

gql_query = """
{
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

headers = {
    "Authorization": f"Bearer {PA_TOKEN}",
}

data = {
    'query': gql_query,
}

app = Flask(__name__)

@app.route('/')
def hello_world():
  return 'Hello world!'


@app.route('/get_user/<username>')
def get_user(username):
  response = requests.post("https://api.github.com/graphql", headers=headers, json=data)
  # Check if the request was successful (status code 200)
  if response.status_code == 200:
      result = response.json()
      print(result)
  return response.json()
