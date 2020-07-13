const puppeteer = require('puppeteer');
const mergepdf = require('easy-pdf-merge');

var pdfUrls = ["http://www.google.com","http://www.yahoo.com"];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  var pdfFiles=[];

  for(var i=0; i<pdfUrls.length; i++){
    await page.goto(pdfUrls[i], {waitUntil: 'networkidle2'});
    var pdfFileName =  'sample'+(i+1)+'.pdf';
    pdfFiles.push(pdfFileName);
    await page.pdf({path: pdfFileName, format: 'A4'});
  }

  await browser.close();

  await mergeMultiplePDF(pdfFiles);
})();

const mergeMultiplePDF = (pdfFiles) => {
    return new Promise((resolve, reject) => {
        mergepdf(pdfFiles,'../out/mergesamplefinal.pdf',function(err){

            if(err){
                console.log(err);
                reject(err)
            }

            console.log('Success');
            resolve()
        });
    });
};