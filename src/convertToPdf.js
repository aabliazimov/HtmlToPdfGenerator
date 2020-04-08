const puppeteer = require('puppeteer');

async function convertToPdf(pageContentSetter) {
    const browser = await puppeteer.launch({ 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
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
        width: 1000,
        height: 1400
    });

    await browser.close();

    return buffer;
}

module.exports = convertToPdf;