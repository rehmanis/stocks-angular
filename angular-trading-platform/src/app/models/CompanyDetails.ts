export class CompanyDetails {

    constructor(
        public ticker: string, 
        public name: string,
        public description: string,
        public startDate: string,
        public exchangeCode: string) {

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

export interface DetailsResponse {
    results: CompanyDetails[];
}