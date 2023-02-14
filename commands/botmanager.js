const Discord = require("discord.js")

module.exports = {
    name: "manager", // Coloque o nome do comando do arquivo
    run: async(client, message, args) => {
        const embederro = new Discord.MessageEmbed()
        .setTitle(`Erro - Permissão`)
        .setDescription(`Você não tem permissão para isto!`)
        .setColor(config.cor)
        .setFooter(`Api Vision`)
                if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] })
        const embed = new Discord.MessageEmbed()
        .setTitle(`Dados sobre: ${config.nomebot}`)
        .addField(`**Nome da aplicação:**` , `${config.nomebot}`)
        .addField(`**Container:**` , `Online`)
        .addField(`**CPU:**` , `0.9%`)
        .addField(`**RAM:**` , `64.6MB/500MB`)
        .addField(`**SSD NVMe:**` , `519MB`)
        .addField(`**Network**` , `Ativa ⬆`)
.setColor(config.cor)
.setThumbnail("https://media.discordapp.net/attachments/1010581418293870592/1023636416749637743/unknown.png?width=408&height=408")
.setImage(config.fotoembed)
message.channel.send({embeds: [embed]})
        
    }
}
