const { Builder, By } = require('selenium-webdriver');

jest.setTimeout(30000);

test('home page shows the heading', async () => {
  const driver = await new Builder()
    .forBrowser('chrome')
    .usingServer(process.env.SELENIUM_URL || 'http://localhost:4444')
    .build();

  try {
    await driver.get(process.env.APP_URL || 'http://localhost:3000');
    const text = await driver.findElement(By.css('h1')).getText();
    expect(text).toBe('Welcome to CI/CD');
  } finally {
    await driver.quit();
  }
});