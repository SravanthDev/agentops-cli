import { ApiService } from './ApiService';

export interface GitHubUser {
    login: string;
    public_repos: number;
    followers: number;
    bio: string | null;
}

export class GitHubService extends ApiService {
    private readonly baseUrl = 'https://api.github.com/users';

    /**
     * Fetches GitHub developer stats by username.
     */
    async getUserStats(username: string): Promise<GitHubUser> {
        const url = `${this.baseUrl}/${username}`;
        return this.get<GitHubUser>(url);
    }
}
