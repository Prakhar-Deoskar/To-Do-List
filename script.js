const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value == "") {
    alert("Task cannot be empty.");
  } else {
    let li = document.createElement("li");

    // div for tasks
    let taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    taskContainer.innerText = inputBox.value;
    li.appendChild(taskContainer);

    // Edit Icon
    let editIcon = document.createElement("i");
    editIcon.className = "fa-regular fa-pen-to-square editIcon";
    editIcon.title = "Edit";
    li.appendChild(editIcon);

    // Delete Icon
    let deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash deleteIcon";
    deleteIcon.title = "Delete";
    li.appendChild(deleteIcon);

    listContainer.appendChild(li);

    // Delete Icon action
    deleteIcon.addEventListener("click", function (e) {
      li.remove();
      saveData();
    });

    // Edit Icon action
    editIcon.addEventListener("click", function (e) {
      let inputField = document.createElement("input");
      inputField.value = taskContainer.innerText;
      taskContainer.innerHTML = "";
      inputField.classList.add("editing", "input-field");
      inputField.classList.add("editing");
      inputField.focus();

      // Calculate and set the initial width based on the content length
      const contentWidth = inputField.value.length * 10 + 20; // You can ddjust the multiplier and offset as needed
      inputField.style.width = contentWidth + "px";

      // Append input field to the task container
      taskContainer.appendChild(inputField);
      inputField.classList.add("editing");
      inputField.focus();

      // Dynamically adjusting the CSS for the input field
      inputField.style.width = "100%";
      inputField.style.border = "none";
      inputField.style.background = "transparent";

      // Setting the font size of the input field to match the task container
      inputField.style.fontSize =
        window.getComputedStyle(taskContainer).fontSize;

      // Handeling editing when enter is pressed
      inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          taskText = inputField.value;
          taskContainer.innerText = taskText;
          saveData();
          inputField.classList.remove("editing");
        }
      });

      // Handeling editing when user clicks anywhere
      inputField.addEventListener("blur", function () {
        taskText = inputField.value;
        taskContainer.innerText = taskText;
        saveData();
        inputField.classList.remove("editing");
      });
    });
  }
  inputBox.value = "";
  saveData();
}

inputBox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener("click", function (e) {
  // Check if the clicked element is a checkbox
  if (e.target.type === "checkbox") {
    const listItem = e.target.parentElement; // Get the parent LI
    listItem.classList.toggle("checked"); // Toggle the "checked" class on the LI

    // Check if the LI has the "checked" class
    if (listItem.classList.contains("checked")) {
      showPopup();
    }
  } else if (e.target.tagName === "LI" || e.target.tagName === "DIV") {
    // If the user clicked on the LI or the inner DIV, toggle the "checked" class
    const listItem =
      e.target.tagName === "LI" ? e.target : e.target.parentElement;
    listItem.classList.toggle("checked");

    // Check if the LI has the "checked" class
    if (listItem.classList.contains("checked")) {
      showPopup();
    }
  }

  saveData();
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showList() {
  const storedData = localStorage.getItem("data");
  if (storedData) {
    listContainer.innerHTML = storedData;
    const editIcons = document.querySelectorAll(".editIcon");
    const deleteIcons = document.querySelectorAll(".deleteIcon");

    editIcons.forEach((editIcon) => {
      editIcon.addEventListener("click", handleEditClick);
    });

    deleteIcons.forEach((deleteIcon) => {
      deleteIcon.addEventListener("click", handleDeleteClick);
    });
  }
}

// Function to handle editing a task
function handleEditClick(event) {
  const listItem = event.target.parentElement;
  const taskContainer = listItem.querySelector(".task-container");

  // Create an input field for editing
  const inputField = document.createElement("input");
  inputField.value = taskContainer.textContent;
  listItem.replaceChild(inputField, taskContainer);
  inputField.classList.add("editing");
  inputField.focus();

  // Handle editing when Enter is pressed
  inputField.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const editedTask = inputField.value;
      taskContainer.textContent = editedTask;
      inputField.parentNode.replaceChild(taskContainer, inputField);
      saveData();
    }
  });

  // Handle editing when user clicks anywhere
  inputField.addEventListener("blur", function () {
    const editedTask = inputField.value;
    taskContainer.textContent = editedTask;
    inputField.parentNode.replaceChild(taskContainer, inputField);
    saveData();
  });
}

// Function to handle deleting a task
function handleDeleteClick(event) {
  const listItem = event.target.parentElement;
  listItem.remove();
  saveData();
}

showList();

const motivationalMessages = [
  "Great job!",
  "Way to go!",
  "You have got this!",
  "Keep up the good work!",
  "Fantastic!",
  "You're unstoppable!",
  "Stay focused and achieve your goals.",
  "Today is your day to shine.",
  "Small steps lead to big results.",
  "Your dedication inspires others.",
];

function showPopup() {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");

  const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
  const message = motivationalMessages[randomIndex];

  popupMessage.textContent = message;
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

function taskCompleted(e) {
  const listItem = e.target.parentElement;
  const isChecked = listItem.classList.contains("checked");

  if (isChecked) {
    showPopup();
  }
  saveData();
}
