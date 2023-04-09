require("dotenv").config();
const puppeteer = require("puppeteer");
import bot from "./botWhatsapp";

//Função para gerar numeros aleatórios
function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PuppeteerFunction = async (client: any, page: any) => {
  //config de ganhos maximo
  const maxWin = getRandomIntInclusive(4, 6);
  var winInitial = 0;

  //config de prejuizos maximo
  const stopLose = 8;
  var stopLoseInitial = 0;

  //FUNÇÃO PARA AGUARDAR O PROCESSO
  const timer = (seconds: number) => {
    let time = seconds * 1000;
    return new Promise((res) => setTimeout(res, time));
  };

  const MainFunction = async () => {
    console.log("vai para a pagina de Multiplay");

    // vai para a pagina de Multiplay
    const multiplay = await page.waitForSelector("a.double_your_btc_link");

    await multiplay.evaluate((b: any) => b.click());

    console.log("entrou aqui");
    await timer(getRandomIntInclusive(3, 5));
    await page
      .waitForSelector("#multiply_now_div")
      .then((result: any) => result.evaluate((b: any) => b.click()));

    await timer(getRandomIntInclusive(3, 5));
    console.log("saiu aqui");

    // zera o valor da aposta para o minimo
    await page.click("#double_your_btc_min");

    // Execulta o botão para rodar a roleta
    await page.click("#double_your_btc_bet_hi_button");

    console.log("chegou aqui");

    const multiplayFunction = async () => {
      await page.waitForSelector("#double_your_btc_bet_win");

      const inner_html = await page.evaluate(
        () => document.querySelector("#double_your_btc_bet_win")?.innerHTML
      );

      const balanceCash = await page.evaluate(
        () => document.querySelector("#balance")?.innerHTML
      );

      console.log("chegou aqui 2");

      if (inner_html.includes("You BET HI so you win")) {
        console.log("chegou aqui 4");

        //CONFIGURAÇÃO DAS VARIAVEIS DE GANHA E PERCAS
        winInitial += 1;
        stopLoseInitial = 0;

        //VERIFICA SE ATINGIU A META DIARIA
        if (winInitial == maxWin) {
          await bot(client, `✅✅ ${await inner_html} ✅✅`);
          await bot(
            client,
            `😎😎 Parabens você atingiu a meta diaria após o rool 😎😎\n 🤑🤑Saldo Atual: ${balanceCash}🤑🤑`
          );
          await page.goto("https://freebitco.in");
          return Promise.resolve();
        }

        await page.click("#double_your_btc_min");
        // Execulta o botão para rodar a roleta
        await page.click("#double_your_btc_bet_hi_button");

        await bot(client, `✅✅ ${await inner_html} ✅✅`);
        await timer(getRandomIntInclusive(9, 13));
        await multiplayFunction();
      } else {
        console.log("chegou aqui 5");
        const innerHTMLLose = await page.evaluate(
          () => document.querySelector("#double_your_btc_bet_lose")?.innerHTML
        );

        if (innerHTMLLose.includes("You BET HI so you lose")) {
          stopLoseInitial++;
          //VERIFICA SE ATINGIU O LIMITE DE PERCA
          if (stopLoseInitial == stopLose) {
            await bot(client, `❌❌ ${await innerHTMLLose} ❌❌`);

            await bot(
              client,
              `⚠⚠ Infelizmente você ja dobrou 10 vezes ⚠⚠ \n 🤑🤑Saldo Atual: ${balanceCash}🤑🤑`
            );

            console.log("https://freebitco.in");
            await page.goto("https://freebitco.in");
            return true;
          }

          console.log("passou apos return");

          //dobra o valor da aposta
          await page.click("#double_your_btc_2x");

          // Execulta o botão para rodar a roleta
          await page.click("#double_your_btc_bet_hi_button");

          await bot(client, `❌❌ ${await innerHTMLLose} ❌❌`);
          await timer(getRandomIntInclusive(9, 13));
          await multiplayFunction();
        }

        await timer(getRandomIntInclusive(7, 9));

        if (winInitial != maxWin) {
          console.log("chegou 1234 aki");
          // Execulta o botão para rodar a roleta
          await page.click("#double_your_btc_bet_hi_button");
          await multiplayFunction();
        }
      }
    };
    await multiplayFunction();
  };
  await MainFunction();
};

export default PuppeteerFunction;
