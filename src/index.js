import { forEach, indexOf } from 'lodash';
import './style.css'

const createButton = document.querySelector(".create");
const toDoContainer = document.querySelector("#toDoContainer");
const newProjectButton = document.querySelector("#new-project");
const projectsContainer = document.querySelector("#projects-container");

class Project{
    constructor(name){
        this.name = name;
        this.todos = [];
    }
}


let general = new Project('general')
let activeProject = general
let projects = [general]

function populateStorage(){
    const projectsArray_serialized = JSON.stringify(projects);
    localStorage.setItem("project", projectsArray_serialized);

}

class Todos{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}


function getTodos(){
    for (let i = 0; i < activeProject.todos.length; i++) {
        const todoCard = document.createElement("div");
        todoCard.classList.add("previousNotes");

        const title = document.createElement("h4"); 
        title.classList.add("title"); 
        title.textContent = activeProject[i].title;
        todoCard.appendChild(title);  

        const description = document.createElement("p"); 
        description.classList.add("description"); 
        description.textContent = activeProject[i].description;
        todoCard.appendChild(description);  

        const dueDate = document.createElement("p"); 
        dueDate.classList.add("dueDate"); 
        dueDate.textContent = activeProject[i].dueDate;
        todoCard.appendChild(dueDate);  

        const priority = document.createElement("p"); 
        priority.classList.add("priority"); 
        priority.textContent = activeProject[i].priority;
        todoCard.appendChild(priority);  

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "delete";
        todoCard.appendChild(deleteButton);

        toDoContainer.appendChild(todoCard);

        deleteButton.addEventListener('click', () => {
            const index = activeProject.indexOf(title);
            toDoContainer.removeChild(todoCard);
            activeProject.splice(index, 1);
            console.log(activeProject)
        })

        const checklist = document.createElement("input");
        checklist.setAttribute("type","checkbox");
        checklist.setAttribute("value","done");
        checklist.classList.add("checklist");
    }
}

createButton.addEventListener('click', () => {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const priority = document.querySelector("#priority");

    if (title.value == ''){
        return messageLogger("Add a title")
    }

    else if(dueDate.value == ''){
        return messageLogger("Add a date")
    }

    else{
        todoPusher(new Todos(title.value, description.value, dueDate.value, priority.value), activeProject);
        getTodos()
        console.log(projects)
    }
})

function todoPusher(todo, project){
    // const index = projects.indexOf(project);
    // projects[index].todos.push(todo);
    project.todos.push(todo);
    populateStorage();
}

function messageLogger(message){
    alert(message)
}

newProjectButton.addEventListener('click',() => {
    console.log(projects)
    const notesContainer = document.querySelector("#notes-container")

    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");
    notesContainer.appendChild(inputContainer)

    const projectInput = document.createElement("input");
    projectInput.setAttribute("type","text");
    projectInput.setAttribute("id","project-input");
    inputContainer.appendChild(projectInput); 

    const addProjectButton = document.createElement("button");
    addProjectButton.setAttribute("id","add-project");
    addProjectButton.textContent = "Add project";
    inputContainer.appendChild(addProjectButton); 

    addProjectButton.addEventListener("click",()=>{
        const projectName = document.querySelector("#project-input");
        projectPusher(projectName.value);
        activeProject = projects[projects.length - 1];
        projectInput.value = '';
        console.log(activeProject);
        inputContainer.removeChild(addProjectButton);
        inputContainer.removeChild(projectInput);
    })
})


function projectPusher(name){
    projects.push(new Project(name));
    // projects[name] = [];
    console.log(projects);
    populateStorage();
    getProjects();
}



function getProjects(){
    while (projectsContainer.firstChild) {
        projectsContainer.removeChild(projectsContainer.lastChild);
      }
    const projectsArray_deserialized = JSON.parse(localStorage.getItem("project"));
    projectsArray_deserialized.forEach((e)=>{
        console.log(e)
        const projectCard = document.createElement("div");
        projectsContainer.appendChild(projectCard);

        const projectButton= document.createElement("button");
        projectButton.textContent = e.name;
        projectCard.appendChild(projectButton);

        projectButton.addEventListener("click",()=>{
            console.log(e)
            activeProject = e;
            console.log(activeProject.length)
            getTodos()
        })
    })
}


todoPusher(new Todos('hello', 'hello', 'hello', 'hello'), activeProject)

console.log(projects)
console.log(activeProject)
console.log(general)