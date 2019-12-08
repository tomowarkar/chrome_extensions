// リストの表示とイベントの再設定のための関数群
const showList = (json) => {
  let favike = document.querySelector(".favike");
  favike.innerHTML = "";

  json.forEach(j=>{
    let card = document.createElement('div');
    card.className = "card";
    card.id = j.id;
    card.draggable = "true";
    card.innerHTML = `\
    <div class="drag">\
      <i class="fas fa-bars"></i>\
    </div>
    <a class="card-title" href="${j.url}" target="_blank">\
      ${j.title}\
    </a>\
    <a class="card-btn" id="${j.id}">\
      <i class="fas fa-trash-alt"></i>\
    </a>`;
    favike.appendChild(card)
  });
}

const setFavikeEvent = () => {
  document.querySelectorAll(".card-btn").forEach(e => {
    e.addEventListener("click", () => {
      deleteList(e.id)
    })
  });
}

const setDragEvent = () => {
  document.querySelectorAll('.card').forEach(col => {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('drop', handleDrop, false);
  });
}

// リストの追加、削除する関数群
const addList = (title, url) => {
  let obj = JSON.stringify({
    "id":"",
    "title":`${title}`,
    "url":`${url}`
  });
  favikes.push(JSON.parse(obj));
  resetIndex(favikes);
  window.localStorage.favike = JSON.stringify(favikes);
  init(favikes);
}

const deleteList = (e) => {
  favikes.splice(e * 1, 1);
  resetIndex(favikes);
  window.localStorage.favike = JSON.stringify(favikes);
  init(favikes);
}

const resetIndex = (json) => {
  let i = 0
  json.forEach(j => {
    j.id = i;
    i++
  });
}

// リストの入れ替えをするための関数群
let dragStatus = { "from": "", "to": "" }

function handleDragStart(e) {
  dragStatus.from = this.id
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
}

function handleDrop(e) {
  dragStatus.to = this.id
  console.log(dragStatus.from + "->" + dragStatus.to)
  swapObject(dragStatus)
  dragStatus.from = ""
  dragStatus.to = ""
}

const swapObject = (dragStatus) => {
  favikes[dragStatus.from * 1]=[favikes[dragStatus.to * 1],favikes[dragStatus.to * 1]=favikes[dragStatus.from * 1]][0];
  resetIndex(favikes);
  window.localStorage.favike = JSON.stringify(favikes);
  init(favikes);
}

// メイン処理
if (window.localStorage.favike == undefined) {
  window.localStorage.favike = '[]';
}

let favikes = JSON.parse(window.localStorage.favike);

const init = (favikes) =>{
  showList(favikes);
  setFavikeEvent();
  setDragEvent();
}

init(favikes);

document.querySelector('#btnfavike').addEventListener('click', () => {
  chrome.tabs.query({'currentWindow': true, 'active': true}, tbs => {
    addList(tbs[0].title, tbs[0].url)
  });
});
