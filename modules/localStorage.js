const formElements = document.getElementById('formElements');
const formButton = document.getElementById('formButton');
const subjectText = document.getElementById('subjectText');
const priorityOptions = document.getElementsByName('priority');
const dueDate = document.getElementById('dueDate');

formButton.addEventListener('click', function(event) {
    event.preventDefault();

    const formData = {
        subject: subjectText.value,
        priority: getSelectedPriority(),
        dueDate: dueDate.value,
        completed: false
    };

    saveFormData(formData);

    alert('Task added successfully!');
});

function getSelectedPriority() {
    for (const option of priorityOptions) {
        if (option.checked) {
            return option.value;
        }
    }
    return null;
}

function saveFormData(formData) {
    const storedTasks = localStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    tasks.push(formData);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    createGrid();
}

function createGrid() {
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';

    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        tasks.forEach((task, index) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');

            const icon = document.createElement('div');
            icon.classList.add('icon');
            icon.innerHTML = '<img src="/icon/random.png" alt="Icon">';

            const subject = document.createElement('div');
            subject.classList.add('subject');
            subject.textContent = task.subject;

            const priority = document.createElement('div');
            priority.classList.add('priority');
            priority.textContent = task.priority;

            const dueDate = document.createElement('div');
            dueDate.classList.add('due-date');
            dueDate.textContent = task.dueDate;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', function() {
                toggleTaskCompletion(index, checkbox.checked);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation();
                deleteTask(index);
            });

            gridItem.appendChild(icon);
            gridItem.appendChild(subject);
            gridItem.appendChild(priority);
            gridItem.appendChild(dueDate);
            gridItem.appendChild(checkbox);
            gridItem.appendChild(deleteButton);

            gridContainer.appendChild(gridItem);
        });
    }
}

function deleteTask(index) {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        tasks.splice(index, 1);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        createGrid();
    }
}

function toggleTaskCompletion(index, completed) {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);

        tasks[index].completed = completed;

        localStorage.setItem('tasks', JSON.stringify(tasks));

        createGrid();
    }
}

createGrid();