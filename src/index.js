import { forEach, indexOf } from 'lodash';
import './style.css'

const createTodoButton = document.querySelector("#create");
const toDoContainer = document.querySelector("#todo-container");
const newProjectButton = document.querySelector("#new-project");
const projectsContainer = document.querySelector("#projects-container");
const newProjectContainer = document.querySelector("#new-project-container");


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
    toDoContainer.textContent = '';

    for (let i = 0; i < activeProject.todos.length; i++) {
        const todoCard = document.createElement("div");
        todoCard.classList.add("todo-card");

        const title = document.createElement("h4"); 
        title.classList.add("title"); 
        title.textContent = activeProject.todos[i].title;
        todoCard.appendChild(title);  

        const description = document.createElement("p"); 
        description.classList.add("description"); 
        description.textContent = activeProject.todos[i].description;
        todoCard.appendChild(description);  

        const dueDate = document.createElement("p"); 
        dueDate.classList.add("dueDate"); 
        dueDate.textContent = activeProject.todos[i].dueDate;
        todoCard.appendChild(dueDate);  

        const priority = document.createElement("p"); 
        priority.classList.add("priority"); 
        priority.textContent = activeProject.todos[i].priority;
        todoCard.appendChild(priority);  

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "delete";
        todoCard.appendChild(deleteButton);

        toDoContainer.appendChild(todoCard);

        deleteButton.addEventListener('click', () => {
            const index = activeProject.todos.indexOf([i].title);
            toDoContainer.removeChild(todoCard);
            activeProject.todos.splice(index, 1);
            console.log(activeProject)
        })

        const checklist = document.createElement("input");
        checklist.setAttribute("type","checkbox");
        checklist.setAttribute("value","done");
        checklist.classList.add("checklist");
    }
}

createTodoButton.addEventListener('click', () => {
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#dueDate");
    const priority = document.querySelector("#priority");
    const todoForm = document.getElementById("todo-form")

    if (title.value == ''){
        return messageLogger("Add a title")
    }

    else if(dueDate.value == ''){
        return messageLogger("Add a date")
    }

    else{
        todoPusher(new Todos(title.value, description.value, dueDate.value, priority.value), activeProject);
        getTodos();
        todoForm.reset();
        console.log(activeProject);
        console.log(projects);
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

newProjectButton.addEventListener("mouseover",()=>{
    newProjectButton.classList.add("toggle-button");
    newProjectButton.textContent = "New project";
})

newProjectButton.addEventListener("mouseout",()=>{
    newProjectButton.classList.remove("toggle-button");
    newProjectButton.textContent = "+";
})



newProjectButton.addEventListener('click',() => {
    newProjectContainer.textContent = ''

    const inputContainer = document.createElement("div");
    inputContainer.classList.add("input-container");
    newProjectContainer.appendChild(inputContainer)

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
        
        if(projectName.value==''){
            return messageLogger("Add a project name")}        
        else{
        projectPusher(projectName.value);
        activeProject = projects[projects.length - 1];
        projectInput.value = '';
        console.log(activeProject);
        inputContainer.removeChild(addProjectButton);
        inputContainer.removeChild(projectInput);
        }
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