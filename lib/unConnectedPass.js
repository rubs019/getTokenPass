const puppeteer = require('puppeteer');

module.exports = async function getUnconnectedTokenPass() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.authenticate({username: process.env.USERNAME, password: process.env.PASSWORD})
    await page.goto('https://dev.mycanal.fr/');
    const cookies = await page.cookies()
    const unconnectedTokenPass = cookies.find(elem => elem.name === 's_pass_token')

    await browser.close();

    return unconnectedTokenPass
}
