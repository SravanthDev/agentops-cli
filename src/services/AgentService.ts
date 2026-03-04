import { Agent } from '../models/Agent';
import { StorageUtil } from '../utils/storage';

export class AgentService {
    private readonly filename = 'agents.json';

    /**
     * Loads all agents from storage.
     */
    async loadAgents(): Promise<Agent[]> {
        const data = await StorageUtil.readData<any[]>(this.filename);
        if (!data) return [];
        return data.map((item) => Agent.fromJSON(item));
    }

    /**
     * Saves all agents to storage.
     */
    async saveAgents(agents: Agent[]): Promise<void> {
        const data = agents.map((agent) => agent.toJSON());
        await StorageUtil.writeData(this.filename, data);
    }

    /**
     * Gets a specific agent by name.
     */
    async getAgentByName(name: string): Promise<Agent | undefined> {
        const agents = await this.loadAgents();
        return agents.find((agent) => agent.name === name);
    }

    /**
     * Creates a new agent.
     */
    async createAgent(name: string): Promise<Agent> {
        const agents = await this.loadAgents();

        if (agents.some((a) => a.name === name)) {
            throw new Error(`Agent "${name}" already exists.`);
        }

        const newAgent = new Agent(name);
        agents.push(newAgent);
        await this.saveAgents(agents);
        return newAgent;
    }

    /**
     * Updates an existing agent.
     */
    async updateAgent(updatedAgent: Agent): Promise<void> {
        const agents = await this.loadAgents();
        const index = agents.findIndex((a) => a.id === updatedAgent.id);

        if (index === -1) {
            throw new Error(`Agent "${updatedAgent.name}" not found.`);
        }

        agents[index] = updatedAgent;
        await this.saveAgents(agents);
    }
}
