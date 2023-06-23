require("dotenv").config();
const puppeteer = require("puppeteer");
import bot from "./botWhatsapp";
import multiplay_freebitcoin from "./free-bitcoin-multiplay";

const PuppeteerFunction = async () => {
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

  const MainFunction = async () => {
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

      console.log("Logou no Sistema");

      await page.waitForNavigation();

      const ExecuteRool = async () => {
        const buttonRool = await page.waitForSelector("#free_play_form_button");

        await buttonRool.evaluate((b: any) => b.click());

        const balanceCash = await page.evaluate(
          () => document.querySelector("#balance")?.innerHTML
        );

        console.log(
          `😎😎 Parabens você acabou de rodar a roleta 😎😎\n 🤑🤑Saldo Atual: ${balanceCash}🤑🤑`
        );


        await timer(getRandomIntInclusive(1198, 1205));
        console.log("Aguardou uma hora");

        await ExecuteRool();
      };

      ExecuteRool();
    } catch (error) {
      console.log("erro: ", error);
      MainFunction();
    }
  };
  MainFunction();
};

export default PuppeteerFunction;
