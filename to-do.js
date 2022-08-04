let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");
let Array = [];

//check if there is task in localS.
if (localStorage.getItem("task")) {
    Array = JSON.parse(localStorage.getItem("task"));
}

//getting dataform LocalS.
getDataFromLS();

//submit task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); //add task to array tasks
        input.value = "";
    }
};

//click on task element
taskDiv.addEventListener("click",(e)=>{
    //Delete button 
    if(e.target.classList.contains("Delete")){
        //remove element from page
        e.target.parentElement.remove();
        //remove task from localS.
        deleteTaskLS(e.target.parentElement.getAttribute("data-id"));
        
    }
})


function addTaskToArray(text) {
    const task = {
        id: Date.now(),
        title: text,
        completed: false,
    };
    Array.push(task);
    //Add To Page
    addToPage(Array);
    //Add Task to Localstorage
    addDataToLocalStorage(Array);
}

function addToPage(Array) {
    // empty Task div
    taskDiv.innerHTML = "";
    //looping on array
    Array.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        //check if task is done
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "Delete";
        span.appendChild(document.createTextNode("x"));
        div.appendChild(span);
        //Add to Page
        taskDiv.appendChild(div);
    });
}
function addDataToLocalStorage(Array) {
    window.localStorage.setItem("task", JSON.stringify(Array));
}
function getDataFromLS() {
    let data = window.localStorage.getItem("task");
    if (data) {
        let tasks = JSON.parse(data);
        addToPage(tasks);
    }
}

function deleteTaskLS(e){
    // for(let i=0; i<Array.length; i++){
    //     console.log(`${Array}[i].id === ${e}`);
    // }
    Array=Array.filter((task) => task.id != e);  //yeniden filtreleme silme işlemi for loopla da yapılabilirid
    addDataToLocalStorage(Array); 
}