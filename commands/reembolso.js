const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")
const axios = require("axios")
const mercadopago = require("mercadopago")
module.exports = {
    
    name: "reembolso", // Coloque o nome do comando do arquivo
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
            mercadopago.configure({
            access_token: `${config.access_token}`
            });
 
            var refund = {
            payment_id: `${args[0]}`
            };
 
            mercadopago.refund.create(refund).then(result => {
 console.log(result.response)
})

    const status = new Discord.MessageEmbed()
    .setTitle(`Status de Pagamento`)           
    .setDescription(`**📌 | Status:**\nReembolsado\n\n**📌 | ID do produto reembolsado:**\n${args[0]}`)
    .setColor(config.cor)
    .setImage(config.fotoembed)
    
message.channel.send({ embeds: [status] })
    
            }
    }
