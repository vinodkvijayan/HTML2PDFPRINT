const fs = require('fs');
const puppeteer = require('puppeteer');


// Build paths
const {
    buildPathdynamicHtml,
    buildPathPdf
} = require('./buildPaths');

const printPdf = async () => {
    
        console.log('Starting: PDF Generation, Please wait ..');
        /** Launch a headleass browser */

        const browser = await puppeteer.launch();
        /* 1- Create a newPage() object. It is created in default browser context. */

        const page = await browser.newPage();
        /* 2- Will open our generated `.html` file in the new Page instance. */

        await page.setViewport({
            width: 1920,
            height: 1080,
            fitWindow: true,
            deviceScaleFactor: 3,
            mobile: false,
            waitLoad: true,
        });

        await page.goto(buildPathdynamicHtml, {
            waitUntil: 'networkidle0'
        });
        /* 3- Take a snapshot of the PDF */

        const pdf = await page.pdf({
            format: 'A4',
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            },
            preferCSSPageSize: true,
            printBackground: true
        });
        /* 4- Cleanup: close browser. */
        await browser.close();
        console.log('PDF Generation Completed');
        return pdf;
   
};

const init = async () => {
    try {
        const pdf = await printPdf();
        fs.writeFileSync(buildPathPdf, pdf);
        console.log('Successfully created PDF Document');
    } catch (error) {
        console.log('Error generating PDF', error);
    }
};

init();