import requests

import os
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
    for node in result['data']['nodes']:
        outfile.write(f"{node['login']}\n")

    
else:
    print(f"Request failed with status code {response.status_code}")
    print(response.text)


outfile.close()