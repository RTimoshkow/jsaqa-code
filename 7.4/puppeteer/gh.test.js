const jestPuppeteerConfig = require("./jest-puppeteer.config");
const jestConfig = require("./jest.config");

let page;

beforeEach(async () => {
  page = await browser.newPage();
}, 60000);

afterEach(() => {
  page.close();
});

describe("Github team page tests", () => {
  
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 15000);

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 50000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 70000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 45000);
});

describe("Github start page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/");
  }, 15000);

  test("Сontent of the text block of the platform description", async () => {
    const atrtribute = "p.f2-mktg.col-md-7";
    const actual = await page.$eval(atrtribute, link => link.textContent);
    expect(actual).toContain(`The complete developer platform to build, scale, and deliver secure software.`);
  }, 60000);


  test("A message about an incorrect email address", async () => {
    const button = "a.HeaderMenu-link.HeaderMenu-link--sign-up";
    await page.click(button);
    const input = 'input[id="email"]';
    await page.waitForSelector(input, {
      visible: true,
    });
    await page.type(input, 'ebertrehgsg', { delay: 300 });
    const errorMessage = '.mb-0';
    await page.waitForSelector(errorMessage, {
      visible: true,
    });
    const actual = await page.$eval(errorMessage, text => text.textContent);
    expect(actual).toContain(`Email is invalid or already taken`);
  }, 60000);

  test("Input field attribute ", async () => {
    
    const actual = await page.$eval('input', link => link.getAttribute('data-test-selector'));
    expect(actual).toEqual('nav-search-input');

  }, 60000);
});


describe("Netology test", () => {

  beforeEach(async () => {
    await page.goto("https://netology.ru/");
  }, 60000);

  test("test", async () => {
    const text = '.src-Landings-pages-Main-components-Presentation--subtitle--cvGCX';
    await page.waitForSelector(text, {
      visible: true
    });
    const actual = await page.$eval(text, link => link.textContent);
    expect(actual).toContain('Образовательная платформа');
  }, 60000);

  test("Attribute content", async () => {
    const atribute = '.src-reallyShared-containers-SupportIcon--root--CWlV_';
    const actual = await page.$eval(atribute, link => link.getAttribute('data-testid'));
    expect(actual).toEqual('ticketsystem-icon');
  });
  

  test('Сontents of the title', async () => {
    await page.waitForTimeout(5000);
    const title2 = await page.title();
    expect(title2).toEqual('Нетология — обучение современным профессиям онлайн');
  }, 60000);
});

describe.only("tests in which there are questions", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/");
  }, 15000);

  test.skip("attribute search", async () => {
    const button = "a.HeaderMenu-link.HeaderMenu-link--sign-up";
    await page.click(button);
    const emailButton = '[data-optimizely-event="click.signup_continue.email"]';
    await page.waitForSelector(emailButton, {
      visible: true,
    });
    const actual = await page.$eval(emailButton, link => link.getAttribute('disabled'));
    expect(actual).toEqual('');
  });

  test("Content of the h1 attribute", async () => {
    const h1Atrtribute = "div > div > div.col-12.col-lg-7.text-center.text-md-left > h1";
    const actual = await page.$eval(h1Atrtribute, link => link.textContent);
    expect(actual).toContain(`
    \tLet's build from here,
    \t    openly
    \t    instantly
    \t    automatically
    \t    securely
    \t    magically
    \t    collaboratively
    \t    together.
          `);
  }, 90000);
});