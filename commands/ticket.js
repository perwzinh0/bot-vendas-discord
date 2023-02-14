const Discord = require("discord.js")

module.exports = {
    name: "ticket", // Coloque o nome do comando do arquivo
    aliases: ["ticket"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui permissão para utilizar este comando.`)
        } else {
            let embed = new Discord.MessageEmbed()
            .setColor("BLACK")
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true })})
            .setTimestamp(new Date())
            .setAuthor({ name: 'Ticket De Vendas e Suporte', iconURL: 'https://cdn.discordapp.com/attachments/948617121519263746/1051280225503281282/brbots.png' })
            .setTitle(` Abra um ticket`)
            .setDescription(`> ** <:ticket:1049094093625634917> » Clique no botão para solicitar a abertura de um ticket.**
            
            > ** <:ticket:1049094093625634917>  » So Abra o Ticket No caso de Compra Ou Suporte!**
            
            > ** <:ticket:1049094093625634917> » Nao Abra o Ticket sem Motivo!**`)
 
            const botao = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                .setCustomId("t")
                .setEmoji("<:ticket:1049092006825181284>")
                .setStyle("SECONDARY")
                .setLabel("Abra um Ticket")
            );
            
        


               message.channel.send({ embeds: [embed], components: [botao] }).then( () => {
                            message.delete()


                });



        }

    
}}