import { ObjectID, IndexOptions } from 'mongodb';
export declare const COLLECTION_KEY = "collection";
export declare const PRE_KEY = "pre";
export declare const POST_KEY = "post";
export interface UpdateByIdRequest {
    updates: any;
    upsert?: boolean;
}
export interface UpdateRequest extends UpdateByIdRequest {
    conditions: any;
}
export interface FindRequest {
    conditions: any;
    limit?: number;
    projection?: any;
    sort?: any;
    skip?: number;
}
export interface CollectionProps {
    name: string;
    capped?: boolean;
    size?: number;
    max?: number;
    indexes?: IndexDefinition[];
}
export interface IndexDefinition {
    fields: {
        [fieldName: string]: string | any;
    };
    options?: IndexOptions;
    overwrite?: boolean;
}
export interface Document {
    id?: string | ObjectID;
    [key: string]: any;
}
