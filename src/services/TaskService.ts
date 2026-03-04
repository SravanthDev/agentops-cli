import { StorageUtil } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export interface AppTask {
    id: string;
    description: string;
    status: 'pending' | 'completed';
}

export class TaskService {
    private readonly filename = 'tasks.json';

    /**
     * Loads all tasks from storage.
     */
    async loadTasks(): Promise<AppTask[]> {
        const data = await StorageUtil.readData<AppTask[]>(this.filename);
        return data || [];
    }

    /**
     * Saves all tasks to storage.
     */
    async saveTasks(tasks: AppTask[]): Promise<void> {
        await StorageUtil.writeData(this.filename, tasks);
    }

    /**
     * Adds a new task.
     */
    async addTask(description: string): Promise<AppTask> {
        const tasks = await this.loadTasks();
        const newTask: AppTask = {
            id: uuidv4(),
            description,
            status: 'pending'
        };
        tasks.push(newTask);
        await this.saveTasks(tasks);
        return newTask;
    }

    /**
     * Updates a task status.
     */
    async updateTaskStatus(id: string, status: 'pending' | 'completed'): Promise<void> {
        const tasks = await this.loadTasks();
        const task = tasks.find((t) => t.id === id);
        if (!task) {
            throw new Error(`Task ID "${id}" not found.`);
        }
        task.status = status;
        await this.saveTasks(tasks);
    }

    /**
     * Finds a task based on description or ID
     */
    async findTask(query: string): Promise<AppTask | undefined> {
        const tasks = await this.loadTasks();
        return tasks.find(t => t.id === query || t.description.toLowerCase().includes(query.toLowerCase()));
    }

}
