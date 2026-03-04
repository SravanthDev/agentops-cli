import { Command } from '../Command';
import { TaskService } from '../../services/TaskService';
import chalk from 'chalk';

export class AddTaskCommand extends Command {
    name = 'task:add <description>';
    description = 'Adds a task to the system';

    private taskService: TaskService;

    constructor() {
        super();
        this.taskService = new TaskService();
    }

    async execute(description: string): Promise<void> {
        try {
            const task = await this.taskService.addTask(description);
            console.log(chalk.green('Task added successfully!'));
            console.log(chalk.cyan(`ID: ${task.id}`));
            console.log(chalk.cyan(`Description: ${task.description}`));
        } catch (error: any) {
            console.log(chalk.red(`Error: ${error.message}`));
            process.exit(1);
        }
    }
}
