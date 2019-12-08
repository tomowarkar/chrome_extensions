document.querySelector('#btn1').addEventListener('click', () => {
  chrome.tabs.query({'currentWindow': true, 'active': true}, tbs => {
    alert(tbs[0].title+"\n"+ tbs[0].url)
  });
});