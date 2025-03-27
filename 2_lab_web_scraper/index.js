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

    return mangasList.querySelector(".product-shelf-info > .product-shelf-title > a").href;
});

if (mangas) {
    const mangaPage = await browser.newPage();
    await mangaPage.goto(mangas, {
        waitUntil: "domcontentloaded",
    });

    const pageDetails = await mangaPage.evaluate(() => {
        const details = document.getElementById("ProductDetailsTab");

        return details.querySelector("table > tbody:first-of-type > tr:nth-child(5) > td")?.textContent;
    });

    console.log(`Found: ${pageDetails}`)
    
} else {
    console.log("No manga found!");
}
//await browser.close();