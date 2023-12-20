const workoutForm = document.getElementById('workout-form');
const workoutInput = document.getElementById('workout-input');
const setsInput = document.getElementById('sets-input');
const repsInput = document.getElementById('reps-input');
const workoutList = document.getElementById('workout-list')
const removeAWorkout = document.getElementById('remove')
const clearAll = document.getElementById('clear');

function displayWorkouts() {
 
    const itemFromStorage = getFromStorage()
    console.log(itemFromStorage)
    itemFromStorage.forEach((workout) => createWorkoutList(workout))
    checkUI()
}

function addWorkoutSets(e) {
    
    e.preventDefault();
    
    const workouts = workoutInput.value;
    const sets = setsInput.value;
    const reps = repsInput.value;
    const workoutValues = { 
        workout:workouts, 
        set:sets, 
        rep:reps 
    }
    
    if (workouts ==='' || sets==='' || reps==='') {
        alert('Please make sure you have entered a value for each field')
        return;
    } 

    if (doesWorkoutExist(workouts)) {
        alert('Youve already added that workout')
        return;
    } 

    addToLocalStorage(workoutValues); 
    checkUI()
    createWorkoutList(workoutValues);
 

    workoutInput.value = '';
    setsInput.value = '';
    repsInput.value = '';
}

function doesWorkoutExist(workout) {
    const getWorkout = getFromStorage();
    const workoutName = workout;
    console.log(workoutName.workout)
    const checkWorkout = getWorkout.includes(workoutName)    
    console.log(checkWorkout)
}


//Add to local storage
function addToLocalStorage(workoutArr) {

    const itemsStorage = getFromStorage();

    itemsStorage.push(workoutArr)

    localStorage.setItem('workouts', JSON.stringify(itemsStorage))
    checkUI()
}

//Get from local storage 
function getFromStorage() {
   
    let itemsFromStorage;

    if (localStorage.getItem('workouts') === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('workouts'))
    }

    return itemsFromStorage;
}


//create workout
function createWorkoutList(arr) {
const workoutArray = arr

const li = document.createElement('li');
const displayWorkout = createWorkout(workoutArray)
const displayActions = createActions();

workoutList.appendChild(li);
li.appendChild(displayWorkout);
li.appendChild(displayActions)

checkUI()
}

// create workout div
function createWorkout(arr) {
    const workoutDiv = document.createElement('div');
    workoutDiv.className = 'workout-display'
    const workoutDisplay = document.createTextNode(arr.workout)
    const displaySpan = createSpan(arr);
   
    workoutDiv.appendChild(workoutDisplay);
    workoutDiv.appendChild(displaySpan)
 

    return workoutDiv
}

// create span
function createSpan(arr) {
    const setReps = document.createElement('span');

    const setsXReps = document.createTextNode(`${arr.set} x ${arr.rep}`)

    setReps.appendChild(setsXReps)
 
    return setReps;
}

//create action div
function createActions() {
    const actionDiv = document.createElement('div');
    actionDiv.className = 'actions';

    const editBtn = createEditButton('edit edit-btn');
    const removeBtn = createRemoveButton();

    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(removeBtn);

    return actionDiv;
}


//create buttons
function createEditButton(classes) {
    const editBtn = document.createElement('button');
    editBtn.className = classes;

    const edit = createEditIcon('fa-regular fa-pen-to-square');
    editBtn.appendChild(edit);

    return editBtn;
}


//create remove button
function createRemoveButton() {
    const removeBtn = document.createElement('button');
    removeBtn.setAttribute('id', 'remove')
    removeBtn.className='remove-workout btn-remove';

    const remove = createRemoveIcon('fa-solid fa-xmark');

    removeBtn.appendChild(remove)
    return removeBtn;
}

// create edit icon
function createEditIcon(classes) {
    const editIcon = document.createElement('i');   
    editIcon.className = classes;
    
    return editIcon;
}
//create remove icon
function createRemoveIcon(classes) {
    const removeIcon = document.createElement('i');
    removeIcon.className = classes

    return removeIcon;
}

// Remove workout
function onClickItem(e) {  
    if(e.target.parentElement.classList.contains('remove-workout')) {
        removeWorkout(e.target.parentElement.parentElement.parentElement)
    } ;
    checkUI()
}

//remove from local storage
/* function removeFromStorage(workout) {
    
    let workoutFromStorage = getFromStorage();

    const workoutName = workout.firstChild.firstChild;

    //workoutFromStorage.find((i) => i.workout === workout

    // Filter out item
   // workoutFromStorage = workoutFromStorage.filter((i) => i !== workoutName)

    //localStorage.setItem('workouts', JSON.stringify(workoutFromStorage))
}
*///Remove
function removeWorkout(workout) { 
    workout.remove()
   
    const workoutName = workout.firstChild.firstChild.textContent;

    const getWorkout = getFromStorage();

    let newWorkoutSet = getWorkout.filter(workouts => workouts.workout !== workoutName)
    
    localStorage.setItem('workouts', JSON.stringify(newWorkoutSet))
   
    checkUI()
}

// Remove all workouts
function clearAllWorkouts() {
    if(confirm('Are you sure you want to clear all workouts?')) {
        while(workoutList.firstChild) {
            workoutList.removeChild(workoutList.firstChild)
        }
    };

    localStorage.removeItem('workouts');
    checkUI()
}

function checkUI() {
    workoutInput.value='';
    setsInput.value = '';
    repsInput.value = '';

    const workouts = workoutList.querySelectorAll('li')

    if (workouts.length === 0) {
        clearAll.style.display ='none';
    } else {
        clearAll.style.display='block';
    }    
   
}
checkUI()

workoutForm.addEventListener('submit', addWorkoutSets);
workoutList.addEventListener('click', onClickItem)
clearAll.addEventListener('click', clearAllWorkouts)
document.addEventListener('DOMContentLoaded', displayWorkouts);
