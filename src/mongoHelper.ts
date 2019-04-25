import { MongoClient, Db } from 'mongodb';
 
export class MongoHelper {

  public static client: MongoClient;
 
  public static connect(url: string): Promise<MongoClient> {
    return new Promise<MongoClient>((resolve, reject) => {
      MongoClient.connect(url, {useNewUrlParser: true})
      .then((client: MongoClient) => {
        MongoHelper.client = client;
        resolve(client);
      })
      .catch((err) => reject(err))
    });
  }

  public static getDb() : Db {
    return MongoHelper.client.db();
  }
 
  public disconnect(): void {
    MongoHelper.client.close();
  }
}