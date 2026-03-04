import { Command as CommanderCommand } from 'commander';

export abstract class Command {
    abstract name: string;
    abstract description: string;

    abstract execute(...args: any[]): Promise<void> | void;

    register(program: CommanderCommand): void {
        const cmd = program.command(this.name).description(this.description);
        this.setupOptions(cmd);
        cmd.action(async (...args) => {
            try {
                await this.execute(...args);
            } catch (error: any) {
                console.error(error.message || 'An error occurred during command execution.');
                process.exit(1);
            }
        });
    }

    protected setupOptions(cmd: CommanderCommand): void {
        // Override this in subclasses to add options
    }
}
