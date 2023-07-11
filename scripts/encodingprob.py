filename = 'NEW_Clements-Checklist-v2022-October-2022.csv'
pos = 2315

with open(filename, 'rb') as f:
    f.seek(pos - 10)  # go a bit before the position
    bytes = f.read(30)  # read more bytes
    print(bytes)