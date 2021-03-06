const puppeteer = require('puppeteer');

async function convertToPdf(pageContentSetter) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--start-fullscreen'
        ],
        ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();

    await page.addStyleTag({
        content: 'html{-webkit-print-color-adjust:exact;}',
    });
    await pageContentSetter(page);
    await page.emulateMedia('screen');

    const buffer = await page.pdf({
        printBackground: true,
        margin: {
            top: 20,
            bottom: 20
        },
        scale: 0.50
    });

    await browser.close();

    return buffer;
}

module.exports = convertToPdf;