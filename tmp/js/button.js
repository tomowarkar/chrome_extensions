document.querySelector('#btn1').addEventListener('click', () => {
  let chromeTabs = [];
  chrome.tabs.query({}, tbs => {
    tbs.forEach(tb => {
      let tabData = {"id" : "", "title" : "", "url" : "" };
      tabData.id = tb.id;
      tabData.title = tb.title;
      tabData.url = tb.url;
      chromeTabs.push(tabData)
    });

    let res=``;
    chromeTabs.forEach(ct => {
      res += `- [${ct.title}](${ct.url})\n`
    });

    copyToClipboard(res)

    let confirmMsg=`copied ${chromeTabs.length} objects\nDestroy Everything?`;
    if ( confirm(confirmMsg) ) {
      chrome.tabs.remove( chromeTabs.map(e => {return e.id}) );
    }
  });
});
document.querySelector('#btn2').addEventListener('click', () => {
  copyToClipboard("今日もいい天気")
});
document.querySelector('#btn3').addEventListener('click', () => {
  alert("Hello world!");
});
