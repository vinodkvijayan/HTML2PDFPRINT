//Using the pdf-lib [https://pdf-lib.js.org/ ; https://github.com/Hopding/pdf-lib] npm module for creating and editing PDF

const {
  PDFDocument,
  StandardFonts,
  rgb
} = require('pdf-lib');
const fs = require('fs');

run().catch(err => console.log(err));

async function run() {

  // Create a new document and add a new page for cover
  const doc = await PDFDocument.create();
  const page = doc.addPage();

  //embed a new font to the doc for page numbering
  const helveticaFont = await doc.embedFont(StandardFonts.Helvetica);

  // Load the image and store it as a Node.js buffer in memory
  let img = fs.readFileSync('../input/images/menu_bg.png');
  img = await doc.embedPng(img);

  // Draw the image on the center of the page to create the cover page
  const {
    width,
    height
  } = img.scale(1);

  page.drawImage(img, {
    x: page.getWidth() / 2 - width / 2,
    y: page.getHeight() / 2 - height / 2
  });

  // Load the PDF that has the desired content that needs to appended to cover page
  const content = await PDFDocument.load(fs.readFileSync('../input/45994g8172637o6330.pdf'));

  // Append all the content pages to cover sheet
  const contentPages = await doc.copyPages(content, content.getPageIndices());
  
  for (const page of contentPages) {
    doc.addPage(page);
  }

  // Add page numbers to each of the pages in the document

  var maxIndex = doc.getPages().length;

  for (const [i, pg] of Object.entries(doc.getPages())) {

    pg.drawText(`Page ${+i + 1} of ${maxIndex}`, {
      x: pg.getWidth() / 2,
      y: 8,
      size: 8,
      font: helveticaFont,
      color: rgb(0, 0, 0)

    });
  }

  // Write the PDF to a file
  fs.writeFileSync('../out/samplemerge.pdf', await doc.save());
}