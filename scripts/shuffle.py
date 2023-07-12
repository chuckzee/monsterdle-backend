import json
import random

# Path to your monster_data.json file
monster_data_path = '../data/monster_data.json'

# Read the file and parse it into a Python dict
with open(monster_data_path, 'r') as f:
    monster_data = json.load(f)

# Shuffle the monsters list
random.shuffle(monster_data['monsters'])

# Write the shuffled data back to the file
with open(monster_data_path, 'w') as f:
    json.dump(monster_data, f, indent=2)
