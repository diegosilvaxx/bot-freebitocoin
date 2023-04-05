require("dotenv").config();
const puppeteer = require("puppeteer");
import bot from "./botWhatsapp";

const PuppeteerFunction = async (client: any) => {
  //config de ganhos maximo
  const maxWin = 30000;
  var winInitial = 0;

  //config de prejuizos maximo
  const stopLose = 10;
  var stopLoseInitial = 0;

  //Função para gerar numeros aleatórios
  function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  //FUNÇÃO PARA AGUARDAR O PROCESSO
  const timer = (seconds: number) => {
    let time = seconds * 1000;
    return new Promise((res) => setTimeout(res, time));
  };

  const NewFuncao = async () => {
    try {
      const browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();

      await page.setViewport({ width: 1080, height: 1024 });
      await page.goto("https://freebitco.in/signup/?op=s");

      // - Acessa a página de login

      await page.click(".login_menu_button");

      await page.type(
        "#login_form_btc_address",
        process.env.FREE_BITCOIN_EMAIL
      );

      await page.type("#login_form_password", process.env.FREE_BITCOIN_PASS);

      await page.click("#login_button");

      console.log("chegou aqui 1");

      await page.waitForNavigation();

      const teste = async () => {
        const multiplay = await page.waitForSelector("#free_play_form_button");

        console.log("chegou aqui 3", multiplay);

        await multiplay.evaluate((b: any) => b.click());

        await bot(client, `😎😎 Parabens você acabou de rodar a roleta 😎😎`);

        await timer(getRandomIntInclusive(3605, 3609));

        await teste();
      };

      teste();
    } catch (error) {
      NewFuncao();
    }
  };
  NewFuncao();
};

export default PuppeteerFunction;
