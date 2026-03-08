import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/recipes/mousseline-chou-fleur', { waitUntil: 'networkidle0' });
  
  const timerStyles = await page.evaluate(() => {
    const islands = document.querySelectorAll('astro-island');
    let results = [];
    islands.forEach(island => {
      if (island.getAttribute('component-url').includes('Timer')) {
        const div = island.querySelector('div.surface-card');
        if (div) {
          const style = window.getComputedStyle(div);
          results.push({
            display: style.display,
            visibility: style.visibility,
            opacity: style.opacity,
            width: style.width,
            height: style.height,
            color: style.color,
            backgroundColor: style.backgroundColor
          });
        }
      }
    });
    return results;
  });
  
  console.log('TIMER STYLES:', timerStyles);
  await browser.close();
})();
