```html
<button id="btn1">copy curr tab url</button>
```
```js
document.querySelector('#btn1').addEventListener('click',()=>{
  chrome.tabs.query({'currentWindow': true, 'active': true}, function(tbs){
    copyToClipboard(tbs[0].url)
    alert(`copied: ${tbs[0].url}`)
  });
});
```
