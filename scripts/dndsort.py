import csv
import json
import re

csv_file = 'new_monster_data.csv'  # CSV file path
json_file = 'monster_data.json'  # JSON output file path

data = {}
data["monsters"] = []

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        name = row['Name'] if row['Name'] else ''
        monster_type = row['Type'] if row['Type'] else ''

        # Remove anything within parentheses in the "Type" field
        monster_type = re.sub(r'\(.*?\)', '', monster_type).strip()

        # Skip if "legacy" is in the monster's name
        if "legacy" not in name.lower():
            monster = {
                "name": name,
                "size": row['Size'] if row['Size'] else '',
                "type": monster_type,
                "alignment": row['Alignment'] if row['Alignment'] else '',
                "ac": row['AC'] if row['AC'] else '',
                "hp": row['HP'] if row['HP'] else '',
                "movement": row['Movement'] if row['Movement'] else '',
                "legendary": row['Legendary'] if row['Legendary'] else '',
                "cr": row['CR'] if row['CR'] else '',
                "source": row['Sourcebook'] if row['Sourcebook'] else '',
            }
            data["monsters"].append(monster)

# Write data to JSON file
with open(json_file, 'w', encoding='iso-8859-1') as f:
    json.dump(data, f, indent=4)
