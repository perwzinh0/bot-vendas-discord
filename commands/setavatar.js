const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
name: "setavatar",
aliases: [],
author: "vision",
run: async (client, message, args) => {
    message.delete()
    const embederro = new Discord.MessageEmbed()
    .setTitle(`Erro - Permissão`)
    .setDescription(`Você não tem permissão para isto! \n Apenas os Donos desse Bot pode fazer isso`)
    .setColor(config.cor)
    .setFooter(`${config.nomebot} - Todos os direitos reservados.`)

if (!message.member.permissions.has("ADMINISTRATOR")) {
 return message.reply({ embeds: [embederro] }).then(msg => {
    setTimeout(() => msg.delete(), 9000)
})
} else {
let link = args.join(" ")

if (!link) {
    const avisolink = new Discord.MessageEmbed()
    .setTitle(`Erro - Falta Link png`)
    .setDescription(`Envie link de uma imagem png junto para que possa modificar para imagem desejada!`)
    .setColor(config.cor)
    .setFooter(`${config.nomebot} - Todos os direitos reservados.`)
return message.reply({ embeds: [avisolink] }).then(msg => {
    setTimeout(() => msg.delete(), 10000)
})
}


 if (!link.startsWith("https://")) {
 return message.reply("Não consegui reconhecer este link! \`setavatar [link imagem]\`").then(msg => {
    setTimeout(() => msg.delete(), 10000)
})}else {
client.user.setAvatar(link).then(m => {

 const embed = new Discord.MessageEmbed()
 .setTitle("Avatar Alterado!")
  .setURL(link)
   .setImage(link)
  message.channel.send({embeds: [embed]}).then(msg => {
    setTimeout(() => msg.delete(), 10000)
})

})
 }
}
}
}