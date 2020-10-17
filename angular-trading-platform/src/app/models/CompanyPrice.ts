export class CompanyPrice {

    public change: number;
    public perChange: number;
    public currDate: number;

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

    }


    setCurrentTime(){
        let date = new Date();
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

        // this.currTimeStr = [year, month, day].join('-') + " " + [hr, min, sec].join(':');
        // this.currTimeDate = date;
    }


}

export interface PriceResponse {
    results: CompanyPrice[];
}