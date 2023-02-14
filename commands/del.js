const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")
const moment = require("moment")
moment.locale("pt-br");

module.exports = {
    name: "del", // Coloque o nome do comando do arquivo
    run: async (client, message, args) => {
        const embederro = new Discord.MessageEmbed()
            .setTitle(`Erro - Permissão`)
            .setDescription(`Você não tem permissão para isto!`)
            .setColor(config.cor)
            .setFooter(`${config.nomebot} - Todos os direitos reservados.`)
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] })
    if(!args[0]) return message.channel.send("Coloque um produto.")
    db.delete(`${args.join(" ")}`)
    message.channel.send("Deletado.")
    }
}