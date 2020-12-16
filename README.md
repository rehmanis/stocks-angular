# Stocks Web Application
An Angular web application for virtual stock trading made as part of CSCI571 Web Technologies USC course

## Large Screen Demo
[![App Demo large screen](./other/demo-lg.gif)](https://csci571-trading-platform.wl.r.appspot.com/)

## Small Screen Demo
[![App Demo small](./other/demo-sm.gif)](https://csci571-trading-platform.wl.r.appspot.com/)


## Summary
This Angular app provides a platform for stocks trading, including, features such as searching company stock details, buying/selling stocks, keeping track of stock porfolio/watchlist, viewing stock price charts and news, allowing sharing news on twitter and facebook for a given stock. Express with Nodejs is used as a server proxy for all API calls that uses [Tingo API](https://api.tiingo.com/) for all stock related data, and [News API](https://newsapi.org/) for displaying stock related news. [Highcharts](https://www.highcharts.com/) is used for displaying the chart data for a given ticker.


## Usage
### Running the GCP deployed App:
* Go to [https://csci571-trading-platform.wl.r.appspot.com/](https://csci571-trading-platform.wl.r.appspot.com/)

### Running the app Locally:
Before running make sure Angular CLI and Nodejs are installed. For this project ```Angular CLI 10.1.6``` and ```Node 12.19.0``` was used.
1. clone the repo using ```git clone https://github.com/rehmanis/CSCI571-Stocks-Angular.git```
3. ```cd CSCI571-Stocks-Angular```
2. ```npm install```
3. ```ng build```
4. ```npm run devstart```
5. open ```Chrome``` or ```Firefox```. The App can then be started on ```http://localhost:3000/```

### API endpoints
The following are the 6 API endpoints to get Stock data and News.
1. ```/api/detail/<ticker>```: get JSON object with company details/summary
    * Example for GCP endpoints: https://csci571-trading-platform.wl.r.appspot.com/api/detail/aapl
    * Example for when running locally: http://localhost:3000/api/detail/msft

2. ```/api/price/<ticker1>,<ticker2>,...```: get JSON object with all companies prices points, volumes, etc.
    * Example for GCP endpoints: https://csci571-trading-platform.wl.r.appspot.com/api/price/aapl,msft
    * Example for when running locally: http://localhost:3000/api/price/msft,amd,tsla
        
3. ```/api/chart/daily/<ticker>/<startDate:YYYY-MM-DD>```: get the JSON object that contains the timestamp, close price, high price, low price, and open price. This was used to display daily chart data.
    * Example for GCP endpoint: https://csci571-trading-platform.wl.r.appspot.com/api/chart/daily/aapl/2020-12-16
    * Example for when running locally: http://localhost:3000/api/chart/daily/aapl/2020-12-02

4. ```/api/chart/historical/<ticker>```: get the JSON object that contains historical price data from last two years from now. This is used to plot the SMA chart
    * Example for GCP endpoint: https://csci571-trading-platform.wl.r.appspot.com/api/chart/historical/work
    * Example for when running locally: http://localhost:3000/api/chart/historical/tsla

5. ```/api/news/<search query>``` : get the JSON object that contains all news articles related to the searched query. The search query for this project is the ticker for the company. The articles are restricted to 20.
    * Example for GCP endpoint: https://csci571-trading-platform.wl.r.appspot.com/api/news/amd
    * Example for when running locally: http://localhost:3000/api/news/amd

6. ```/api/search/<search query>```: get the JSON object for all search query. This is used for auto complete feature when searching for the ticker.
    * Example for GCP endpoint: https://csci571-trading-platform.wl.r.appspot.com/api/search/apple
    * Example for when running locally: http://localhost:3000/api/search/warner

## License
MIT License

Copyright (c) 2020 Shamsuddin Rehmani

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
    
