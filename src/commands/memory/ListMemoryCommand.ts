import { Command } from '../Command';
import { MemoryService } from '../../services/MemoryService';
import chalk from 'chalk';

export class ListMemoryCommand extends Command {
    name = 'memory:list';
    description = 'Displays stored memory';

    private memoryService: MemoryService;

    constructor() {
        super();
        this.memoryService = new MemoryService();
    }

    async execute(): Promise<void> {
        const memory = await this.memoryService.loadMemory();

        if (memory.length === 0) {
            console.log(chalk.yellow('Memory is empty. Use "agentops memory:store <data>" to store data.'));
            return;
        }

        console.log(chalk.cyan('\n=== Agent Global Memory ==='));
        memory.forEach((item) => {
            console.log(`[${chalk.dim(item.timestamp)}] ${chalk.yellow(item.data)}`);
        });
        console.log(chalk.cyan('===========================\n'));
    }
}
