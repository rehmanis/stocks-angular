# Stocks Web Application
An Angular web application for virtual stock trading made as part of CSCI571 Web Technologies USC course

## Large Screen Demo
[![App Demo large screen](./other/demo-lg.gif)](https://csci571-trading-platform.wl.r.appspot.com/)

## Small Screen Demo
[![App Demo small](./other/demo-sm.gif)](https://csci571-trading-platform.wl.r.appspot.com/)


## Summary
This Angular app provides a platform for stocks trading, including, features such as searching company stock details, buying/selling stocks, keeping track of stock porfolio/watchlist, viewing stock price charts and news, allowing sharing news on twitter and facebook for a given stock. Custom Nodejs backend deployed using GCP is used for all API calls. The backend uses [Tingo API](https://api.tiingo.com/) for all stock related data, and [News API](https://newsapi.org/) for displaying stock related news. [Highcharts](https://www.highcharts.com/) is used for displaying the chart data for a given ticker.


## Usage
### Running the GCP deployed App:
* Go to [https://csci571-trading-platform.wl.r.appspot.com/](https://csci571-trading-platform.wl.r.appspot.com/)

### Running the app Locally:

1. clone the repo using ```git clone https://github.com/rehmanis/csci571-trading-platform.git```
2. ```npm install```
3. ```ng build```
4. ```npm run devstart```
5. open ```Chrome``` or ```Firefox```. The App can then be started on ```http://localhost:3000/```


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
    
