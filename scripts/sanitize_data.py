import json
import requests
import time
from urllib.parse import quote

# Load the bird data from the JSON file
with open('bird_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# For each bird in the data...
for bird in data['birds']:  # modified this line
    # Use the bird's name as the search term
    search_term = quote(bird['name'])

    # Try to get the bird's page summary from the Wikipedia API
    response = requests.get(f'https://en.wikipedia.org/api/rest_v1/page/summary/{search_term}?redirect=true')

    # If the response status code is 404, the bird's name is not a valid search term
    if response.status_code == 404:
        bird['valid'] = 'false'
    else:
        bird['valid'] = 'true'

    # Wait for 1 second before the next request
    time.sleep(.1)

# Save the updated data back to the JSON file
with open('bird_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
