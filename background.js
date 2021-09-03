function triggerHowrare() {
  if (window.location.href.normalize() == "https://digitaleyes.market/collections/SolBear".normalize()) {
    function displayHowrare() {
      items = Array.prototype.slice.call(document.querySelectorAll('p'))
        .filter(domElt => /\d/.test(domElt.innerText))
      
        const url = chrome.runtime.getURL('/solbears.json');
    
        fetch(url)
            .then((response) => response.json()) //assuming file contains json
            .then((solbears) => {
              items.forEach(domItem => {
                if (!domItem.isRarityDisplayed) {
                  itemId = domItem.innerText.replace(/[^0-9]/g,'');
                  domItem.innerText = domItem.innerText + " (rarity: " + solbears[itemId] + ")";
                  domItem.isRarityDisplayed = true;
              }
          })
        });
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