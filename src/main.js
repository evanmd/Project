import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskTitle = document.getElementById('task-title');
    const taskDueDate = document.getElementById('task-due-date');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const taskItem = document.createElement('div');
            taskItem.className = `flex justify-between items-center border rounded p-2 ${task.completed ? 'bg-gray-100 line-through text-gray-500' : 'bg-white'
                }`;

            const info = document.createElement('div');
            info.className = 'flex flex-col';
            info.innerHTML = `
          <span class="font-medium">${task.text}</span>
          ${task.dueDate
                    ? `<span class="text-sm text-gray-500">Due: ${task.dueDate}</span>`
                    : ''
                }
        `;

            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'flex gap-2';

            const completeBtn = document.createElement('button');
            completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
            completeBtn.className =
                'px-2 py-1 text-sm rounded text-white ' +
                (task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600');
            completeBtn.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'px-2 py-1 text-sm rounded text-white bg-red-500 hover:bg-red-600';
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            buttonGroup.appendChild(completeBtn);
            buttonGroup.appendChild(deleteBtn);

            taskItem.appendChild(info);
            taskItem.appendChild(buttonGroup);
            taskList.appendChild(taskItem);
        });
    };

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = taskTitle.value.trim();
        const dueDate = taskDueDate.value;

        if (text === '') return;

        tasks.push({
            text,
            dueDate,
            completed: false,
        });

        taskTitle.value = '';
        taskDueDate.value = '';
        saveTasks();
        renderTasks();
    });

    renderTasks();
});