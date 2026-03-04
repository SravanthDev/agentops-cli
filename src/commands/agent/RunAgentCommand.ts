import { Command } from '../Command';
import { AgentService } from '../../services/AgentService';
import chalk from 'chalk';

export class RunAgentCommand extends Command {
    name = 'agent:run <name> <task>';
    description = 'Runs a task using the selected agent';

    private agentService: AgentService;

    constructor() {
        super();
        this.agentService = new AgentService();
    }

    async execute(name: string, task: string): Promise<void> {
        const agent = await this.agentService.getAgentByName(name);

        if (!agent) {
            console.log(chalk.red(`Error: Agent "${name}" not found.`));
            process.exit(1);
        }

        agent.runTask(task);
        await this.agentService.updateAgent(agent);
    }
}
