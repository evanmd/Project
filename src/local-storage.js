const TASK_STORAGE_KEY = 'tasks';

export class StorageAdapter {
    static getTasks() {
        const tasks = localStorage.getItem(TASK_STORAGE_KEY);
        return tasks ? JSON.parse(tasks) : [];
    }

    static setTasks(tasks) {
        localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
    }

    static appendTask(task) {
        const tasks = StorageAdapter.getTasks();
        tasks.push(task);
        StorageAdapter.setTasks(tasks);
    }

    static removeTask(index) {
        const tasks = StorageAdapter.getTasks();
        tasks.splice(index, 1);
        StorageAdapter.setTasks(tasks);
    }

    static toggleTaskComplete(index) {
        const tasks = StorageAdapter.getTasks();
        tasks[index].completed = !tasks[index].completed;
        StorageAdapter.setTasks(tasks);
    }
}