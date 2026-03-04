import { Command } from '../Command';
import { QuoteService } from '../../services/QuoteService';
import chalk from 'chalk';

export class InspireCommand extends Command {
    name = 'inspire';
    description = 'Fetches a random programming quote';

    private quoteService: QuoteService;

    constructor() {
        super();
        this.quoteService = new QuoteService();
    }

    async execute(): Promise<void> {
        try {
            console.log(chalk.cyan('Fetching an inspiring quote...'));
            const quote = await this.quoteService.getRandomQuote();

            console.log('\n' + chalk.yellow(`"${quote.en}"`));
            console.log(chalk.dim(`  — ${quote.author}\n`));
        } catch (error: any) {
            console.log(chalk.red(`Error fetching quote: ${error.message}`));
            process.exit(1);
        }
    }
}
