const puppeteer = require('puppeteer');
const dotenv = require('dotenv')

dotenv.load()


function getUnconnectedTokenPass() {
    return (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.authenticate({username: process.env.USERNAME, password: process.env.PASSWORD})
         await page.goto('https://dev.mycanal.fr/');
        const cookies = await page.cookies()
        const unconnectedTokenPass = cookies.find((elem) => {
            if (elem.name === 's_pass_token') {
                return elem.value
            }
        })

        await browser.close();

        return unconnectedTokenPass
    })();
}

getUnconnectedTokenPass()
.then((res) => console.log(res.value))
.catch((err) => {
    throw err
})
