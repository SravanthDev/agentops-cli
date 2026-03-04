import { Command } from '../Command';
import { MemoryService } from '../../services/MemoryService';
import chalk from 'chalk';

export class StoreMemoryCommand extends Command {
    name = 'memory:store <data>';
    description = 'Stores information into the agent memory system';

    private memoryService: MemoryService;

    constructor() {
        super();
        this.memoryService = new MemoryService();
    }

    async execute(data: string): Promise<void> {
        try {
            const item = await this.memoryService.storeData(data);
            console.log(chalk.green('Memory stored successfully!'));
            console.log(chalk.cyan(`ID: ${item.id}`));
            console.log(chalk.cyan(`Recorded at: ${item.timestamp}`));
        } catch (error: any) {
            console.log(chalk.red(`Error: ${error.message}`));
            process.exit(1);
        }
    }
}
