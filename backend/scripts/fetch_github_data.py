import requests
import base64
import os
from collections import defaultdict
from os.path import join, dirname
from dotenv import load_dotenv

training_data_path = join(dirname(__file__),'../data/training_data.csv')

dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)

PA_TOKEN = os.environ.get("PA_TOKEN")
print(PA_TOKEN)


outfile = open(training_data_path, "w")

query = """
query($ids:[ID!]!) {
    nodes(ids:$ids) {
        ... on User {
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
}
"""

BASE_URL = "https://api.github.com"
gq_url = f"{BASE_URL}/graphql"
users_url=f"{BASE_URL}/users?per_page=25&since=0"

headers = {
    "Authorization": f"Bearer {PA_TOKEN}",
}

variables = {
    "ids": []
}

data = {
    'query': query,
    'variables': variables,
}

# begin by querying v3 api for 25 users
userid_fetch_response = requests.get(users_url, headers=headers)

ids = []

if userid_fetch_response.status_code == 200:
    result = userid_fetch_response.json()

    for user in result:
        # print(user['node_id'])
        ids.append(user['node_id'])

else:
    print(f"Request failed with status code {userid_fetch_response.status_code}")
    print(userid_fetch_response.text)


# print(ids)

variables['ids'] = ids

response = requests.post(gq_url, headers=headers, json=data)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    result = response.json()
    print(result)

    column_headers = ["Username", "Id", "JavaScript", "Python", "Java", "C#", "PHP", "TypeScript", "Ruby", "C++", "C", "Swift", "Go", "Shell", "Kotlin", "Rust", "PowerShell", "Objective-C", "R", "MATLAB", "Dart", "Vue", "Assembly", "Sass", "CSS", "HTML", "Pascal", "Racket", "Zig", "Other"]
    knownLangs = set(column_headers)

    outfile.write(','.join(column_headers) + '\n')

    # write to CSV

    for node in result['data']['nodes']:
        username = node['login']
        id = int(str(base64.b64decode(node['id'])).split('r')[1][:-1])
        line = f"{username},{id}"
        # id = int(base64.decode(node[id]).split('r')[1])
        langs = defaultdict(int)

        for i in range(len(node['pinnedItems']['nodes'])): # all pinned projects
            for j in range(len(node['pinnedItems']['nodes'][i]['languages']['nodes'])): # all languages in project
                lang = node['pinnedItems']['nodes'][i]['languages']['nodes'][j]['name']
                b = node['pinnedItems']['nodes'][i]['languages']['edges'][j]['size']
                langs[lang] += b
                if lang not in knownLangs:
                    langs["Other"] += b

        for x in column_headers[2:]:
            line += "," + str(langs[x])
        outfile.write(line + '\n')

    outfile.close()

else:
    print(f"Request failed with status code {response.status_code}")
    print(response.text)

