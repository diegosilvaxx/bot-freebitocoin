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

      console.log("chegou aqui 2");

      // vai para a pagina de Multiplay

      const multiplay = await page.waitForSelector("a.double_your_btc_link");

      console.log("chegou aqui 3");

      await multiplay.evaluate((b: any) => b.click());

      console.log("chegou aqui 4");

      // zera o valor da aposta para o minimo
      await page.click("#double_your_btc_min");

      // Execulta o botão para rodar a roleta
      await page.click("#double_your_btc_bet_hi_button");

      const teste = async () => {
        await page.waitForSelector("#double_your_btc_bet_win");

        const inner_html = await page.evaluate(
          () => document.querySelector("#double_your_btc_bet_win")?.innerHTML
        );

        if (inner_html.includes("You BET HI so you win")) {
          winInitial += 1;

          //VERIFICA SE ATINGIU A META DIARIA
          if (winInitial == maxWin) {
            await bot(client, `✅✅ ${await inner_html} ✅✅`);
            await browser.close();
            await bot(client, `😎😎 Parabens você atingiu a meta diaria 😎😎`);
            console.log("diegooooo chegou aqui");
          }

          await page.click("#double_your_btc_min");
          // Execulta o botão para rodar a roleta
          await page.click("#double_your_btc_bet_hi_button");

          await bot(client, `✅✅ ${await inner_html} ✅✅`);
          await timer(getRandomIntInclusive(9, 13));

          await teste();
        } else {
          const innerHTMLLose = await page.evaluate(
            () => document.querySelector("#double_your_btc_bet_lose")?.innerHTML
          );

          if (innerHTMLLose.includes("You BET HI so you lose")) {
            //VERIFICA SE ATINGIU O LIMITE DE PERCA
            if (stopLoseInitial == stopLose) {
              await bot(client, `❌❌ ${await innerHTMLLose} ❌❌`);
              await browser.close();
              await bot(client, `⚠⚠ Infelizmente você ja dobrou 10 vezes ⚠⚠`);
            }

            //dobra o valor da aposta
            await page.click("#double_your_btc_2x");

            // Execulta o botão para rodar a roleta
            await page.click("#double_your_btc_bet_hi_button");

            await bot(client, `❌❌ ${await innerHTMLLose} ❌❌`);
            await timer(getRandomIntInclusive(9, 13));
          }

          await teste();
        }
      };

      teste();
    } catch (error) {
      NewFuncao();
    }
  };
  NewFuncao();
};

export default PuppeteerFunction;
