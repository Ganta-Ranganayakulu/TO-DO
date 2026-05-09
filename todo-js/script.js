var taskInput = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var totalCount = document.getElementById("totalCount");
var completedCount = document.getElementById("completedCount");
var pendingCount = document.getElementById("pendingCount");

var tasks = [];

loadTasks();
displayTasks();

function addTask() {
    var taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task");
        return;
    }

    var task = {
        id: Date.now(),
        name: taskName,
        completed: false
    };

    tasks.push(task);
    taskInput.value = "";
    saveTasks();
    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-message">No tasks added yet</li>';
        updateCounts();
        return;
    }

    for (var i = 0; i < tasks.length; i++) {
        var li = document.createElement("li");
        li.className = "task-item";

        if (tasks[i].completed === true) {
            li.className = "task-item completed";
        }

        var span = document.createElement("span");
        span.className = "task-text";
        span.innerText = tasks[i].name;

        var buttonBox = document.createElement("div");
        buttonBox.className = "task-buttons";

        var doneButton = document.createElement("button");
        doneButton.className = "done-btn";
        doneButton.innerText = tasks[i].completed ? "Undo" : "Done";
        doneButton.setAttribute("onclick", "toggleTask(" + tasks[i].id + ")");

        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.innerText = "Delete";
        deleteButton.setAttribute("onclick", "deleteTask(" + tasks[i].id + ")");

        buttonBox.appendChild(doneButton);
        buttonBox.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(buttonBox);
        taskList.appendChild(li);
    }

    updateCounts();
}

function toggleTask(id) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks[i].completed = !tasks[i].completed;
            break;
        }
    }

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    var newTasks = [];

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== id) {
            newTasks.push(tasks[i]);
        }
    }

    tasks = newTasks;
    saveTasks();
    displayTasks();
}

function clearAllTasks() {
    if (tasks.length === 0) {
        alert("No tasks to clear");
        return;
    }

    var answer = confirm("Do you want to clear all tasks?");

    if (answer === true) {
        tasks = [];
        saveTasks();
        displayTasks();
    }
}

function updateCounts() {
    var completed = 0;

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
            completed++;
        }
    }

    totalCount.innerText = tasks.length;
    completedCount.innerText = completed;
    pendingCount.innerText = tasks.length - completed;
}

function saveTasks() {
    localStorage.setItem("studentTodoTasks", JSON.stringify(tasks));
}

function loadTasks() {
    var savedTasks = localStorage.getItem("studentTodoTasks");

    if (savedTasks !== null) {
        tasks = JSON.parse(savedTasks);
    }
}

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
