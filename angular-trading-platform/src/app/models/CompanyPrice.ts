export class CompanyPrice {

    public change: number;
    public perChange: number;
    public currDate: any;
    public dataDate: any;
    public isMarketOpen = false;
    public currDateStr: string;
    public dataDateStr: string;

    constructor(
        public ticker: string,
        public timestamp: string,
        public last: number,
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
    ){

        this.change = (last - prevClose);
        this.perChange = (this.change / prevClose * 100);
        this.last = parseFloat(last.toFixed(2));
        this.dataDate = new Date(timestamp);
        this.currDate = new Date();

        // console.log(this.currDate.toString());
        // console.log(this.timestamp);
        // console.log(this.dataDate.toString());


        this.dataDateStr = this.getDateStr(this.dataDate);
        this.currDateStr = this.getDateStr(this.currDate);

        console.log((this.currDate - this.dataDate) < 60*1000);

        if ((this.currDate - this.dataDate) < 60 * 1000) {

            this.isMarketOpen = true;
        }

        console.log(this.isMarketOpen);

    }

    getDateStr(date: any) : string {
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();
        let hr = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        if (sec.length < 2)
            sec = '0' + day;

        return [year, month, day].join('-') + " " + [hr, min, sec].join(':');

    }


}

export interface PriceResponse {
    results: CompanyPrice[];
}