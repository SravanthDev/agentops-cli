#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

// Import Commands
import { CreateAgentCommand } from './commands/agent/CreateAgentCommand';
import { ListAgentsCommand } from './commands/agent/ListAgentsCommand';
import { RunAgentCommand } from './commands/agent/RunAgentCommand';
import { StopAgentCommand } from './commands/agent/StopAgentCommand';

import { AddTaskCommand } from './commands/task/AddTaskCommand';
import { ListTasksCommand } from './commands/task/ListTasksCommand';
import { SeedTasksCommand } from './commands/task/SeedTasksCommand';

import { StoreMemoryCommand } from './commands/memory/StoreMemoryCommand';
import { ListMemoryCommand } from './commands/memory/ListMemoryCommand';

import { InspireCommand } from './commands/insights/InspireCommand';

function bootstrap() {
    const program = new Command();

    // Package.json for version reading
    const packageJsonPath = path.join(__dirname, '../package.json');
    let version = '1.0.0';
    if (fs.existsSync(packageJsonPath)) {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        version = pkg.version || '1.0.0';
    }

    program
        .name('agentops')
        .description(chalk.cyan('AgentOps-cli - Multi-function AI Agent management toolkit'))
        .version(version);

    const commands = [
        // Agent Commands
        new CreateAgentCommand(),
        new ListAgentsCommand(),
        new RunAgentCommand(),
        new StopAgentCommand(),

        // Task Commands
        new AddTaskCommand(),
        new ListTasksCommand(),
        new SeedTasksCommand(),

        // Memory Commands
        new StoreMemoryCommand(),
        new ListMemoryCommand(),

        // Insights Command
        new InspireCommand()
    ];

    // Register each command with commander
    for (const cmd of commands) {
        cmd.register(program);
    }

    program.parse(process.argv);
}

bootstrap();
