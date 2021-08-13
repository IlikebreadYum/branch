const debug = true;
const fetch = require("node-fetch");
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
var acornsmade = 0;
function dologin(){
    (async () => {
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch({headless:!debug});
        const page = await browser.newPage();
        await page.goto('https://app.branchbeta.com/branch/refr477t/gqzcDQKc');
        //console.log("goto");
        await page.waitForSelector('.input');
        //console.log("got input");
        await page.type('.input', String(Math.floor(new Date() / 10)));
        //console.log("typed");
        await page.click('.right');
        //console.log("clicked");
        await page.screenshot("example");
        //console.log("ss");
        await page.waitForSelector('.qinYV');
        
        cookies = await page.cookies();
        await sendacorns(cookies[0].value);
        await browser.close();
        //console.log("closed");
        acornsmade+=1200;
        console.log(acornsmade);
        dologin();
      })();
}
function sendacorns(cookie){
   fetch("https://api.branchbeta.com/currency/acorns/transfer", {
        "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "authorization": `Bearer ${cookie} `,
        "content-type": "application/json",
        "crossdomain": "true",
        "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "withcredentials": "true"
        },
    "referrer": "https://app.branchbeta.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"organization_id\":3943,\"receiver_id\":11768,\"amount\":1200}",
    "method": "POST",
    "mode": "cors"
    }); 
}

dologin();


