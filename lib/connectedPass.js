const puppeteer = require('puppeteer');

async function getConnectedTokenPass() {x
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.authenticate({username: process.env.USERNAME, password: process.env.PASSWORD})
        await page.goto('https://dev.mycanal.fr/mes-videos/');
        const cookies = await page.cookies()
        console.log(cookies)

        await browser.close();
}

module.exports = getConnectedTokenPass()
    .then((res) => console.log(res.value))
    .catch((err) => {
        throw err
    })