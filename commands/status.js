const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")
const axios = require("axios")
const { JsonDatabase, } = require("wio.db");
const dbB = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
module.exports = {
    
    name: "stock", // Coloque o nome do comando do arquivo
    run: async(client, message, args) => {
        message.delete()
        const embederro = new Discord.MessageEmbed()
        .setTitle(`Erro - Permissão`)
        .setDescription(`Você não tem permissão para isto!`)
        .setColor(config.cor)
        .setFooter(`${config.nomebot} - Todos os direitos reservados.`)
            if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] }).then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                })
                axios.get(`https://api.mercadolibre.com/collections/notifications/${args[0]}`, {
                                                                    headers: {
                                                                        'Authorization': `Bearer ${dbB.get('acesstoken')}`
                                                                    }
                                                                }).then(async (doc) => {
                                                                    console.log(doc)
                                                                    if(doc.data.collection.status === "approved") {
                                                                      var msg = "Aprovado";
                                                                    } else {
                                                                       var msg = "Cancelado/Reembolsado";
                                                                    }
    const status = new Discord.MessageEmbed()
    .setTitle(`Status de Pagamento`)           
    .setDescription(`**📌 | Status:**\n${msg}\n\n**💵 | Preço:** \nR$${doc.data.collection.transaction_amount}\n\n**🌎 | Id da compra:**\n${args[0]}`)
    .setColor(config.cor)
    .setImage(config.fotoembed)

message.channel.send({ embeds: [status] })
                                                                }).catch(e => {
                                                                    console.log(e)
                                                                    message.channel.send("🚫 | Aconteceu algum erro !\n**Tem certeza que colocou o id correto?**\n**Erro:**\nError: Request failed with status code 404")
                                                                })

    }
}
