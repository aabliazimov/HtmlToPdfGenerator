const convertToPdf = require('../convertToPdf');
const express = require('express');

const router = express.Router();

router.route('/HtmlToPdf').post(async (req, res) => {
    let html = req.body['Html'];
    const baseUrl = req.body['BaseUrl'];
    html = html.replace('<head>',`<head><base href="${baseUrl}/">`);
    
    const pageContentSetter = async page => await page.setContent(html, {waitUntil: 'networkidle2'});
    const buffer = await convertToPdf(pageContentSetter);
    prepareResponse(res, buffer);
});

router.route('/UrlToPdf').post(async (req, res) => {
    const url = req.query['url'];
    const pageContentSetter = async page => await page.goto(url, {waitUntil: 'networkidle2'});
    const buffer = await convertToPdf(pageContentSetter);
    prepareResponse(res, buffer);
});

function prepareResponse(res, buffer) {
    res.type('application/pdf');
    res.send(buffer);
}

module.exports = router;