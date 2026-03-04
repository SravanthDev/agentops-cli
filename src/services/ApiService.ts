import axios, { AxiosRequestConfig } from 'axios';

export abstract class ApiService {
    /**
     * Performs an HTTP GET request.
     */
    protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axios.get<T>(url, config);
            return response.data;
        } catch (error: any) {
            throw new Error(`GET request to ${url} failed: ${error.message}`);
        }
    }

    /**
     * Performs an HTTP POST request.
     */
    protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await axios.post<T>(url, data, config);
            return response.data;
        } catch (error: any) {
            throw new Error(`POST request to ${url} failed: ${error.message}`);
        }
    }
}
