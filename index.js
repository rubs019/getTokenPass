require('dotenv').config()

const puppeteer = require('puppeteer')

const { DEV_MYCANAL_URL } = require('./constants')

async function getUnconnectedTokenPass() {
    const browser = await puppeteer.launch()
    const page    = await browser.newPage()

    await page.authenticate({username: process.env.USERNAME, password: process.env.PASSWORD})
    await page.goto(DEV_MYCANAL_URL)

    const cookies = await page.cookies()

    const unconnectedTokenPass = cookies.find((elem) => {
        if (elem.name === 's_pass_token') {
            return elem.value
        }
    })

    await browser.close()

    return unconnectedTokenPass
}

getUnconnectedTokenPass()
    .then((res) => console.log(res.value))
    .catch((err) => {
        throw err
    })
