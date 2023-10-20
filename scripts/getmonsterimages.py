import json
import requests
import time

# Load the data
with open('monster_data.json') as f:
    data = json.load(f)

# Your Bing Search v7 subscription key and endpoint
subscription_key = "your key here"
endpoint = 'https://api.bing.microsoft.com/v7.0/images/search'

# Initialize a counter
counter = 0

# For each monster
for monster in data['monsters']:
    # Check if we have already processed 5 monsters
    if counter >= 5:
        break

    # Query term(s) to search for. 
    query = monster['name'] + ' monster D&D 5e'

    # Construct a request
    mkt = 'en-US'
    params = { 'q': query, 'mkt': mkt }
    headers = { 'Ocp-Apim-Subscription-Key': subscription_key }

    response = requests.get(endpoint, headers=headers, params=params)
    response.raise_for_status()

    # Get the URL of the first image result
    image_url = response.json()['value'][0]['contentUrl']

    # Add the URL to the monster's data
    monster['image'] = image_url

    print(monster['name'], image_url)

    # Pause for 0.33 seconds
    time.sleep(0.01)

# Save the updated data
with open('monster_data.json', 'w') as f:
    json.dump(data, f, indent=4)