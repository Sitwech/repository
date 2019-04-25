import { Collection, DeleteWriteOpResultObject } from 'mongodb';
import { CollectionProps, Document, FindRequest, UpdateByIdRequest, UpdateRequest } from './types';
export declare class MongoRepository<DOC, DTO = DOC> {
    collection: Promise<Collection<DOC>>;
    readonly options: CollectionProps;
    /**
     * Creates an instance of MongoRepository.
     * @memberof MongoRepository
     */
    constructor();
    /**
     * Finds a record by id
     *
     * @param {string} id
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    findById(id: string): Promise<DOC>;
    /**
     * Find multiple documents by a list of ids
     *
     * @param {string[]} ids
     * @returns {Promise<T[]>}
     * @memberof MongoRepository
     */
    findManyById(ids: string[]): Promise<DOC[]>;
    /**
     * Finds a record by a list of conditions
     *
     * @param {object} conditions
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    findOne(conditions: object): Promise<DOC>;
    /**
     * Find records by a list of conditions
     *
     * @param {FindRequest} [req={ conditions: {} }]
     * @returns {Promise<T[]>}
     * @memberof MongoRepository
     */
    find(req?: FindRequest): Promise<DOC[]>;
    /**
     * Create a document of type T
     *
     * @param {DTO} document
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    create(document: DTO): Promise<DOC>;
    /**
     * Save any changes to your document
     *
     * @param {Document} document
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    save(document: Document): Promise<DOC>;
    /**
     * Find a record by ID and update with new values
     *
     * @param {string} id
     * @param {UpdateByIdRequest} req
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    findOneByIdAndUpdate(id: string, req: UpdateByIdRequest): Promise<DOC>;
    /**
     * Find a record and update with new values
     *
     * @param {UpdateRequest} req
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    findOneAndUpdate(req: UpdateRequest): Promise<DOC>;
    /**
     * Delete a record by ID
     *
     * @param {string} id
     * @returns {Promise<DeleteWriteOpResultObject>}
     * @memberof MongoRepository
     */
    deleteOneById(id: string): Promise<DeleteWriteOpResultObject>;
    /**
     * Delete a record
     *
     * @param {*} conditions
     * @returns {Promise<DeleteWriteOpResultObject>}
     * @memberof MongoRepository
     */
    deleteOne(conditions: any): Promise<DeleteWriteOpResultObject>;
    /**
     * Delete multiple records
     *
     * @param {*} conditions
     * @returns {Promise<any>}
     * @memberof MongoRepository
     */
    deleteMany(conditions: any): Promise<DeleteWriteOpResultObject>;
    /**
     * Strip off Mongo's ObjectID and replace with string representation or in reverese
     *
     * @private
     * @param {*} document
     * @param {boolean} replace
     * @returns {T}
     * @memberof MongoRepository
     */
    protected toggleId(document: any, replace: boolean): DOC;
    /**
     * Return a collection
     * If the collection doesn't exist, it will create it with the given options
     *
     * @private
     * @returns {Promise<Collection<DOC>>}
     * @memberof MongoRepository
     */
    private getCollection;
    /**
     * Apply functions to a record based on the type of event
     *
     * @private
     * @param {string} type any of the valid types, PRE_KEY POST_KEY
     * @param {string[]} fns any of the valid functions: update, updateOne, save, create, find, findOne, findMany
     * @param {*} document The document to apply functions to
     * @returns {Promise<DOC>}
     * @memberof MongoRepository
     */
    private invokeEvents;
}
