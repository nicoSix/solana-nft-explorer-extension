import requests
from bs4 import BeautifulSoup
import re
import json

def getRarities(pageId):
    partial_rarities = {}
    page = requests.get("https://nftrarity.net/cryptopunks?page=" + str(pageId))
    soup = BeautifulSoup(page.text, 'html.parser')
    items = soup.find_all("tr")
    for item in items:
        punk = item.find_all("td")
        if (len(punk)):
            rarity = punk[0].text
            punkId = re.findall('[0-9]+', punk[3].text)[0]
            partial_rarities[punkId] = rarity
    return partial_rarities

with open("sunks_rarity.json", "r") as openfile:
        rarities = json.load(openfile)

for i in range(148,401):
    print(i)
    rarities = {**rarities, **getRarities(i)}

    json_object = json.dumps(rarities, indent = 4)
    # Writing to monkeys.json
    with open("sunks_rarity.json", "w") as outfile:
        outfile.write(json_object)