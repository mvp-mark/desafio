const fs = require("fs");
const pdfHtml = require("html-pdf");
// const puppeteer = require("puppeteer");
const fetch = require("node-fetch");
const Handlebars = require("handlebars");

const templateTest = fs.readFileSync("template.html", {
  encoding: "utf-8",
});

let path = "http://localhost:3333/template.html";

module.exports = {
  async index(req, res) {
    res.header("content-type", "text/html");
    res.send(templateTest);
  },

  async certificado(req, res) {
    const certificado = await fetch(path).then((res) => res.text());
    const handlerbar = Handlebars.compile(certificado);
    let content = await handlerbar(req.body);

    pdfHtml.create(content).toStream((error, stream) => {
      res.header("content-Type", "application/pdf");
      res.header(
        "Content-Disposition",
        `attachment; filename="${req.body.aluno}_boletim.pdf"`
      );
      stream.pipe(res);
    });

    // res.status(200).send("ok");
  },

  // let browser;

  // browser = await puppeteer.launch({
  //   args: [
  //     "--no-sandbox",
  //     "--disable-setuid-sandbox",
  //     "--disable-dev-shm-usage",
  //   ],

  //   headless: false,
  // });

  // const context = await browser.createIncognitoBrowserContext();
  // const pdf = async () => {
  //   const page = await browser.newPage();

  //   await page.setContent(handlerbar, req.body);
  //   //   await page.emulateMediaType("screen");
  //   await page.pdf({
  //     path: "certificado.pdf",
  //     format: "A4",
  //     printBackground: true,
  //   });
  //   console.log("done with no errors");

  //   res.header("content-type", "application/pdf");
  //   await browser.close();
  // };
  // pdf();

  // res.status(200).send("ok");
};
