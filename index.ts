type Task = {
    id: Number,
    title: string,
    description: string,
    completed: boolean
}

const TASKS = localStorage.getItem("TASKS")
let todoArray: Task[]

if(TASKS) {
    todoArray = JSON.parse(TASKS)
} else {
    todoArray = []
}

const taskForm = document.querySelector("form") as HTMLFormElement
const title = document.querySelector("#title") as HTMLInputElement
const description = document.querySelector("#description") as HTMLTextAreaElement
const displayTask = document.querySelector("#tasks")! as HTMLDivElement


showTask()


taskForm.addEventListener("submit", (e: Event) => {
    e.preventDefault()

    if(!title.value.trim() || !description.value.trim()) return alert("Please add a title and description for the task!")

    const newTask: Task = {
        id: Date.now(),
        title: title.value.trim(),
        description: description.value.trim(),
        completed: false
    }

    todoArray.unshift(newTask)

    localStorage.setItem("TASKS", JSON.stringify(todoArray))
    
   addTask(newTask)

    const buttonDel = document.getElementById(`${newTask.id}`)! as HTMLButtonElement
    buttonDel.addEventListener("click", delTask)

    const checked = document.querySelector("input[type=\"checkbox\"]")! as HTMLInputElement
    checked.addEventListener("change", isChecked)

    taskForm.reset()
})

const delBtn = document.querySelectorAll(".del-btn") as NodeListOf<HTMLButtonElement>

const checkedTask: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[type=\"checkbox\"]")


checkedTask.forEach(task => {
    task.addEventListener("change", isChecked)
})


delBtn.forEach(btn => {
    btn.addEventListener("click", delTask)
})



function showTask() {
    todoArray.map(value => {
        addTask(value)
    })
}

function isChecked(this: HTMLInputElement) {
    const taskEl = this.parentElement?.parentElement
    const getItem = localStorage.getItem("TASKS")
    if(!getItem) return
    const parseItem: Task[] = JSON.parse(getItem)
    const taskID = taskEl?.querySelectorAll(".del-btn")[0].id

    parseItem.map(task => {
        if(task.id === Number(taskID)) {
            task.completed = this.checked
            localStorage.setItem("TASKS", JSON.stringify(parseItem))
        }
    })
}

function delTask(this: HTMLButtonElement) {
    const taskEL = this.parentElement?.parentElement
    const getTask = localStorage.getItem("TASKS")
    if(!getTask) return
    const checkBox = taskEL?.querySelectorAll("input[type=\"checkbox\"]")[0] as HTMLInputElement
    const title = taskEL?.querySelectorAll(".title")[0]?.textContent?.trim()
    const description = taskEL?.querySelectorAll(".description")[0]?.textContent?.trim()
    
    if(title && description) {
        const taskObj: Task = {
            id: Number(taskEL?.querySelectorAll(".del-btn")[0].id),
            title: title,
            description: description,
            completed: checkBox.checked
        }

        const parseTask: Task[] = JSON.parse(getTask)
        
        parseTask.map((task, id) => {
            if(task.id == taskObj.id) {
               const parseSet = new Set(parseTask)
               parseSet.delete(parseTask[id])
               
               const returnArr = Array.from(parseSet)

               localStorage.setItem("TASKS", JSON.stringify(returnArr))
            }           
        })
    }

    taskEL?.remove()
}

function addTask(newTask: Task) {
    const taskDiv = document.createElement("div")
    taskDiv.className = "task"

    const checkBoxDiv = document.createElement("div")
    checkBoxDiv.className = "check-box"
    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"
    checkBox.checked = newTask.completed
    checkBoxDiv.append(checkBox)

    const textDiv = document.createElement("div")
    textDiv.className = "text"
    const titleText = document.createElement("div")
    titleText.className = "title"
    titleText.textContent = newTask.title
    const descriptionText = document.createElement("div")
    descriptionText.className = "description"
    descriptionText.textContent = newTask.description

    textDiv.append(titleText, descriptionText)

    const DeleteDiv = document.createElement("div")
    DeleteDiv.className = "delete"
    const delBtn = document.createElement("button")
    delBtn.type = "button"
    delBtn.className = "del-btn"
    delBtn.id = `${newTask.id}`
    delBtn.textContent = "Delete"

    DeleteDiv.append(delBtn)


    taskDiv.append(checkBoxDiv, textDiv, DeleteDiv)

    document.querySelector<HTMLDivElement>("#tasks")?.prepend(taskDiv)
}