// Supports ES6
// import { create, Whatsapp } from 'venom-bot';

// .then((client: any) => start(client))
// .catch((erro: any) => {
//   console.log(erro);
// });

async function SendMessage(client: any, message: string) {
  console.log("client", client);
  await client
    .sendText("5516981043644@c.us", message)
    .then((result: any) => {
      console.log("Result: ", result); //return object success
    })
    .catch((erro: any) => {
      console.error("Error when sending: ", erro); //return object error
    });
}

async function getGroups(client: any) {
  const chats = await client.getAllChats();
  const groups = chats.filter((chat: any) => {
    return chat.isGroup;
  });
  return groups;
}

export default SendMessage;
