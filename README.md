# AgentOps-cli

**AgentOps-cli** is a multi-function AI Agent management toolkit built with Node.js, TypeScript, and Object-Oriented Programming (OOP) principles. It simulates managing AI agents, their tasks, global memory, and retrieving external AI insights, resembling professional command systems.

##  Project Overview
It is heavily structurally designed around OOP base classes:
- **`Command`**: An abstract base class managing CLI command execution and arguments.
- **`ApiService`**: An abstract service class handling HTTP communications via `axios`.
- **`Agent`**: A model simulating AI agents with memory, status, and task assignments.

It integrates seamlessly with:
- **Commander.js**: Robust command-line parsing.
- **Chalk**: Beautiful, colored terminal output.
- **Axios**: Network requests for quotes and mock tasks.
- **Local Storage**: Auto-managed JSON state persistence.

---

##  Installation & Setup

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

**1. Clone/Initialize project**
Navigate into the project directory and install dependencies:
```bash
npm install
```

**2. Build the project**
Since it's written in TypeScript, compile it to the `dist` directory:
```bash
npm run build
```

**3. Link globally (Optional but recommended)**
Make the `agentops` command available system-wide:
```bash
npm link
```

*Alternatively*, run it locally using: `npm start -- [command]`.

---

##  Available Commands

The CLI tool offers **10 operations** grouped logically:

###  Agent Commands
| Command | Description |
|---|---|
| `agentops agent:create <name>` | Creates a new AI agent with a generated UUID. |
| `agentops agent:list` | Lists all active agents along with their status, tasks, and memory. |
| `agentops agent:run <name> <task>` | Assigns a task to an agent and sets its status to 'running'. |
| `agentops agent:stop <name>` | Stops an agent from running its current task. |

###  Task Commands
| Command | Description |
|---|---|
| `agentops task:add <description>` | Adds a single new pending task to the local system. |
| `agentops task:list` | Lists all pending and completed tasks. |
| `agentops task:seed --count <number>` | Fetches mock tasks from a remote API and saves them locally. |

###  Memory Commands
| Command | Description |
|---|---|
| `agentops memory:store <data>` | Stores raw text or data into the global agent memory system. |
| `agentops memory:list` | Displays everything currently memorized by the global system with timestamps. |

###  Insight Commands
| Command | Description |
|---|---|
| `agentops inspire` | Contacts an AI Quote API to fetch and display an inspiring programming quote. |

---

##  Example Usage

1. Create a few agents:
```bash
agentops agent:create Alpha
agentops agent:create Beta
```

2. Seed tasks and list them:
```bash
agentops task:seed --count 5
agentops task:list
```

3. Make an agent run a task:
```bash
agentops agent:run Alpha "Analyze dataset"
agentops agent:list
```

4. Store memory for later insights:
```bash
agentops memory:store "System config initialized."
```

5. Fetch insights whenever needed:
```bash
agentops inspire
```

---

*Local data (tasks, agents, memory) is stored persistently inside the `.agentops` directory.*
