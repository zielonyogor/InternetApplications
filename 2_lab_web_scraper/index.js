import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
});

const page = await browser.newPage();

await page.goto("https://www.barnesandnoble.com/b/books/graphic-novels-comics-manga/_/N-1fZ29Z8q8Z2y35?Ns=P_Sales_Rank", {
    waitUntil: "domcontentloaded",
});

const mangas = await page.evaluate(() => {
    const mangasList = document.querySelector(".product-shelf-tile");

    // return Array.from(mangasList).map((manga) => {
    //     manga.querySelector(".product-shelf-info > .product-shelf-title > a").href;
    // });

    return mangasList.querySelector(".product-shelf-info > .product-shelf-title > a").href;
});

if (mangas) {
    const mangaPage = await browser.newPage();
    await mangaPage.goto(mangas, {
        waitUntil: "domcontentloaded",
    });

    const pageDetails = await mangaPage.evaluate(() => {
        const header = document.getElementById("pdp-header-info").querySelector("h1");
        const title = header ? header.textContent.trim() : "No title found";

        const details = document.getElementById("ProductDetailsTab");

        const td = details.querySelector("table > tbody:first-of-type > tr:nth-child(5) > td");
        const pages = td ? td.textContent.trim() : "No page count found";

        const priceElement = document.querySelector("#pdp-cur-price");
        const price = priceElement ? priceElement.textContent.trim() : "No price found";

        return { title, pages, price };
    });

    console.log(`Found title: ${pageDetails.title}`);
    console.log(`Found pages: ${pageDetails.pages}`);
    console.log(`Found price: ${pageDetails.price}`);
    
} else {
    console.log("No manga found!");
}
//await browser.close();