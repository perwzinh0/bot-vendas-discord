const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });

module.exports = {
    name: "criarcupom", 
    run: async(client, message, args) => {
        const embederro = new Discord.MessageEmbed()
            .setTitle(`Erro - Permissão`)
            .setDescription(`Você não tem permissão para isto!`)
            .setColor(config.cor)
            .setFooter(`${config.nomebot} - Todos os direitos reservados.`)
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] })
      if(!args[0]) return message.reply(`❌ | Você não deu nenhum ID a esse cupom!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`❌ | Você não pode colocar dois IDs de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] === `${db.get(`${args[0]}.idcupom`)}`) return message.reply(`❌ | Esse ID de cupom já é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      message.reply("✅ | Criado com sucesso!")
      const cupom = args[0]
        db.set(`${cupom}.idcupom`, `${cupom}`)
        db.set(`${cupom}.quantidade`, `10`)
        db.set(`${cupom}.minimo`, `10`)
        db.set(`${cupom}.desconto`, `10`)
       }
     }