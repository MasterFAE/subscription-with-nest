export type ExceptionPayload = {
    message?: string;
    code?: number;
    data?: any;
    description?: string;
    log_description?: any;
};
export type GeneratedException = ExceptionPayload & Error;
export declare class QueryException extends Error {
    message: string;
    name: string;
    code: number;
    description: string;
    data: any;
    log_description: any;
    constructor(payload: ExceptionPayload);
}
