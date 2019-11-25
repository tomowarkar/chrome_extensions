# 一番簡単なchrome拡張機能

```
├ manifest.json
├ index.html
└ script.js
```
### manifest.json
```json
{
  "name": "{ .FunctionName }",
  "version": "1.0.0",
  "manifest_version": 2,

  "permissions": [
    "tabs"
  ],
  
  "description": "{ .FunctionDescription }",

  "browser_action": {
      "default_title": "{ .FunctionTitle }",
      "default_popup": "index.html"
  },
  "author": "{ .YourName }"
}
```
### index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    copied:<input type="text" value="" id="copyObj" readonly>
  </body>
  <script src="script.js"></script>
</html>
```
### script.js
```js
chrome.tabs.getSelected(tab=>{
  let copyObj = document.getElementById("copyObj");
  copyObj.value = tab.url;
  copyObj.select();
  document.execCommand("copy");
});
```

### access `chrome://extensions/` on chrome browser
