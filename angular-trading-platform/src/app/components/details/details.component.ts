import { Component, OnInit } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import { ActivatedRoute } from "@angular/router";
import { CompanyDetails } from 'src/app/models/CompanyDetails';
import { CompanyPrice } from 'src/app/models/CompanyPrice';
import * as Highcharts from "highcharts/highstock";
import { DailyChart } from 'src/app/models/DailyChart';
import { tick } from '@angular/core/testing';
import { News } from 'src/app/models/News';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  companyDetails: CompanyDetails[] = [];
  companyPrice: CompanyPrice[];
  companyNews: News[];
  dailyChart = [];
  dailyData = [];
  ticker: string;
  isLoading = true;
  isChangePos = false;
  isChangeNeg = false;

  // companyNews = {
  //   results: [
  //     {
  //       url: 'https://lifehacker.com/should-you-upgrade-to-an-amd-zen-3-ryzen-cpu-1845313786',
  //       title: 'Should You Upgrade to an AMD Zen 3 Ryzen CPU?',
  //       description: 'AMD officially announced its brand-new Zen 3 Ryzen CPUs today, and gave graphics-starved gamers a little taste of what they can expect from the release of Big Navi later this month. We’ve extracted as many details as possible from AMD’s event. Here’s what you…',
  //       source: 'Lifehacker.com',
  //       urlToImage: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/myzq35mxwyrq4o1azqp3.png',
  //       publishedAt: '2020-10-08T18:45:00Z'
  //     },
  //     {
  //       url: 'https://www.engadget.com/amd-radeon-6000-tease-165623408.html',
  //       title: "AMD teases its next-gen Radeon GPU's 4K performance",
  //       description: 'We’ll have to wait until October 28th to get a full look at AMD’s new Radeon 6000-series GPUs, but the company offered a tease of what we can expect from its latest graphics cards at the end of its Zen 3 keynote.AMD showed off a benchmark of a ‘Big Navi’ GPU,…',
  //       source: 'Engadget',
  //       urlToImage: 'https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-10%2Fb38c7880-0985-11eb-9fce-6950b322b2de&client=amp-blogside-v2&signature=95c02ee18df2e5dfb550c24e73c31de8a4d0f301',
  //       publishedAt: '2020-10-08T16:56:23Z'
  //     },
  //     {
  //       url: 'https://www.engadget.com/amd-zen-3-radeon-big-navi-112441747.html',
  //       title: 'The Morning After: AMD teased its Radeon 6000 Series GPU',
  //       description: 'So, how many of you actually coughed up $30 to stream Mulan on Disney+? If you wanted to see the flick but didn’t get excited about having a “premier access” VOD tied to your Disney+ subscription, it’s available for a straight-up $30 purchase via the usual di…',
  //       source: 'Engadget',
  //       urlToImage: 'https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-10%2F37571fe0-0a20-11eb-bf25-fef1e6ed8e4c&client=amp-blogside-v2&signature=fce311fdc046e2b24c91e5c7dbe3c603d31eda4c',
  //       publishedAt: '2020-10-09T11:24:41Z'
  //     },
  //     {
  //       url: 'https://gizmodo.com/amd-ryzen-processors-are-finally-coming-to-chromebooks-1845132056',
  //       title: 'AMD Ryzen Processors Are Finally Coming to Chromebooks',
  //       description: 'Today AMD announced its Ryzen processor series is joining the Chromebook family—Athlon, too. Both APUs (that means CPU and integrated graphics in non-AMD terms) include Radeon Vega integrated graphics and will be found in mid-level to high-end Chromebooks wit…',
  //       source: 'Gizmodo.com',
  //       urlToImage: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/pgdvyt3cusm57nyza0vk.jpg',
  //       publishedAt: '2020-09-22T13:00:00Z'
  //     },
  //     {
  //       url: 'https://gizmodo.com/amd-can-do-almost-no-wrong-except-for-the-horrible-loc-1845326324',
  //       title: 'AMD Can Do Almost No Wrong, Except for the Horrible Lock Mechanism on Its Mobos',
  //       description: 'As far as desktop processors are concerned, AMD has been killing it for the last few years. If you missed the big announcement on Thursday, the company’s launching its next-gen CPUs, Ryzen 5000, on November 5. If all the benchmark numbers they presented in it…',
  //       source: 'Gizmodo.com',
  //       urlToImage: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/ilaijwjfxu5oy8aker80.jpg',
  //       publishedAt: '2020-10-10T14:00:00Z'
  //     },
  //     {
  //       url: 'https://gizmodo.com/if-amds-big-zen-3-claim-is-true-intels-in-trouble-1845312792',
  //       title: "If AMD's Big Zen 3 Claim Is True, Intel's In Trouble",
  //       description: 'This morning AMD revealed all the juicy details about its upcoming Ryzen 5000-series processors. While I don’t need to upgrade my CPU, or even my motherboard, the leap from AMD’s Zen 2 to Zen 3 architecture appears to be so good that I just might do it anyway…',
  //       source: 'Gizmodo.com',
  //       urlToImage: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/hvp2it4me8dkdqd7nk9m.png',
  //       publishedAt: '2020-10-08T18:00:00Z'
  //     },
  //     {
  //       url: 'https://www.engadget.com/lenovo-joins-the-chromebook-business-fray-with-an-amd-powered-convertible-130047298.html',
  //       title: "Lenovo's Thinkpad C13 Yoga is a Chromebook built for the office",
  //       description: 'Lenovo has unveiled the Thinkpad C13 Yoga Chromebook, joining HP and Dell in offering Chrome OS powered laptops for businesses. The idea is to deliver the security and organizational features of Chrome OS and Google’s Workspace (formerly G Suite) apps for cor…',
  //       source: 'Engadget',
  //       urlToImage: 'https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-10%2Fb62081b0-0a05-11eb-8fba-c47f1ddcfd0e&client=amp-blogside-v2&signature=6a8ea48f7bb594982ee2885e8fb9cd9f9fbb4313',
  //       publishedAt: '2020-10-12T15:00:47Z'
  //     },
  //     {
  //       url: 'https://www.engadget.com/hp-pavilion-laptops-ocean-bound-plastics-120034594.html',
  //       title: "HP's first Intel 11th-gen laptops use recycled ocean-bound plastics",
  //       description: 'HP has unveiled its latest 13-, 14- and 15-inch Pavilion laptops that are its first to use 11th-generation Intel Core processors and Iris XE graphics that should deliver a huge GPU boost over last-gen Intel chips. They’re also among the company’s first laptop…',
  //       source: 'Engadget',
  //       urlToImage: 'https://o.aolcdn.com/images/dims?resize=1200%2C630&crop=1200%2C630%2C0%2C0&quality=95&image_uri=https%3A%2F%2Fs.yimg.com%2Fos%2Fcreatr-uploaded-images%2F2020-09%2F073fb9a0-fcad-11ea-97d4-47c4837d0715&client=amp-blogside-v2&signature=8860c83b1249f37bb288b7d42e885e877b65d519',
  //       publishedAt: '2020-09-22T12:00:34Z'
  //     },
  //     {
  //       url: 'https://arstechnica.com/gadgets/2020/10/amds-new-zen-3-ryzen-desktop-cpus-arrive-november-5/',
  //       title: 'AMD’s new Zen 3 Ryzen desktop CPUs arrive November 5',
  //       description: "AMD isn't letting up the pressure on Intel—Ryzen 9 5900X looks like a barn burner.",
  //       source: 'Ars Technica',
  //       urlToImage: 'https://cdn.arstechnica.net/wp-content/uploads/2020/10/lisa-su-holds-up-zen3-760x380.png',
  //       publishedAt: '2020-10-08T17:59:07Z'
  //     },
  //     {
  //       url: 'https://www.wired.com/story/weekend-deals-sept-19-2020/',
  //       title: '19 Best Weekend Deals: Cameras, Apple Gear, and Games',
  //       description: "The new 8th-generation iPad is already slightly discounted, alongside headphones, laptops, and PS4 titles like 'Ghosts of Tsushima'.",
  //       source: 'Wired',
  //       urlToImage: 'https://media.wired.com/photos/5f62473ca2b5732bb888bfa8/191:100/w_1280,c_limit/Gear-Apple-iPad-8th-Gen-SOURCE-Apple.jpg',
  //       publishedAt: '2020-09-19T11:00:00Z'
  //     },
  //     {
  //       url: 'https://www.businessinsider.com/5-reasons-amd-stock-price-upside-potential-bank-america-2020-9',
  //       title: '5 reasons why AMD has 31% upside potential, according to Bank of America (AMD)',
  //       description: 'Summary List Placement\n' +
  //         '\n' +
  //         '<ul>\n' +
  //         '<li>Investors should take advantage of the recent sell-off and buy AMD ahead of a compelling growth opportunity in 2021, Bank of America said in a note on Friday.</li>\n' +
  //         '<li>AMD is poised to take market share in the semiconductor sp…',
  //       source: 'Business Insider',
  //       urlToImage: 'https://i.insider.com/5f64c48157b7da001ee126dd?width=1200&format=jpeg',
  //       publishedAt: '2020-09-18T16:16:54Z'
  //     },
  //     {
  //       url: 'https://gizmodo.com/lenovo-finally-jumped-the-shark-on-wireless-earbuds-wit-1845207810',
  //       title: 'Lenovo Finally Jumped the Shark on Wireless Earbuds with the ThinkBook 15 Gen 2',
  //       description: 'With companies continuing to push people towards wireless audio this was an inevitability. Today Lenovo took things to their natural conclusion with the ThinkBook 15 Gen 2, which is the world’s first laptop to feature a pair of built-in wireless earbuds. Read…',
  //       source: 'Gizmodo.com',
  //       urlToImage: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/qi1kx1iyfar3tueihpnc.jpg',
  //       publishedAt: '2020-09-29T10:00:00Z'
  //     },
  //     {
  //       url: 'https://mashable.com/shopping/sept-29-acer-nitro-gaming-monitor-amazon/',
  //       title: 'Get ready for new PC game releases with $150 off an Acer Nitro gaming monitor',
  //       description: 'SAVE $150: Get the Acer Nitro XV272U 27-inch WQHD (2560 x 1440) IPS monitor for $299.99 at Amazon as of Sept. 29. \n' +
  //         '\n' +
  //         "Fall means more than the arrival of pumpkin spice and ostentatious Halloween decorations. It's the beginning of new video game season. And for …",
  //       source: 'Mashable',
  //       urlToImage: 'https://mondrian.mashable.com/2020%252F09%252F29%252F87%252F540b89edf52d47b48671d3422165750b.64cd9.png%252F1200x630.png?signature=ERWmMzSVMcHJLdD_KcMUYT4xRA4=',
  //       publishedAt: '2020-09-29T17:01:41Z'
  //     },
  //     {
  //       url: 'https://www.pcgamer.com/amds-high-end-ryzen-5000-cpus-dont-come-with-coolers-because-theyre-optimised-for-enthusiasts/',
  //       title: "AMD's high-end Ryzen 5000 CPUs don't come with coolers because they're 'optimised for enthusiasts' - PC Gamer UK",
  //       description: "<ol><li>AMD's high-end Ryzen 5000 CPUs don't come with coolers because they're 'optimised for enthusiasts'  PC Gamer UK\r\n" +
  //         '</li><li>AMD ZEN 3 Full Details.... Intel should be VERY worried...  JayzTwoCents\r\n' +
  //         '</li><li>AMD outs Radeon RX 6000 performance - same as …',
  //       source: 'PC Gamer',
  //       urlToImage: 'https://cdn.mos.cms.futurecdn.net/MGRULDB76mLN8mre9vHx4A-1200-80.jpg',
  //       publishedAt: '2020-10-08T17:39:00Z'
  //     },
  //     {
  //       url: 'https://www.androidcentral.com/hp-announces-amd-ryzen-powered-pro-c645-chromebook',
  //       title: 'HP announces the AMD Ryzen-powered Pro c645 Chromebook',
  //       description: 'What you need to know\n' +
  //         '\n' +
  //         '\n' +
  //         'HP launched two Chrome Enterprise devices this morning: a new G3 Chromebox and the Pro c645 Chromebook.\n' +
  //         'There are options to order the HP Chromebook Pro c645 with AMD Ryzen processors.\n' +
  //         'Hints that a Ryzen-powered Chromebook was coming s…',
  //       source: 'Android Central',
  //       urlToImage: 'https://www.androidcentral.com/sites/androidcentral.com/files/styles/large/public/article_images/2020/09/hp-pro-c645_chromebook.jpeg',
  //       publishedAt: '2020-09-22T13:39:47Z'
  //     },
  //     {
  //       url: 'https://mashable.com/article/lenovo-thinkbook-earbuds/',
  //       title: 'Lenovo’s new laptop has a unique way of storing your earbuds',
  //       description: 'In the age of near-constant video calls (so many!), being on the move and forgetting your headphones can be a pretty big nuisance. \n' +
  //         "Lenovo has a pretty elegant solution (via TechRadar), which we haven't seen on a laptop before. The company's new ThinkBook 15 …",
  //       source: 'Mashable',
  //       urlToImage: 'https://mondrian.mashable.com/2020%252F09%252F30%252Fee%252F2a608962cbab43219f66eee7214395bc.fec1c.jpg%252F1200x630.jpg?signature=bY-Q8eIAyo05r5YHcA2B0cb4VpQ=',
  //       publishedAt: '2020-09-30T07:32:35Z'
  //     },
  //     {
  //       url: 'https://www.cnet.com/news/amd-adds-a-little-zen-plus-to-its-chromebook-processors/',
  //       title: 'AMD adds a little Zen Plus to its Chromebook processors - CNET',
  //       description: 'Faster Chromebooks on the ho-Ryzen?',
  //       source: 'CNET',
  //       urlToImage: 'https://cnet1.cbsistatic.com/img/BiO39lsBNxGMK1aOSUMJasjy6kk=/1200x630/2020/09/21/2ce494e4-8f29-4695-b435-646d86059f2b/ryzen-1.png',
  //       publishedAt: '2020-09-22T13:00:13Z'
  //     },
  //     {
  //       url: 'https://venturebeat.com/2020/09/22/amd-launches-low-end-ryzen-and-athlon-processors-for-chromebooks/',
  //       title: 'AMD launches low-end Ryzen and Athlon processors for Chromebooks',
  //       description: 'Advanced Micro Devices is launching new Ryzen and Athlon mobile processors that serve as the brains of a new generation Chromebooks.',
  //       source: 'VentureBeat',
  //       urlToImage: 'https://venturebeat.com/wp-content/uploads/2020/09/amd-ryzen.jpg?w=1200&strip=all',
  //       publishedAt: '2020-09-22T13:00:30Z'
  //     },
  //     {
  //       url: 'https://venturebeat.com/2020/10/08/amd-reveals-ryzen-5000-series-chips-with-towering-gaming-performance/',
  //       title: 'AMD reveals Ryzen 5000-series chips with towering gaming performance',
  //       description: 'The AMD Ryzen 5000-series chips are launching November 5, and they may represent a leap forward in gaming performance and pricing.',
  //       source: 'VentureBeat',
  //       urlToImage: 'https://venturebeat.com/wp-content/uploads/2020/10/ryzen-core.jpg?w=1200&strip=all',
  //       publishedAt: '2020-10-08T19:52:32Z'
  //     }
  //   ],
  //   success: true
  // }

  // High charts initialization
  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    series: [
      {
        type: 'spline',
        data: [],
        tooltip: {
          valueDecimals: 2
        }
      }
    ],
    rangeSelector:{
      enabled:false
    },
    title: {
      useHTML: true,
    },

  }

  constructor(private detailService: DetailsService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.ticker = params.get("ticker");
    })

    this.detailService.getCompanyDetails(this.ticker).subscribe ( responseList => {

      this.companyDetails = responseList[0].results;
      this.companyPrice = responseList[1].results;

      if (this.companyPrice[0].change < 0) {
        this.isChangeNeg = true;
      }else if (this.companyPrice[0].change > 0) {
        this.isChangePos = true;
      }

      this.companyPrice[0].change = parseFloat(this.companyPrice[0].change.toFixed(2));
      this.companyPrice[0].perChange = parseFloat(this.companyPrice[0].perChange.toFixed(2));

      // console.log(this.companyPrice);
      // console.log(this.companyDetails);


      this.detailService.getDailyChart(this.ticker, this.companyPrice[0].timestamp.slice(0, 10)).subscribe(res => {

        this.dailyChart = res.results;
        this.updateDailyChartData();
        this.isLoading = false;
      });


      this.detailService.getNewsAndHisChart(this.ticker).subscribe ( responseList => {

        this.companyNews = responseList[0].results;
        console.log(this.companyNews);

      });


    });


  }


  calculateClassesForPrice() {
    return {
        'positive': this.isChangePos,
        'negative': this.isChangeNeg
    };
  }


  updateDailyChartData() {
    for (var i = 0; i < this.dailyChart.length; i++) {
      this.dailyChart[i] = [new Date(this.dailyChart[i].date).getTime(), this.dailyChart[i].close]
    }

    this.chartOptions.series[0]['data'] = this.dailyChart;
    this.chartOptions.series[0]['name'] = this.ticker.toUpperCase();
    this.chartOptions.title['text'] = '<h2>' + this.ticker.toUpperCase() + '</h2>';

    if (this.isChangeNeg) {
      this.chartOptions.series[0].color = '#ff100d';
    }else if (this.isChangePos){
      this.chartOptions.series[0].color = '#00821a';
    }else{
      this.chartOptions.series[0].color = '#000000';
    }


  }

}
