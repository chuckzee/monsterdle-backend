import json

# Strings to be removed from the monster names
remove_strings = [
    "Misc. Creature",
    "Lycanthrope",
    "Mind Flayer",
    Metallic",
    "Demon",
    "NPC",
    "Prince of Apocalypse",
    "Sorrowsworn,"
    "Animated Object, ",
    "Assorted Beast, "
]

# Load the data
with open('monster_data.json') as f:
    data = json.load(f)

# For each monster, remove the unwanted strings from its name
for monster in data['monsters']:
    for remove_string in remove_strings:
        monster['name'] = monster['name'].replace(remove_string, '')

# Save the updated data
with open('monster_data.json', 'w') as f:
    json.dump(data, f, indent=4)
