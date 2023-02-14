const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    name: "avaliar", // Coloque o nome do comando do arquivo
    run: async(client, message, args) => {
    const avaliarb = new Discord.MessageActionRow()
                .addComponents(
                   new Discord.MessageButton()
                       .setCustomId('bom')
                       .setLabel("5")
                       .setEmoji('⭐')
                       .setStyle("SUCCESS"),
               )
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('ruim')
                        .setLabel("3")
                        .setStyle("DANGER")
                        .setEmoji('⭐'),
                )
                                     
            const avaliare = new Discord.MessageEmbed()
        .setTitle(`${config.nomebot} | Avaliação`)
        .setColor(config.cor)
        .setDescription(`Avalie os serviços do nosso servidor com:\n\n**5 Estrelas** ou então **3 Estrelas**`)    
        
      message.channel.send({ embeds: [avaliare], components: [avaliarb] })
      
    }
  }
                         if (interaction2.customId === "bom") {
                             
const bom = new Discord.MessageEmbed()
.setTitle(`${config.nomebot} | Nova avaliação`)
.setColor(config.cor)
.setDescription(`${interaction.user.name}\n\n⭐⭐⭐⭐⭐\n\n**5 Estrelas**`)
.setThumbnail(client.user.displayAvatarURL ({dynamic: true, format: "png", size: 1024}))   

interaction.channel.send({ embeds: [bom] })
                    }
                    
