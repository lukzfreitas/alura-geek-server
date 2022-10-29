export class QueryParams {

    limit: number;

    constructor({ limit = 10 }) {
        this.limit = limit;
    }
}