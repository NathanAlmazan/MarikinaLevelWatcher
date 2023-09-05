import fs from 'fs';
import puppeteer from 'puppeteer';
import cron from 'node-cron';

const getWaterLevelData = async () => {
    try {
        const browser = await puppeteer.launch();
        const [page] = await browser.pages();

        await page.goto('https://pasig-marikina-tullahanffws.pagasa.dost.gov.ph/main.do', { waitUntil: 'networkidle0' });
        const data = await page.content();

        fs.writeFile([__dirname, 'assets', `${new Date().toISOString()}.htm`].join('/'), data, (err) => {
            if (err) console.log(err.message);
        });

        await browser.close();
    } catch (err) {
        console.error(err);
    }
}

cron.schedule("0 * * * *", () => {
    getWaterLevelData()
        .then(() => console.log("Saved Water Level at " + new Date().toISOString()))
        .catch((err) => console.log(err))
});