import glob
import requests
import base64
import os
from collections import defaultdict
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)
PA_TOKEN = os.environ.get("PA_TOKEN")

training_data_path = join(dirname(__file__),'../data/training_data.csv')
outfile = open(training_data_path, "w")

BASE_URL = "https://api.github.com"
gql_url = f"{BASE_URL}/graphql"

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

column_headers = ["Username", "Id", "Contributions", "JavaScript", "Python", "Java", "C#", "PHP", "TypeScript", "Ruby", "C++", "C", "Swift", "Go", "Shell", "Kotlin", "Rust", "PowerShell", "Objective-C", "R", "MATLAB", "Dart", "Vue", "Assembly", "Sass", "CSS", "HTML", "Pascal", "Racket", "Zig", "Other"]
knownLangs = set(column_headers)

outfile.write(','.join(column_headers) + '\n')


# begin by querying v3 api for 20 users
def fetch_userid_list(since):
    userid_fetch_response = requests.get(f"{BASE_URL}/users?per_page=20&since={since}", headers=headers)
    ids = []
    last_id = 1

    if userid_fetch_response.status_code == 200:
        result = userid_fetch_response.json()

        for user in result:
            # print(user['node_id'])
            ids.append(user['node_id'])
            last_id = int(str(base64.b64decode(user['node_id'])).split('r')[-1].split('n')[-1][:-1])

    else:
        print(f"Request failed with status code {userid_fetch_response.status_code}")
        print(userid_fetch_response.text)
        raise ValueError
    
    return (ids, last_id)


# queries github API using graphQL. Data is parsed into CSV file format
def gql_to_csv():
    response = requests.post(gql_url, headers=headers, json=data)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        result = response.json()
        
        try:
            print(result['data']['nodes'][0]['login'])
        except:
            print("Could not obtain first username of batch")

        # write to CSV
        for node in result['data']['nodes']: # each user/org in the list. Remove orgs and users with no pinned repos.
            
            try:
                username = node['login']
            except:
                print("An error occurred with the API")
                continue
            
            dec_id = str(base64.b64decode(node['id']))
            acc_type = dec_id[5:9] if dec_id[5] == 'U' else dec_id[5:17]
            
            if acc_type != 'User':
                continue

            id = int(str(base64.b64decode(node['id'])).split('r')[1][:-1])
            contributions = node['contributionsCollection']['contributionCalendar']['totalContributions']
            line = f"{username},{id},{contributions}"

            langs = defaultdict(int)
            pinned_projects = node['pinnedItems']['nodes']
            
            if len(pinned_projects) == 0:
                continue

            for i in range(len(pinned_projects)): # all pinned projects
                for j in range(len(node['pinnedItems']['nodes'][i]['languages']['nodes'])): # all languages in project
                    lang = node['pinnedItems']['nodes'][i]['languages']['nodes'][j]['name']
                    b = node['pinnedItems']['nodes'][i]['languages']['edges'][j]['size']
                    langs[lang] += b
                    if lang not in knownLangs:
                        langs["Other"] += b

            for x in column_headers[2:]:
                line += "," + str(langs[x])
            outfile.write(line + '\n')

    else:
        print(f"Request failed with status code {response.status_code}")
        print(response.text)
        raise ValueError


def main():
    last_id = 0

    for i in range(4000):
        variables['ids'], last_id = fetch_userid_list(last_id)
        gql_to_csv()
        print(f"done batch {i+1}")

    outfile.close()


if __name__ == '__main__':
    main()