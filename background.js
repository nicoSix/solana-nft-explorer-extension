function triggerHowrare() {
  if (window.location.href.normalize().includes("https://digitaleyes.market/collections/".normalize())) {
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
                  if (roxes[itemId]) {
                    domItem.innerText = domItem.innerText + " (rarity: " + roxes[itemId] + ")";
                  } else {
                    domItem.innerText = domItem.innerText + " (rarity: random)";
                  }
                  domItem.isRarityDisplayed = true;
              }
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