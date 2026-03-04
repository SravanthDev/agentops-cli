import { Command } from '../Command';
import { AgentService } from '../../services/AgentService';
import chalk from 'chalk';

export class StopAgentCommand extends Command {
    name = 'agent:stop <name>';
    description = 'Stops a running agent';

    private agentService: AgentService;

    constructor() {
        super();
        this.agentService = new AgentService();
    }

    async execute(name: string): Promise<void> {
        const agent = await this.agentService.getAgentByName(name);

        if (!agent) {
            console.log(chalk.red(`Error: Agent "${name}" not found.`));
            process.exit(1);
        }

        agent.stop();
        await this.agentService.updateAgent(agent);
    }
}
