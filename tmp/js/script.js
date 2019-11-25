(function() {
  document.open();
  for(var i = 0, l = arguments.length; i < l; i++) {
    document.write("<script src=\"" + arguments[i] + "\"></script>");
  }
  document.close();
})(
  "./js/select.js",
  "./js/button.js",
  "./js/favike.js"
);

document.querySelector("textarea").value = window.localStorage.textval
document.querySelector("textarea").addEventListener("input", () => {
  let val = document.querySelector("textarea").value;
  window.localStorage.textval = val;
})
