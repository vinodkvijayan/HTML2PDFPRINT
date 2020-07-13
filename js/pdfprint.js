const puppeteer = require ("puppeteer");
const fs = require('fs');

// Build paths
const {
    buildPathstaticHtml,
    buildPathPdf
} = require('./buildPaths');

(async function generatePDF() {
    try{
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.setViewport({
            width : 1920, height:1080, fitWindow: true, deviceScaleFactor: 3, mobile: false, waitLoad: true,
        });
        
        await page.goto (buildPathstaticHtml,{ waitUntil:"networkidle2" });
   
        const pdf = await page.pdf({
            landscape:true,
            preferCSSPageSize: true,
            printBackground: true
            });
        
        fs.writeFileSync(buildPathPdf, pdf);
        console.log('Successfully created PDF file');

        await browser.close();
        
    } catch(err) {
        console.log('Error generating PDF', err);
    }

})();