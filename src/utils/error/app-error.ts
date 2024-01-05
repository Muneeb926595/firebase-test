import { IError } from "./types";

export class AppError extends Error implements IError {
    readonly ref: string;
    readonly parent: string;
    readonly operation: string;
    readonly details?: any;

    get headline() {
        return `Operation "${this.operation}" failed`;
    }

    static generateRef() {
        let ref = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < 3; i++)
            ref += possible.charAt(Math.floor(Math.random() * possible.length));

        for (let i = 0; i < 3; i++) ref += Math.floor(Math.random() * 9);

        return ref;
    }


    constructor(
        parent: string,
        operation: string,
        details?: any,
    ) {
        super(`${details}`);
        this.operation = operation;
        this.details = details;
        this.parent = parent;
        this.ref = AppError.generateRef();
    }
}
