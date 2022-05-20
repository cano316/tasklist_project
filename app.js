//Define our UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners

loadEventListeners();

function loadEventListeners() {
    //DOM load event, load from storage
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task event
    form.addEventListener('submit', addTask);
    //delete a task from list
    taskList.addEventListener('click', deleteTask);
    //clear all tasks
    clearButton.addEventListener('click', clearTasks);
    //filter tasks
    filter.addEventListener('keyup', filterTasks)
};

//Get Tasks function
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    for (let task of tasks) {
        const li = document.createElement('li');
        // add class to that element, for styling purposes
        li.classList.add('collection-item');
        // append taskInput value to that li element
        li.append(task);
        //create a new link element
        const link = document.createElement('a');
        // add class to the link element
        link.classList.add('delete-item', 'secondary-content');
        // add icon html inside of the link element <a>
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //also append that link to the li element
        li.append(link);
        //append that li element with it's new value to the ul
        taskList.append(li);
    }
}
//Add Task

function addTask(e) {
    e.preventDefault();
    if (taskInput.value === '') {//if there is no string in the value
        alert('Add a task')
    }
    // create li element
    const li = document.createElement('li');
    // add class to that element, for styling purposes
    li.classList.add('collection-item');
    // append taskInput value to that li element
    li.append(taskInput.value);
    //create a new link element
    const link = document.createElement('a');
    // add class to the link element
    link.classList.add('delete-item', 'secondary-content');
    // add icon html inside of the link element <a>
    link.innerHTML = '<i class="fa fa-remove"></i>'
    //also append that link to the li element
    li.append(link);
    //append that li element with it's new value to the ul
    taskList.append(li);
    //Store in local storage, call a function
    storeTaskLocalStorage(taskInput.value);

    // reset input
    taskInput.value = '';


};

function storeTaskLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function deleteTask(e) {
    // if (e.target.parentElement.classList.contains('delete-item')) {
    //     e.target.parentElement.parentElement.remove();
    // }
    //my version
    if (e.target.className === 'fa fa-remove') {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
};

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    //tasks at this point is an array
    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// function clearTasks() {
//     const li = document.querySelectorAll('li');
//     if (li.length === 0) {
//         alert('No tasks to clear')
//     }
//     for (listItems of li) {
//         listItems.remove();
//     }
// }
//This is the solution I came up with, is this far dumber than what the video recommended?
//this is their solution:
function clearTasks() {
    if (confirm('Are you sure you want to clear your list?')) {
        while (taskList.firstChild) { //while the UL contains a child
            taskList.removeChild(taskList.firstChild)
        }
        localStorage.clear();
    }
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    const lis = document.querySelectorAll('.collection-item');
    for (li of lis) {
        if (li.textContent.toLowerCase().indexOf(text) != -1) {
            li.style.display = 'block'
        } else {
            li.style.display = 'none'
        }
    }
}