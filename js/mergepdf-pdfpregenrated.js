//Merge PDf Files 
//Generate indivdual PDFs with puppeteer. 
//You have the option of saving the file locally or to store it in a variable.
//Save the files locally and merge them using PDF Easy Merge (Require Java).

const puppeteer = require('puppeteer');
const merge = require('easy-pdf-merge');

var pdfFiles = [];

(async () => {
  const page1 = '<h1>HTML from page1</h1>';
  const page2 = '<h1>HTML from page2</h1>';
  const page3 = '<h1>HTML from page3</h1>';

  const browser = await puppeteer.launch();
  const tab = await browser.newPage();

  await tab.setContent(page1);
  await tab.pdf({
    path: '../out/page1.pdf'
  });

  await tab.setContent(page2);
  await tab.pdf({
    path: '../out/page2.pdf'
  });

  await tab.setContent(page3);
  await tab.pdf({
    path: '../out/page3.pdf'
  });

  await browser.close();

  pdfFiles.push('../out/page1.pdf', '../out/page2.pdf', '../out/page3.pdf');

  mergeMultiplePDF(pdfFiles);

})();

const mergeMultiplePDF = (pdfFiles) => {
  return new Promise((resolve, reject) => {
    merge(pdfFiles, '../out/samplefinal.pdf', function (err) {

      if (err) {
        console.log(err);
        reject(err);
      }

      console.log('Success');
      resolve();
    });
  });
};