const TASK_STORAGE_KEY = 'tasks';

//TODO import & use this to help break up logic
export class StorageAdapter {
    static getTasks() {
        return localStorage.getItem(TASK_STORAGE_KEY) || [];
    }

    static setTasks(tasks) {
        return localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
    }

    static appendTask() {
        //TODO think of the logic for this
    }
}