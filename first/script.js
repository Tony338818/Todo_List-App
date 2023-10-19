window.onload = show;
let input = document.getElementById('task');
let storage = JSON.parse(localStorage.getItem('Items')) || [];

document.getElementById('btn').addEventListener('click', () => {
    if (input.value == '') {
        alert('Input box cannot be empty');
    } else {
        let box = document.createElement('li');
        
        let span = document.createElement('span');
        let remove = document.createTextNode('\u00D7');
        remove.className = 'remove';
        span.className = 'close';
        span.appendChild(remove);
        
        let check = document.createElement('span');
        let checker = document.createTextNode('\u2713');
        checker.className = 'checker';
        check.className = 'check';
        check.appendChild(checker);

        check.onclick = () => {
            box.classList.toggle('complete');
        };
        
        box.setAttribute('data-index', storage.length);

        span.onclick = () => {
            // Retrieve the task's index from the data attribute
            const taskIndex = box.getAttribute('data-index');
            if (taskIndex !== null) {
                box.remove();
                storage.splice(taskIndex, 1);
                updateLocalStorage(storage);
            }
        };

        let text = document.createTextNode(input.value);
        text.className = 'text';
        let holder = document.createElement('div');
        holder.className = 'holder';
        holder.appendChild(text);
        let big = document.createElement('span');
        big.className = 'big';
        big.id = 'big';
        big.appendChild(check);
        big.appendChild(holder);
        big.appendChild(span);
        box.appendChild(big);

        document.getElementById('list').appendChild(box);
        

        storage.push({ text: input.value, completed: false });
        
        localStorage.setItem('Items', JSON.stringify(storage));
        
        input.value = '';
        // localStorage.clear();
    }
});

function show() {
    let taskList = document.getElementById('list');
    let storage = JSON.parse(localStorage.getItem('Items')) || [];

    // Clear the current task list in the UI
    taskList.innerHTML = '';

    // Iterate through the tasks in local storage and display them
    for (let i = 0; i < storage.length; i++) {
        let taskData = storage[i];

        let box = document.createElement('li');
        let text = document.createTextNode(taskData.text);
        text.className = 'text';

        let holder = document.createElement('div');
        holder.className = 'holder';
        holder.appendChild(text);

        let big = document.createElement('span');
        big.className = 'big';

        let check = document.createElement('span');
        let checker = document.createTextNode('\u2713');
        checker.className = 'checker';
        check.className = 'check';
        check.appendChild(checker);

        check.onclick = () => {
            box.classList.toggle('complete');
            taskData.completed = !taskData.completed;
            updateLocalStorage(storage);
        };

        let span = document.createElement('span');
        let remove = document.createTextNode('\u00D7');
        remove.className = 'remove';
        span.className = 'close';
        span.appendChild(remove);

        span.onclick = () => {
            box.remove();
            storage.splice(i, 1);
            updateLocalStorage(storage);
        };

        if (taskData.completed) {
            box.classList.add('complete');
        }

        big.appendChild(check);
        big.appendChild(holder);
        big.appendChild(span);
        box.appendChild(big);

        taskList.appendChild(box);
    }
}

function updateLocalStorage(data) {
    localStorage.setItem('Items', JSON.stringify(data));
}

// Call the show function to display tasks when the page loads
