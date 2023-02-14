const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")
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
                const embednprod = new Discord.MessageEmbed()
                .setTitle("Erro - Sistema de Estoque")
                .setDescription("Você não tem nenhum produto adicionado, utilize \`[add]\` para criar o produto!")
                .setColor(config.cor)
        if(db.all().length == 0) return message.channel.send({embeds: [embednprod]}).then(msg => {
            setTimeout(() => msg.delete(), 10000)
        })
const itens = db.all().map(item => `ID: ${item.ID} | QUANTIDADE: ${item.data.conta.length || "0"}`)
const embed = new Discord.MessageEmbed()
.setTitle("Estoque")
.setDescription(`\`\`\`${itens.join("\n\n")}\`\`\``)
.setColor(config.cor)
message.channel.send({embeds: [embed]}).then(msg => {
    setTimeout(() => msg.delete(), 10000)
})

    }
}