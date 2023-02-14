const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const dbm = new JsonDatabase({ databasePath:"./databases/myJsonMoney.json" });

module.exports = {
    name: "setmoney", 
    run: async(client, message, args) => {
        const embederro = new Discord.MessageEmbed()
            .setTitle(`Erro - Permissão`)
            .setDescription(`Você não tem permissão para isto!`)
            .setColor(config.cor)
            .setFooter(`${config.nomebot} - Todos os direitos reservados.`)
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] })
      if(!args[0]) return message.reply(`❌ | Você não deu nenhum ID a esse membro!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      
      const membro = args[0]
      const dinheiro = args[1]
        dbm.set(`${membro}.dinheiro`, `${dinheiro}`)
        message.reply(`✅ | Dinheiro adicionado\nSaldo atual do membro: \`R$${dbm.get(`${membro}.dinheiro`)}.00\` `)
       }
     }