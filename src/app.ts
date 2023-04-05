import puppeteer from "./puppeteer";
import freebitcoinrool from "./free-bitcoin-rool";

const venom = require("venom-bot");

import botDentao from "./bot-iptv-dentao";
import message from "./utils/message";

const result = async () => {
  await venom
    .create({
      session: "session-name", //name of session
      multidevice: false, // for version not multidevice use false.(default: true)
    })
    .then((client: any) =>
      //BOT FREE BITCOIN
      // puppeteer(client)

      //BOT DENTÃO IPTV
      // botDentao(client, message.msgIptvDentao)

      //BOT FREE BITCOIN A CADA 1 HORA
      freebitcoinrool(client)
    )
    .catch((erro: any) => {
      console.log(erro);
    });
};

result();
