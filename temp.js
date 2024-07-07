// const pup = require("puppeteer");
import Puppeteer from 'puppeteer';
import * as fs from 'fs';

export async function main(){
    let browser = await Puppeteer.launch({
        headless : false,
        defaultViewport : false,
        args : ["--start-maximized"]
    });
    let headlines = {
        "ET" : {},
        "Hindu" : {},
        "HT" : {},
        "TOI" : {},
        "covid" : {}
    };

    // NY-Times start

    const page = await browser.newPage();
    await page.goto("https://www.nytimes.com/section/todayspaper",{timeout: 0});

    await page.waitForSelector(".css-1sd6y0f.e1b0gigc0", {visible : true});
    let ETnews1 = await page.$$(".css-1sd6y0f.e1b0gigc0");
    for(let i=0 ; i<2 ; i++){
        let headline1 = await page.evaluate(function(ele){
                return ele.textContent;                                 
        }, ETnews1[i]);
        console.log(headline1);
        headlines["ET"][i] = headline1;
    }

    let headline2 = await page.evaluate(function(ele){
        return ele.textContent;                                 
    }, ETnews1[3]);
console.log(headline2);
headlines["ET"][2] = headline2;

    await page.waitForSelector(".css-1u3p7j1", {visible : true});
    let ETnews = await page.$$(".css-1u3p7j1");
    let j1 = 3;
    for(let i=0 ; i<ETnews.length ; i++){
        let headline = await page.evaluate(function(ele){
                return ele.textContent;                                 
        }, ETnews[i]);
        console.log(headline);
        headlines["ET"][j1] = headline;
        j1++;
    }

    let ETnews2 = await page.$$(".css-19ucebh");
    headlines["ET"]["img"] = await page.evaluate(function(ele){
        return ele.getAttribute("src");
    },ETnews2[3]);
    console.log(headlines["ET"]);

    // NY Times end


    // USA Daily start
    await page.goto("https://www.usatoday.com/",{timeout: 0});

    await page.waitForSelector(".gnt_m_tl_c.gnt_m_tl_c__br", {visible : true});
    let Hindu1 = await page.$$(".gnt_m_tl_c.gnt_m_tl_c__br");
    console.log(Hindu1.length);
    for(let i=0 ; i<1 ; i++){
        let headline1 = await page.evaluate(function(ele){
                return ele.textContent;                                 
        }, Hindu1[i]);
        console.log(headline1);
        headlines["Hindu"][i] = headline1;
    }

    let j2 = 1;
    let Hindu2 = await page.$$(".gnt_m_th_a");
    console.log(Hindu2.length);
    for(let i=0 ; i<7 ; i++){
        let headline1 = await page.evaluate(function(ele){
                return ele.textContent;                                 
        }, Hindu2[i]);
        console.log(headline1);
        headlines["Hindu"][j2] = headline1;
        j2++;
    }

    let Hindu12 = await page.$$(".gnt_m_tl_i");
    let a1 = "https://www.usatoday.com";
    let a2 = await page.evaluate(function(ele){
        return ele.getAttribute("src");
    },Hindu12[0]);
    headlines["Hindu"]["img"] = a1+a2;
    console.log(headlines["Hindu"]);

    // USA Today ends

    //The Wasinghton Times start
    await page.goto("https://www.themercury.com.au/",{timeout: 0});

    await page.waitForSelector(".storyblock_title_link", {visible : true});
    let HT1 = await page.$$(".storyblock_title_link");
    console.log(HT1.length);
    for(let i=0 ; i<8 ; i++){
        let headline1 = await page.evaluate(function(ele){
                return ele.textContent;                                 
        }, HT1[i]);
        console.log(headline1);
        headlines["HT"][i] = headline1;
    }
    
    await page.waitForSelector(".responsive-img_img.storyblock_img", {visible : true});
    let HTT1 = await page.$$(".responsive-img_img.storyblock_img");
    let headline1 = await page.evaluate(function(ele){
        return ele.getAttribute("src");                                 
    }, HTT1[0]);
    console.log(headline1);
    headlines["HT"]["img"] = headline1;
    console.log(headlines["HT"]);
    // The washington times ends

    // The seattle times start
    await page.goto("https://www.dailyherald.com/",{timeout: 0});

    await page.waitForSelector(".listNewsAnc.oscFont.boxShadowTransition.boxShadowBelowHover.anchorBlockStyle.article", {visible : true});
    let TOI1 = await page.$$(".listNewsAnc.oscFont.boxShadowTransition.boxShadowBelowHover.anchorBlockStyle.article");
    console.log(TOI1.length);
    let j=0;
    for(let i=0 ; i<5 ; i++){
        let headline1 = await page.evaluate(function(ele){
                return ele.textContent;                                 
        }, TOI1[i]);
        console.log(headline1);
        headlines["TOI"][j] = headline1;
        j++;
    }

    await page.waitForSelector(".oscFont", {visible : true});
    let TOI2 = await page.$$(".oscFont");
    console.log(TOI2.length);
    for(let i=0 ; i<3 ; i++){
        let headline1 = await page.evaluate(function(ele){
                return ele.textContent;                                 
        }, TOI2[i]);
        console.log(headline1);
        headlines["TOI"][j] = headline1;
        j++;
    }
    
    await page.waitForSelector(".img-fluid", {visible : true});
     HTT1 = await page.$$(".img-fluid");
     headline1 = await page.evaluate(function(ele){
        return ele.getAttribute("src");                                 
    }, HTT1[0]);
    console.log(headline1);
    headlines["TOI"]["img"] = headline1;
    console.log(headlines["TOI"]);



    fs.writeFileSync("finalDa.json", JSON.stringify(headlines));
    function trimEndLine(headline){
        let newstr = "";
        for( let i = 0; i < headline.length; i++ ) 
            if( !(headline[i] == '\n' || headline[i] == '\r') )
                newstr += headline[i];
                
        return newstr;
    }


}
main();