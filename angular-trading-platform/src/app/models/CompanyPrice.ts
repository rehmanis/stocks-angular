export class CompanyPrice {

    public change: number;
    public perChange: number;
    public currDate: number;

    constructor(
        public ticker: string,
        public timestamp: string,
        public last: string,
        public prevClose: number,
        public open: number,
        public high: number,
        public low: number,
        public mid: number,
        public volume: number, 
        public bidSize: number,
        public bidPrice: number,
        public askSize: number,
        public askPrice: number
    ){}


}

export interface PriceResponse {
    results: CompanyPrice[];
}