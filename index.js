const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
var activefollow;
let answers = [
    'Seems unlikely.',
    'Not a chance.',
    'In your dreams.',
    'Get real, kid.',
    'Absolutely.',
    'Maybe.',
    'It is certain.',
    'Ask me later.',
    'Chances seem good.',
    'I don\'t know, I\'m just a stupid marble.',
    'Ask again later.',
    'Signs point to yes.',
    'No.',
    'Yes.',
    'Nope.',
    'Don\'t count on it.'
  ];
(async () => {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('https://app.branchbeta.com/branch/team');
    await page.waitForSelector('.input');
    sleep(500)
    await page.type('.input', "pheons pet");
    sleep(500)
    await page.click('.right');
    await page.screenshot({ path: 'example.png' });
    await page.waitForSelector('.qinYV');
    await page.click('.qinYV')
    await page.waitForSelector('.ka-DbTP');
    //search chat
    await page.keyboard.press('Enter');
    //await page.waitForSelector('.izLqQS');
    page.evaluate(() =>{
        setInterval(() =>{
            chatbox = document.getElementsByClassName('izLqQS');
            if(!chatbox.length == 0){
                if(!chatbox[0].children.length == 0){
                    if(chatbox[0].children[0].innerText!="ignore"){
                        var message = `chat: ${chatbox[0].children[0].innerText}`;
                        chatbox[0].children[0].innerText = "ignore";
                        console.log(message);
                    }
                }
            }
        }, 200)
    })
    page.on('console', (msg) => {
        text = msg._text;   
        console.log(text);
        if(text.startsWith("chat")){
            args = text.split(": ");
            console.log(args);
            docommand(args[2], args[1],  page);
        }
    })
  })();

  async function docommand(cmd,user,p){
    var msg;
    console.log(user);
    if(cmd.startsWith("$ping")){
        msg = `@${user} pong`
    }
    if(cmd.startsWith("$help")){
        msg = `Commands:  &4$help: returns this menu  &b$ping: returns pong  &4$8ball <question> gives you a 8ball answer`
    }
    if(cmd.startsWith("$8ball")){
        let index = Math.floor(Math.random() * answers.length);
        msg = answers[index];
    }
    if(cmd.startsWith('$tphere')){
        await p.evaluate((user) =>{

            __BRANCH__.engine.worldManager.entityManager.getPlayers().forEach(v => {
                if(v.name == user){
                    __BRANCH__.engine.worldManager.entityManager.getPlayer().setX(v.body.x);
                    __BRANCH__.engine.worldManager.entityManager.getPlayer().setY(v.body.y);
                    __BRANCH__.engine.worldManager.entityManager.getPlayer().tryMove();
                }
                });
        },user);
    }
    if(cmd.startsWith('$follow')){
        clearInterval(activefollow)
        if(cmd.split(" ").length > 1){
            user = cmd.split(" ")[1];
            console.log(user);
        }
        activefollow = setInterval(()=>{
            p.evaluate((user)=>{
                __BRANCH__.engine.worldManager.entityManager.getPlayers().forEach(v => {
                    if(v.name == user){
                        __BRANCH__.engine.worldManager.entityManager.getPlayer().setX(v.body.x);
                        __BRANCH__.engine.worldManager.entityManager.getPlayer().setY(v.body.y);
                        __BRANCH__.engine.worldManager.entityManager.getPlayer().tryMove();
                    }
                });
            },user)
        },100);
    }


    if(cmd.startsWith('$stopfollow')){
        clearInterval(activefollow);
    }

    if(msg){
        await p.keyboard.type(msg);
        await p.keyboard.press('Enter');
        await p.keyboard.press('Enter');
    }
  }