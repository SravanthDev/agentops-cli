import { Command } from '../Command';
import { TaskService } from '../../services/TaskService';
import { MockTaskService } from '../../services/MockTaskService';
import { Command as CommanderCommand } from 'commander';
import chalk from 'chalk';

export class SeedTasksCommand extends Command {
    name = 'task:seed';
    description = 'Fetch tasks from JSONPlaceholder and save locally';

    private mockTaskService: MockTaskService;
    private taskService: TaskService;

    constructor() {
        super();
        this.mockTaskService = new MockTaskService();
        this.taskService = new TaskService();
    }

    protected setupOptions(cmd: CommanderCommand): void {
        cmd.requiredOption('-c, --count <number>', 'Number of tasks to fetch', parseInt);
    }

    async execute(options: { count: number }): Promise<void> {
        const count = options.count;

        if (isNaN(count) || count <= 0) {
            console.log(chalk.red('Error: count must be a positive number.'));
            process.exit(1);
        }

        console.log(chalk.cyan(`Fetching ${count} tasks from mock API...`));

        try {
            const mockTasks = await this.mockTaskService.getTasks(count);

            let added = 0;
            for (const t of mockTasks) {
                await this.taskService.addTask(t.title);
                added++;
            }

            console.log(chalk.green(`Successfully seeded ${added} tasks!`));
        } catch (error: any) {
            console.log(chalk.red(`Error: ${error.message}`));
            process.exit(1);
        }
    }
}
