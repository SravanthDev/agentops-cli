import { v4 as uuidv4 } from 'uuid';
import chalk from 'chalk';

export class Agent {
    id: string;
    name: string;
    status: 'idle' | 'running' | 'stopped';
    assignedTasks: string[];
    memory: Record<string, any>;

    constructor(
        name: string,
        id?: string,
        status: 'idle' | 'running' | 'stopped' = 'idle',
        assignedTasks: string[] = [],
        memory: Record<string, any> = {}
    ) {
        this.name = name;
        this.id = id || uuidv4();
        this.status = status;
        this.assignedTasks = assignedTasks;
        this.memory = memory;
    }

    runTask(task: string): void {
        if (this.status === 'running') {
            console.log(chalk.yellow(`Agent "${this.name}" is already running a task.`));
            return;
        }
        this.status = 'running';
        this.assignedTasks.push(task);
        console.log(chalk.green(`Agent "${this.name}" started task: ${task}`));
    }

    stop(): void {
        if (this.status === 'stopped') {
            console.log(chalk.yellow(`Agent "${this.name}" is already stopped.`));
            return;
        }
        this.status = 'stopped';
        console.log(chalk.red(`Agent "${this.name}" has been stopped.`));
    }

    reportStatus(): void {
        console.log(chalk.cyan(`\n=== Agent Report: ${this.name} ===`));
        console.log(`ID: ${chalk.dim(this.id)}`);
        console.log(`Status: ${this.getStatusColor(this.status)}`);
        console.log(`Assigned Tasks: ${chalk.yellow(this.assignedTasks.length)}`);
        console.log(`Memory Items: ${chalk.yellow(Object.keys(this.memory).length)}`);
    }

    private getStatusColor(status: string): string {
        switch (status) {
            case 'idle':
                return chalk.cyan(status);
            case 'running':
                return chalk.green(status);
            case 'stopped':
                return chalk.red(status);
            default:
                return status;
        }
    }

    public toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            status: this.status,
            assignedTasks: this.assignedTasks,
            memory: this.memory
        };
    }

    static fromJSON(data: any): Agent {
        return new Agent(data.name, data.id, data.status, data.assignedTasks, data.memory);
    }
}
