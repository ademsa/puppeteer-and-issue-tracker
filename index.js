const p = require('puppeteer');
const fs = require('fs');

fs.mkdir('./files', { recursive: true }, (err) => {
    if (err) throw err;
});

(async () => {
    const browser = await p.launch();
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    await page.goto('http://0.0.0.0:3000/labels/new', { timeout: 60 * 1000, waitUntil: 'networkidle2' });
    await page.screenshot({ type: 'jpeg', path: './files/ui-new-label-step1.jpeg' });

    // Go Issue Tracker requires unique label names
    await page.type('#name', 'New Label - ' + new Date().toString(), { delay: 100 });
    await page.screenshot({ type: 'jpeg', path: './files/ui-new-label-step2.jpeg' });

    await page.click('button[type=submit]');
    await page.screenshot({ type: 'jpeg', path: './files/ui-new-label-step3.jpeg' });

    await browser.close();
})();

console.log('Exiting...');