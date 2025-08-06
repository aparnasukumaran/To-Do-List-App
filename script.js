const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const emptyMsg = document.getElementById("empty-message");

function updateEmptyMessage() {
  if (listContainer.children.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }
}

function addTask() {
  if (inputBox.value.trim() === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    inputBox.value = "";
    saveData();
    updateEmptyMessage();
  }
}

listContainer.addEventListener("click", function (e) {
  const target = e.target;

 
  if (target.tagName === "SPAN") {
    target.parentElement.remove();
    saveData();
    updateEmptyMessage();
  }


  else if (target.tagName === "LI" && !target.querySelector("input")) {
    target.classList.toggle("checked");
    saveData();
  }
});

listContainer.addEventListener("dblclick", function (e) {
  if (e.target.tagName === "LI" && !e.target.querySelector("input")) {
    const li = e.target;
    const currentText = li.firstChild.textContent.trim();

    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;
    input.classList.add("edit-input");

    const deleteBtn = li.querySelector("span");
    deleteBtn.remove();

    li.innerHTML = '';
    li.appendChild(input);
    li.appendChild(deleteBtn); 

    input.focus();

    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        finishEdit(input, li);
      }
    });

    input.addEventListener("blur", function () {
      finishEdit(input, li);
    });
  }
});

function finishEdit(input, li) {
  const newValue = input.value.trim();
  const deleteBtn = li.querySelector("span");

  if (newValue !== "") {
    li.innerHTML = newValue;
    li.appendChild(deleteBtn);
    saveData();
  } else {
    li.remove(); 
    updateEmptyMessage();
    saveData();
  }
}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listContainer.innerHTML = savedData;
  }
  updateEmptyMessage();
}

showTask();


inputBox.addEventListener('keydown', function (event) {
  if (event.key == 'Enter') {
    addTask();
  }
});



// toggle theme
const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme') || 'dark';

body.classList.toggle('light-theme', savedTheme === 'light');
updateToggleButton();

toggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  const theme = body.classList.contains('light-theme') ? 'light' : 'dark';
  localStorage.setItem('theme', theme);
  updateToggleButton();
});

function updateToggleButton() {
  if (body.classList.contains('light-theme')) {
    toggleBtn.textContent = '⚙️';
  } else {
    toggleBtn.textContent = '⚙️';
  }
}


// emptymessage
const quotes = [
  "No tasks? Even your to-do list is taking a nap. Time to wake it up! 💤🚀",
  "Your tasks are as chill as you are… but maybe it's time to boss up! 💼😎",
  "An empty list means unlimited possibilities… or maybe just a nap. 😴",
  "No tasks yet. Did your list ghost you? 👻",
];

let currentIndex = 0;

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  emptyMsg.textContent = quotes[randomIndex]
}

showRandomQuote();