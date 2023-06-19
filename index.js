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

publishBtn.addEventListener("click", function () {
  let inputValues = inputEl.value
  console.log(inputValues)
  push(chatInDB, inputValues)
  clearInputField()
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
  }
})

function clearInputField() {
  inputEl.value = ""
}

function clearChatList() {
  chatList.innerHTML = ""
}

function appendItems(chatItems) {
  let chatID = chatItems[0]
  let chatValue = chatItems[1]

  //creatElement
  let newEl = document.createElement("li")

  newEl.textContent = chatValue

  newEl.addEventListener("click", function () {
    let exactLocationOfChat = ref(database, `conversation/${chatID}`)

    remove(exactLocationOfChat)
  })

  chatList.append(newEl)
}
