const Discord = require('discord.js')
const config = require('../config.json')

module.exports = {
    name: 'adm',
    author: 'vision',

    run: async (client, message, args, interaction) => {
      if (!message.member.permissions.has("ADMINISTRATOR")) {
        message.reply({ content: `Vocêª não possui permissão para usar este comando :c`})
    } else {

      let cargo1 = new Discord.MessageButton()
      .setCustomId("1")
      .setLabel("Receber permissão")
      .setStyle("SUCCESS")
      .setEmoji('<:AnyConv:1018320681970180187>')



      let row = new Discord.MessageActionRow().addComponents(cargo1)



      let embed = new Discord.MessageEmbed()
      .setDescription(`> **Receba sua permissão**\n> \n> Clique no **botão** para adquirir seus respectivos cargos`)
      .setColor(config.cor)
      .setTimestamp(new Date())

      message.channel.send({ embeds: [embed], components: [row] })
    


}}}

