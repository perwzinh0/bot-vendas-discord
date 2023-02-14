const Discord = require("discord.js")



module.exports = {
    name: "configurar", // Coloque o nome do comando do arquivo
    aliases: ["config"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        let canal = interaction.config.logs == "null" ? "Sem canal de logs" : interaction.config.logs;
            let role = interaction.config.staffRole == "null" ? "Sem cargo setado" : interaction.config.staffROle;

            let embed = new MessageEmbed()
            .addField('Canal Logs:', `> ${canal}`)
            .addField('Staff Role:', `> ${role}`)
            .setThumbnail(message.author.avatarURL())
            .setColor('00000b')

            let row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('logs')
                .setStyle('SECONDARY')
                .setLabel('Canal Logs')
                .setEmoji('🔁'),

                new MessageButton()
                .setCustomId('role')
                .setStyle('SECONDARY')
                .setLabel('Cargo Cliente')
                .setEmoji('🔁')
            )


            const fil = await message.reply({ embeds: [embed], components: [row] });
            const interac = fil.createMessageComponentCollector({ componentType: "BUTTON", });


            interac.on('collect', async(interaction) => {
                if (message.author.id !== interaction.user.id) {
                    return;
                }

                if (interaction.customId == "logs") {
                    interaction.deferUpdate();

                    message.channel.send('❓ | Qual o novo canal de logs? (envie em id)')
                    .then((msg) => {
                        const filter = m => m.author.id == interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter });

                        collector.on('collect', canal => {
                            canal.delete();

                            if (isNaN(args)) return msg.reply(':x: | Você só pode inserir numeros!')
                            const novo = canal.content;
                            
                            Guild.findOneAndUpdate(
                                { idS: message.guild.id },
                                { $set: { 'config.logs': novo } }
                            )

                            canal = client.channels.cache.get(novo);
                            let embed = new MessageEmbed()
                            .addField('Canal Logs:', `> ${canal.name}`)
                            .addField('Staff Role:', `> ${role}`)
                            .setThumbnail(message.author.avatarURL())
                            .setColor('00000b')

                            fil.edit({ embeds: [embed], components: [] })
                        })
                    })
                }
            })
        }
    }