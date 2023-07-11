import csv
import json

csv_file = 'Monster Spreadsheet (D&D5e) - Official Stats.csv'  # CSV file path
json_file = 'monster_data.json'  # JSON output file path

data = {}
data["monsters"] = []

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        monster = {
            "name": row['Name'],
            "size": row['Size'],
            "type": row['Type'],
            "alignment": row['Align.'],
            "ac": row['AC'],
            "hp": row['HP'],
            "str": row['STR'],
            "dex": row['DEX'],
            "con": row['CON'],
            "int": row['INT'],
            "wis": row['WIS'],
            "cha": row['CHA'],
            "senses": row['Senses'],
            "languages": row['Languages'],
            "type": row['CR'],
            "source": row['Font'],
            "additional": row['Additional'],
        }
        data["monsters"].append(monster)

# Write data to JSON file
with open(json_file, 'w', encoding='iso-8859-1') as f:
    json.dump(data, f, indent=4)
