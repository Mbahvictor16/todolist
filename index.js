"use strict";
const TASKS = localStorage.getItem("TASKS");
let todoArray;
if (TASKS) {
    todoArray = JSON.parse(TASKS);
}
else {
    todoArray = [];
}
const taskForm = document.querySelector("form");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const displayTask = document.querySelector("#tasks");
showTask();
taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!title.value.trim() || !description.value.trim())
        return alert("Please add a title and description for the task!");
    const newTask = {
        id: Date.now(),
        title: title.value.trim(),
        description: description.value.trim(),
        completed: false
    };
    todoArray.unshift(newTask);
    localStorage.setItem("TASKS", JSON.stringify(todoArray));
    addTask(newTask);
    const buttonDel = document.getElementById(`${newTask.id}`);
    buttonDel.addEventListener("click", delTask);
    const checked = document.querySelector("input[type=\"checkbox\"]");
    checked.addEventListener("change", isChecked);
    taskForm.reset();
});
const delBtn = document.querySelectorAll(".del-btn");
const checkedTask = document.querySelectorAll("input[type=\"checkbox\"]");
checkedTask.forEach(task => {
    task.addEventListener("change", isChecked);
});
delBtn.forEach(btn => {
    btn.addEventListener("click", delTask);
});
function showTask() {
    todoArray.map(value => {
        addTask(value);
    });
}
function isChecked() {
    var _a;
    const taskEl = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    const getItem = localStorage.getItem("TASKS");
    if (!getItem)
        return;
    const parseItem = JSON.parse(getItem);
    const taskID = taskEl === null || taskEl === void 0 ? void 0 : taskEl.querySelectorAll(".del-btn")[0].id;
    parseItem.map(task => {
        if (task.id === Number(taskID)) {
            task.completed = this.checked;
            localStorage.setItem("TASKS", JSON.stringify(parseItem));
        }
    });
}
function delTask() {
    var _a, _b, _c, _d, _e;
    const taskEL = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement;
    const getTask = localStorage.getItem("TASKS");
    if (!getTask)
        return;
    const checkBox = taskEL === null || taskEL === void 0 ? void 0 : taskEL.querySelectorAll("input[type=\"checkbox\"]")[0];
    const title = (_c = (_b = taskEL === null || taskEL === void 0 ? void 0 : taskEL.querySelectorAll(".title")[0]) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim();
    const description = (_e = (_d = taskEL === null || taskEL === void 0 ? void 0 : taskEL.querySelectorAll(".description")[0]) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim();
    if (title && description) {
        const taskObj = {
            id: Number(taskEL === null || taskEL === void 0 ? void 0 : taskEL.querySelectorAll(".del-btn")[0].id),
            title: title,
            description: description,
            completed: checkBox.checked
        };
        const parseTask = JSON.parse(getTask);
        parseTask.map((task, id) => {
            if (task.id == taskObj.id) {
                const parseSet = new Set(parseTask);
                parseSet.delete(parseTask[id]);
                const returnArr = Array.from(parseSet);
                localStorage.setItem("TASKS", JSON.stringify(returnArr));
            }
        });
    }
    taskEL === null || taskEL === void 0 ? void 0 : taskEL.remove();
}
function addTask(newTask) {
    var _a;
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    const checkBoxDiv = document.createElement("div");
    checkBoxDiv.className = "check-box";
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = newTask.completed;
    checkBoxDiv.append(checkBox);
    const textDiv = document.createElement("div");
    textDiv.className = "text";
    const titleText = document.createElement("div");
    titleText.className = "title";
    titleText.textContent = newTask.title;
    const descriptionText = document.createElement("div");
    descriptionText.className = "description";
    descriptionText.textContent = newTask.description;
    textDiv.append(titleText, descriptionText);
    const DeleteDiv = document.createElement("div");
    DeleteDiv.className = "delete";
    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "del-btn";
    delBtn.id = `${newTask.id}`;
    delBtn.textContent = "Delete";
    DeleteDiv.append(delBtn);
    taskDiv.append(checkBoxDiv, textDiv, DeleteDiv);
    (_a = document.querySelector("#tasks")) === null || _a === void 0 ? void 0 : _a.prepend(taskDiv);
}
