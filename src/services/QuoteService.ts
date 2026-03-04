import { ApiService } from './ApiService';

export interface QuoteResponse {
    id: string;
    author: string;
    en: string; // The quote text
}

export class QuoteService extends ApiService {
    private readonly baseUrl = 'https://programming-quotesapi.vercel.app/api/random';

    /**
     * Fetches a random programming quote.
     */
    async getRandomQuote(): Promise<QuoteResponse> {
        try {
            return await this.get<QuoteResponse>(this.baseUrl);
        } catch (error) {
            // Fallback quote if rate limited or API is down
            return {
                id: 'fallback',
                author: 'Linus Torvalds',
                en: 'Talk is cheap. Show me the code.'
            };
        }
    }
}
