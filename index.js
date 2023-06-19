import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
  databaseURL: "https://chat-99820-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSetting)
const database = getDatabase(app)
const chatInDB = ref(database, "conversation")
const inputEl = document.getElementById("input-field")
const publishBtn = document.getElementById("publish-btn")
const chatList = document.getElementById("chatList")

const noteEl = document.getElementById("note")
const fromEl = document.getElementById("id-from")
const toEl = document.getElementById("id-to")

let fromUser = fromEl.value
let toUser = toEl.value

publishBtn.addEventListener("click", function () {
  let inputValues = inputEl.value
  fromUser = fromEl.value
  toUser = toEl.value

  if (inputValues !== "" && fromUser !== '' && toUser !== "") {
    push(chatInDB, inputValues)

    clearInputField()
    clearNote()
  } else if (inputValues === "") {
    noteEl.textContent = "Ops! Write your message first"
  }
})

onValue(chatInDB, function (snapshot) {
  if (snapshot.exists()) {
    let chatToArray = Object.entries(snapshot.val())
    clearChatList()
    for (let i = 0; i < chatToArray.length; i++) {
      let items = chatToArray[i]
      appendItems(items)
    }
  } else {
    chatList.innerHTML = `<h2>There are no chat...yet</h2>`
    noteEl.textContent = ""
  }
})

function appendItems(chatItems) {
  let chatID = chatItems[0]
  let chatValue = chatItems[1]

  //creatElement
  let newEl = document.createElement("li")
  newEl.innerHTML = `<h3>From Mr.${fromUser}</h3> ${chatValue} <h3>To Mr.${toUser}</h3>`
  chatList.append(newEl)

  newEl.addEventListener("click", function () {
    let exactLocationOfChat = ref(database, `conversation/${chatID}`)
    remove(exactLocationOfChat)
  })
}

function clearInputField() {
  inputEl.value = ""
  fromEl.value = ""
  toEl.value = ""
}

function clearChatList() {
  chatList.innerHTML = ""

}

function clearNote() {
  noteEl.textContent = ""
}