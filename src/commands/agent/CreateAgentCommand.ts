import { Command } from '../Command';
import { AgentService } from '../../services/AgentService';
import chalk from 'chalk';
import { Command as CommanderCommand } from 'commander';

export class CreateAgentCommand extends Command {
    name = 'agent:create <name>';
    description = 'Creates a new AI agent with a UUID';

    private agentService: AgentService;

    constructor() {
        super();
        this.agentService = new AgentService();
    }

    async execute(name: string): Promise<void> {
        try {
            const agent = await this.agentService.createAgent(name);
            console.log(chalk.green(`Agent "${agent.name}" created successfully!`));
            console.log(chalk.cyan(`ID: ${agent.id}`));
        } catch (error: any) {
            console.log(chalk.red(`Error: ${error.message}`));
            process.exit(1);
        }
    }
}
