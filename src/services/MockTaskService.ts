import { ApiService } from './ApiService';

export interface MockTask {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export class MockTaskService extends ApiService {
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com/todos';

    /**
     * Fetches mock tasks and returns a limited number.
     */
    async getTasks(count: number): Promise<MockTask[]> {
        const tasks = await this.get<MockTask[]>(this.baseUrl);
        return tasks.slice(0, count);
    }
}
