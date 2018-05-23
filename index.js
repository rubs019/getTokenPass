require('dotenv').config()

const puppeteer = require('puppeteer')

const { DEV_MYCANAL_URL } = require('./constants')


main()

/**
 * Entry point of app
 * @return {Promise<void>}
 */
async function main() {
    try {
        const unconnectedTokenPassObj = await getUnconnectedTokenPass()

        console.log(unconnectedTokenPassObj.value)
    } catch (e) {
        throw e
    }
}

/**
 * Use for fetch the tokenPass when we are not connected
 * @return {Promise<number | * | T>}
 */
async function getUnconnectedTokenPass() {
    const { browser, page } = await connectMyCanal()

    await page.goto(DEV_MYCANAL_URL)

    const cookies = await page.cookies()

    const unconnectedTokenPassObj = cookies.find((elem) => elem.name === 's_pass_token')

    await disconnectMyCanal(browser)

    return unconnectedTokenPassObj
}

/**
 * Connect to the mycanal website
 * @return {Promise<{browser, page}>}
 */
async function connectMyCanal() {
    const browser = await puppeteer.launch()
    const page    = await browser.newPage()

    await page.authenticate({username: process.env.USERNAME, password: process.env.PASSWORD})

    return { browser, page }
}

/**
 * Use for disconnect the current app to mycanal
 * @param browser
 * @return {Promise<void>}
 */
async function disconnectMyCanal(browser) {
    await browser.close()
}