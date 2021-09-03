import requests
from bs4 import BeautifulSoup
import re
import json

def getRarities(pageId):
    partial_rarities = {}
    page = requests.get("https://howrare.is/solbears/?page=" + str(pageId) + "&ids=&sort_by=rank")
    soup = BeautifulSoup(page.text, 'html.parser')
    items = soup.find_all("div", {"class":"nft-details"})
    for item in items:
        rarity = item.find_all("strong")[0].text
        itemId = re.findall('[0-9]+', item.find("h3").text)[0]
        partial_rarities[itemId] = rarity
    return partial_rarities

rarities = {}
for i in range(0,40):
    rarities = {**rarities, **getRarities(i)}

json_object = json.dumps(rarities, indent = 4)
# Writing to monkeys.json
with open("solbears.json", "w") as outfile:
    outfile.write(json_object)