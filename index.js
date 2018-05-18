const puppeteer = require('puppeteer');



function getUnconnectedTokenPass() {
    return (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.authenticate({username: 'mycanal', password: 'myc@n@l'})
        const t = await page.goto('https://dev.mycanal.fr/');
        const y = await page.cookies()
        const unconnectedTokenPass = y.find((elem) => {
            if (elem.name === 's_pass_token') {
                return elem.value
            }
        })

        await browser.close();

        return unconnectedTokenPass.value
    })();
}

getUnconnectedTokenPass()
.then((res) => console.log(res))
.catch((err) => {
    throw err
})