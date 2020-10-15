export class CompanyDetails {

    constructor(
        private ticker: string, 
        private name: string,
        private lastPrice: number,
        private change: number,
        private perChange: number,
        private timestamp: string,
        private marketStatus: string,
        private lasteTimestamp: string ) {}
}

export interface DetailsResponse {
    total: Number;
    results: CompanyDetails[];
    success: boolean;
}