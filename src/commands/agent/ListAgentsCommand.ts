import { Command } from '../Command';
import { AgentService } from '../../services/AgentService';
import chalk from 'chalk';

export class ListAgentsCommand extends Command {
    name = 'agent:list';
    description = 'Lists all agents';

    private agentService: AgentService;

    constructor() {
        super();
        this.agentService = new AgentService();
    }

    async execute(): Promise<void> {
        const agents = await this.agentService.loadAgents();

        if (agents.length === 0) {
            console.log(chalk.yellow('No agents found. Use "agentops agent:create <name>" to create one.'));
            return;
        }

        console.log(chalk.cyan('\n=== AI Agents ==='));
        agents.forEach((agent) => {
            agent.reportStatus();
        });
        console.log(chalk.cyan('=================\n'));
    }
}
