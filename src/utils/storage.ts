import { promises as fs } from 'fs';
import path from 'path';

// Base directory for storing data
const DATA_DIR = path.join(process.cwd(), '.agentops');

export class StorageUtil {
    /**
     * Initializes the storage directory if it doesn't exist.
     */
    static async init(): Promise<void> {
        try {
            await fs.mkdir(DATA_DIR, { recursive: true });
        } catch (error) {
            console.error('Failed to create data directory', error);
        }
    }

    /**
     * Reads a JSON file from the data directory.
     */
    static async readData<T>(filename: string): Promise<T | null> {
        try {
            await this.init();
            const filePath = path.join(DATA_DIR, filename);
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data) as T;
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                return null;
            }
            throw error;
        }
    }

    /**
     * Writes data to a JSON file in the data directory.
     */
    static async writeData<T>(filename: string, data: T): Promise<void> {
        try {
            await this.init();
            const filePath = path.join(DATA_DIR, filename);
            await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error(`Failed to write data to ${filename}`, error);
            throw error;
        }
    }
}
