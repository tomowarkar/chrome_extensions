const setFavikeEvent = () => {
  document.querySelectorAll(".card-btn").forEach(e => {
    e.addEventListener("click", () => {
      deleteList(e.id)
    })
  });
}

const showList = (json) => {
  let favike = document.querySelector(".favike");
  favike.innerHTML = "";

  json.forEach(j=>{
    let card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `\
    <a class="card-title" href="${j.url}" target="_blank">\
      <i class="fa fa-fw fa-star"></i>${j.title}\
    </a>\
    <a class="card-btn" id="${j.id}">\
      <i class="fas fa-trash-alt"></i>\
    </a>`;
    favike.appendChild(card)
  });
  setFavikeEvent();
}

// Init favike
if (window.localStorage.favike == undefined) {
  window.localStorage.favike = '[]';
}
let favikes = JSON.parse(window.localStorage.favike);
showList(favikes);

document.querySelector('#btnfavike').addEventListener('click', () => {
  chrome.tabs.query({'currentWindow': true, 'active': true}, tbs => {
    addList(tbs[0].title, tbs[0].url)
  });
});

const addList = (title, url) => {
  let obj = JSON.stringify({
    "id":"",
    "title":`${title}`,
    "url":`${url}`
  });
  favikes.push(JSON.parse(obj));
  resetIndex(favikes);
  window.localStorage.favike = JSON.stringify(favikes);
  showList(favikes);
}

const deleteList = (e) => {
  favikes.splice(e * 1, 1);
  resetIndex(favikes);
  window.localStorage.favike = JSON.stringify(favikes);
  showList(favikes);
}

const resetIndex = (json) => {
  let i = 0
  json.forEach(j => {
    j.id = i;
    i++
  });
}
