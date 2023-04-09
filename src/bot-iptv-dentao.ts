// Supports ES6

// .then((client: any) => start(client))
// .catch((erro: any) => {
//   console.log(erro);
// });

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

async function SendMessage(client: any, message: string) {
  for (let index = 1000; index <= 1100; index++) {
    await client
      .sendImage(`55161699632${index}@c.us`, "image/iptv.jpg", "iptv", message)
      .then((result: any) => {
        console.log("Result: ", result); //return object success
      })
      .catch((erro: any) => {
        console.error("Error when sending: ", erro); //return object error
      });
    await timer(getRandomIntInclusive(9, 13));
  }
  // const buttons = [
  //   {
  //     buttonText: {
  //       displayText: "Sim, gostaria de testar",
  //     },
  //   },
  //   {
  //     buttonText: {
  //       displayText: "Não, deixa para proxima",
  //     },
  //   },
  // ];
  // await client
  //   .sendButtons("5516981043644@c.us", "Title", buttons, "Description")
  //   .then((result: any) => {
  //     console.log("Result: ", result); //return object success
  //   })
  //   .catch((erro: any) => {
  //     console.error("Error when sending: ", erro); //return object error
  //   });

  // for (let index = 1000; index <= 1999; index++) {
  //   await client
  //     .sendImage(
  //       `55161699639${index}@c.us`,
  //       "image/viveryoutube.png",
  //       "curso-viver-de-youtube",
  //       message
  //     )
  //     .then((result: any) => {
  //       console.log("Result: ", result); //return object success
  //     })
  //     .catch((erro: any) => {
  //       console.error("Error when sending: ", erro); //return object error
  //     });
  // }

  // await client
  //   .sendText("5516981308907@c.us", message)
  //   .then((result: any) => {
  //     console.log("Result: ", result); //return object success
  //   })
  //   .catch((erro: any) => {
  //     console.error("Error when sending: ", erro); //return object error
  //   });
}

async function getGroups(client: any) {
  const chats = await client.getAllChats();
  const groups = chats.filter((chat: any) => {
    return chat.isGroup;
  });
  return groups;
}

export default SendMessage;
