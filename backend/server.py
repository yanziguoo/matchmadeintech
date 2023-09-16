from flask import Flask
import requests
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)
PA_TOKEN = os.environ.get("PA_TOKEN")

headers = {
    "Authorization": f"Bearer {PA_TOKEN}",
}

app = Flask(__name__)

@app.route('/')
def hello_world():
  return 'Hello world!'


@app.route('/get_user/<username>')
def get_user(username):
  response = requests.get("https://api.github.com/users/aazzazron", headers=headers)
  return username