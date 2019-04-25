import { MongoClient, Db } from 'mongodb';
export declare class MongoHelper {
    static client: MongoClient;
    static connect(url: string): Promise<MongoClient>;
    static getDb(): Db;
    disconnect(): void;
}
