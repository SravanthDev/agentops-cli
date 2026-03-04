import { Command } from '../Command';
import { TaskService } from '../../services/TaskService';
import chalk from 'chalk';

export class ListTasksCommand extends Command {
    name = 'task:list';
    description = 'Lists all tasks';

    private taskService: TaskService;

    constructor() {
        super();
        this.taskService = new TaskService();
    }

    async execute(): Promise<void> {
        const tasks = await this.taskService.loadTasks();

        if (tasks.length === 0) {
            console.log(chalk.yellow('No tasks found. Use "agentops task:add <description>" to add one.'));
            return;
        }

        console.log(chalk.cyan('\n=== System Tasks ==='));
        tasks.forEach((task) => {
            const statusColor = task.status === 'completed' ? chalk.green('completed') : chalk.cyan('pending');
            console.log(`[${statusColor}] ${chalk.yellow(task.description)}`);
            console.log(`  ID: ${chalk.dim(task.id)}`);
        });
        console.log(chalk.cyan('====================\n'));
    }
}
