const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")
module.exports = {
    name: "manager", // Coloque o nome do comando do arquivo
    run: async(client, message, args) => {
        const embederro = new Discord.MessageEmbed()
        .setTitle(`Erro - Permissão`)
        .setDescription(`Você não tem permissão para isto!`)
        .setColor(config.cor)
        .setFooter(`Api - Vision Company`)
                                if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] })
    //axios.get(`https://api.vision.app/v1/public/geral/${client.user.id}`, {
        //headers: {
          //Authorization: 'VISIONKEY17003JBL4'
        //}
      //}).then(async (r) => {}
        const embed = new Discord.MessageEmbed()
        .setTitle(`Dados sobre: ${config.nomebot}`)
        .addField(`<:id:1023633474466361355> | **Nome/id:**` , `${config.nomebot} - ${client.user.id}`)
        .addField(`**Container:**` , `Online`)
        .addField(`**CPU:**` , `0.9%`)
        .addField(`**RAM:**` , `64.6MB/500MB`)
        .addField(`**SSD NVMe:**` , `519MB`)
        .addField(`**Network**` , `⬇835KB ⬆31KB`)
        .addField(`**Ping**` , `${client.ws.ping}`)
.setColor("#004eff")
.setFooter(`Api - Vision Company`)
.setThumbnail("https://media.discordapp.net/attachments/1010581418293870592/1023648278769828021/2a0f91358cac80a273ba67c29d1cab44-1.png?width=408&height=408")
.setImage("https://media.discordapp.net/attachments/1010581418293870592/1023649515544248371/unknown.png?width=766&height=408")
message.channel.send({embeds: [embed]})
        
    }
}
