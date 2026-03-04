import { StorageUtil } from '../utils/storage';
import { v4 as uuidv4 } from 'uuid';

export interface MemoryItem {
    id: string;
    data: string;
    timestamp: string;
}

export class MemoryService {
    private readonly filename = 'memory.json';

    /**
     * Loads all memory from storage.
     */
    async loadMemory(): Promise<MemoryItem[]> {
        const data = await StorageUtil.readData<MemoryItem[]>(this.filename);
        return data || [];
    }

    /**
     * Saves all memory to storage.
     */
    async saveMemory(memoryList: MemoryItem[]): Promise<void> {
        await StorageUtil.writeData(this.filename, memoryList);
    }

    /**
     * Stores new information in memory.
     */
    async storeData(data: string): Promise<MemoryItem> {
        const memoryList = await this.loadMemory();
        const newItem: MemoryItem = {
            id: uuidv4(),
            data,
            timestamp: new Date().toISOString()
        };
        memoryList.push(newItem);
        await this.saveMemory(memoryList);
        return newItem;
    }
}
