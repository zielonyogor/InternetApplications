import puppeteer from "puppeteer";

// Function to get details of manga from its page
async function getMangaDetails(link) {
    const mangaPage = await browser.newPage();

    try {
        await mangaPage.goto(link, { waitUntil: "domcontentloaded" });
    } catch (error) {
        console.error(`Error navigating to ${link}:`, error);
        await mangaPage.close();
        return null;
    }

    const pageDetails = await mangaPage.evaluate(() => {
        const header = document.getElementById("pdp-header-info").querySelector("h1");
        if(header === null) return null;
        const title = header.textContent.trim();
        
        const details = document.getElementById("ProductDetailsTab");
        
        const td = details.querySelector("table > tbody:first-of-type > tr:nth-child(5) > td");
        if(td === null) return null;
        const pages = parseInt(td.textContent.trim());
        
        const priceElement = document.querySelector("#pdp-cur-price");
        if(priceElement === null) return null;
        const price = parseFloat(priceElement.textContent.trim().replace("$", ""));
        
        
        return { title, pages, price };
    });

    await mangaPage.close();

    return pageDetails;
}

// ---------- Main -------------

let mangasDetails = new Array();

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
});

const page = await browser.newPage();

await page.goto("https://www.barnesandnoble.com/b/books/graphic-novels-comics-manga/_/N-1fZ29Z8q8Z2y35?Ns=P_Sales_Rank", {
    waitUntil: "domcontentloaded",
});

const mangaLinks = [];
let pages = 5;

for(let i = 0; i < pages; i++) {
    const pageLinks = await page.evaluate(() => {
        const mangasList = document.querySelectorAll(".product-shelf-tile");
    
        return Array.from(mangasList, (manga) => {
            const linkElement = manga.querySelector(".product-shelf-info > .product-shelf-title > a");
            console.log(linkElement?.href);
            return linkElement ? linkElement.href : null;
        }).filter(link => link !== null);
    });

    mangaLinks.push(...pageLinks);

    const nextButton = await page.evaluate(() =>  {
        next = document.querySelector("a.next-button");
        return next ? next : null
    });

    if(nextButton === null) break;

    await Promise.all([
        page.waitForNavigation({ waitUntil: "domcontentloaded" }),
        page.click("a.next-button"),
    ]);   
}

if (mangaLinks.length > 0) {
    for(const link of mangaLinks) {
        let details = await getMangaDetails(link);

        if(details === null) continue;
        
        mangasDetails.push({
            "title": details.title,
            "pricePageRatio": details.pages > 0 ? (details.price / details.pages).toFixed(3) : "N/A"
        });
    };
    
} else {
    console.log("No manga found!");
}

await browser.close();

mangasDetails.sort((a, b) => a.pricePageRatio - b.pricePageRatio);
console.log("Found mangas: ");
mangasDetails.forEach((detail) => {
    console.log(`${detail.title} - ${detail.pricePageRatio}`);
});