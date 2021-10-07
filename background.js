function triggerHowrare() {
  function getColor(value){
    if(value < 0.20)
    	return "rgb(0," + Math.round(50+value*1000) + ",0)";
    var hue=((1-value)*110).toString(10);
    return ["hsl(",hue,",50%,60%)"].join("");
  }
  function getWeight(value){
    if(value > 0.85)
    	return 135;
    return (1-value)*900;
  }

  if (window.location.href.normalize().includes("https://digitaleyes.market/collections/".normalize())
   || window.location.href.normalize().includes("https://market.solanamonkey.business/".normalize())) {
    function displayHowrare() {
      items = Array.prototype.slice.call(document.querySelectorAll('p'))
        .filter(domElt => /\d/.test(domElt.innerText))

      if (window.location.href.includes("SolBear")) {
        const url = chrome.runtime.getURL('/rarity/solbears.json');
  
        fetch(url)
            .then((response) => response.json()) //assuming file contains json
            .then((solbears) => {
              items.forEach(domItem => {
                if (!domItem.isRarityDisplayed && domItem.innerText.includes('#')) {
                  itemId = domItem.innerText.replace(/[^0-9]/g,'');
                  domItem.innerText = domItem.innerText + " (rarity: " + solbears[itemId] + ")";
                  domItem.isRarityDisplayed = true;
              }
          })
        });
      } else if (window.location.href.includes("Rox")) {
        const url = chrome.runtime.getURL('/rarity/rox.json');
  
        fetch(url)
            .then((response) => response.json()) //assuming file contains json
            .then((roxes) => {
              items.forEach(domItem => {
                if (!domItem.isRarityDisplayed && domItem.innerText.includes('#')) {
                  itemId = parseInt(domItem.innerText.replace(/[^0-9]/g,''));
                  if (roxes[itemId] && roxes[itemId] < 40) {
                    domItem.innerText = domItem.innerText + " (rank: " + roxes[itemId] + ")";
                  } else {
                    //domItem.innerText = domItem.innerText + " (rank: unknown)";
                    domItem.parentNode.parentNode.parentNode.parentNode.remove();
                  }
                  domItem.isRarityDisplayed = true;
              }
          })
        });
      } else if (window.location.href.includes("SUNKS")) {
        const url_first = chrome.runtime.getURL('/rarity/sunks_first.json');
        const url_rarity = chrome.runtime.getURL('/rarity/sunks_rarity.json');

        fetch(url_first)
            .then((response) => response.json()) //assuming file contains json
            .then((sunks) => {
              fetch(url_rarity)
                .then((response) => response.json())
                .then((rarity) => {
                  items.forEach(domItem => {
                    if (!domItem.isRarityDisplayed && domItem.innerText.includes('SUNK')) {
                      itemId = parseInt(domItem.innerText.replace(/[^0-9]/g,''));
                      console.log(rarity, itemId)
                      if (sunks.includes(parseInt(itemId))) {
                        domItem.innerText = domItem.innerText + " (first drop, rarity: " + rarity[itemId] + ")";
                      } else {
                        domItem.innerText = domItem.innerText + " (second drop, rarity: " + rarity[itemId] + ")";
                        //domItem.parentNode.parentNode.parentNode.parentNode.remove();
                      }
                      domItem.isRarityDisplayed = true;
                  }
                })
          })
        });
      } else if (window.location.href.includes("Solana%20Souls")) {
        const url = chrome.runtime.getURL('/rarity/solsouls.json');

        fetch(url)
            .then((response) => response.json()) //assuming file contains json
            .then((souls) => {
              items.forEach(domItem => {
                if (!domItem.isRarityDisplayed && domItem.innerText.includes('#')) {
                  itemName = domItem.innerText;
                  if (souls[itemName]) {
                    domItem.innerText = domItem.innerText + " (rarity: " + souls[itemName] + ")";
                  } else {
                    domItem.innerText = domItem.innerText + " (rarity: random)";
                  }
                  domItem.isRarityDisplayed = true;
              }
          })
        });
      } else if (window.location.href.includes("solanamonkey.business")) {
        items = Array.prototype.slice.call(document.querySelectorAll('h3'))
          .filter(domElt => /\d/.test(domElt.innerText))
        const url = chrome.runtime.getURL('/rarity/smb.json');
  
        fetch(url)
            .then((response) => response.json()) //assuming file contains json
            .then((smb) => {
              items.forEach(domItem => {
                if (!domItem.isRarityDisplayed && domItem.innerText.includes('#')) {
                  let itemId = domItem.innerText.replace(/[^0-9]/g,'');
                  let pc = smb[itemId]/5000;
                  domItem.innerText = domItem.innerText + " (top " + Math.round(pc*100) + "%)";
                  domItem.style.color = getColor(pc);
                  domItem.style.fontWeight = getWeight(pc);
                  domItem.isRarityDisplayed = true;
              }
          })
        });
      } else {
        console.error('Collection has not been added yet.')
      }
    }

    window.addEventListener('scroll', function(e) {
      displayHowrare()
    });
    
    displayHowrare()
  }
  else {
    console.log('Not on Digitaleyes.')
  }
};

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: triggerHowrare
  });
});