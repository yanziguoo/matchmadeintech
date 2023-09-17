import random
import requests
import os
from collections import defaultdict
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)
PA_TOKEN = os.environ.get("PA_TOKEN")

training_data_path = join(dirname(__file__),'../data/training_data.csv')
outfile = open(training_data_path, "a")

BASE_URL = "https://api.github.com"
gql_url = f"{BASE_URL}/graphql"

query = """
query($ids:[ID!]!) {
    nodes(ids:$ids) {
        ... on User {
            login
            id
            createdAt
            avatarUrl
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
    "X-Github-Next-Global-ID": '1',
}

variables = {
    "ids": []
}

data = {
    'query': query,
    'variables': variables,
}

column_headers = ["Username", "CreatedAt", "AvatarUrl", "Id", "Contributions", "JavaScript", "Python", "Java", "C#", "PHP", "TypeScript", "Ruby", "C++", "C", "Swift", "Go", "Shell", "Kotlin", "Rust", "PowerShell", "Objective-C", "R", "MATLAB", "Dart", "Vue", "Assembly", "Sass", "CSS", "HTML", "Pascal", "Racket", "Zig", "Other"]
knownLangs = set(column_headers)

# outfile.write(','.join(column_headers) + '\n')


# begin by querying v3 api for 20 users
def fetch_userid_list(since):
    userid_fetch_response = requests.get(f"{BASE_URL}/users?per_page=20&since={since}", headers=headers)
    ids = []
    last_id = since + 1

    if userid_fetch_response.status_code == 200:
        result = userid_fetch_response.json()

        for user in result:
            ids.append(user['node_id'])
        last_id += random.randint(10000, 20000)

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
        
        non_users = 0
        try:
            print(result['data']['nodes'][0]['login'])
        except:
            print("Could not obtain first username of batch (most likely not a user)")
            non_users += 1        

        # write to CSV        
        for node in result['data']['nodes']: # each user/org in the list. Remove orgs and users with no pinned repos.
            
            if node is None or not node:
                non_users += 1
                continue
            
            username = node['login']
            createdAt = node['createdAt']
            avatarUrl = node['avatarUrl']
            id = random.randint(1,2)
            contributions = node['contributionsCollection']['contributionCalendar']['totalContributions']
            line = f"{username},{createdAt},{avatarUrl},{id},{contributions}"

            langs = defaultdict(int)
            pinned_projects = node['pinnedItems']['nodes']
            
            num_bytes = 0

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
                continue

            for x in column_headers[5:]:
                line += "," + str(langs[x])
            outfile.write(line + '\n')
        print("non-users %d" % non_users)

    else:
        print(f"Request failed with status code {response.status_code}")
        print(response.text)
        raise ValueError


def main():
    last_id = 22861311

    for i in range(1000):
        variables['ids'], last_id = fetch_userid_list(last_id)
        gql_to_csv()
        print(f"done batch {i+1}")

    outfile.close()


if __name__ == '__main__':
    main()

