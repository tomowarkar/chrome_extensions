document.querySelector("select").addEventListener("change", () => {
  selectChange()
});

const selectChange = () => {
  let secs = document.querySelectorAll("section");
  let sel = document.querySelector("select");
  let value = sel.selectedOptions[0].value;
  let val = document.getElementById(value);

  secs.forEach(s=>{
    s.style.display = "none"
  })
  val.style.display = "block"

  selected(value)
}

const selected = (value) => {
  switch(value) {
    case "a01":
      chrome.tabs.query({'currentWindow': true, 'active': true}, tbs => {
        copyToClipboard(`[${tbs[0].title}](${tbs[0].url})`);
      });
      break;
    case "a03":
      alert("select action")
    default:
      break;
  }
}
