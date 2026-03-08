import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
  
  await page.goto('http://localhost:4321/recipes/mousseline-chou-fleur', { waitUntil: 'networkidle0' });
  
  const timerHtml = await page.evaluate(() => {
    const islands = document.querySelectorAll('astro-island');
    let html = '';
    islands.forEach(island => {
      if (island.getAttribute('component-url').includes('Timer')) {
        html += island.outerHTML + '\n';
      }
    });
    return html;
  });
  
  console.log('TIMER HTML IN DOM:', timerHtml);
  
  await browser.close();
})();
