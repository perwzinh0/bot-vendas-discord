const Discord = require("discord.js")

module.exports = {
    name: "final",
    aliases: ["acabou", "acabar"],

    run: async(client, message, args) => {

        let embed_1 = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Qual será o chat para enviar o anúncio? (<#1036297523901505598>)`);

        let embed_erro = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Não foi possível reconhecer um canal de texto.`);

        let embed_2 = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Comprador ?`);

        let embed_3 = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Produto comprado ?`);

        let embed_4 = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Dia da compra?`);

        message.reply({ embeds: [embed_1] }).then(msg => {
            let coletor_1 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

            coletor_1.on("collect", (palavra_1) => {
                let chat = palavra_1.mentions.channels.first() || message.guild.channels.cache.get(palavra_1.content);

                if (!chat) {
                    palavra_1.reply({ embeds: [embed_erro] })
                } else
                if (chat) {
                    message.reply({ embeds: [embed_2] }).then(m_2 => {

                        let coletor_2 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

                        coletor_2.on("collect", (palavra_2) => {

                            let titulo = palavra_2.content;

                             message.reply({ embeds: [embed_3] }).then(m_3 => {

                                let coletor_3 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

                                coletor_3.on("collect", (palavra_3) => {

                                    let desc = palavra_3.content;

                                    message.reply({embeds:[embed_4] }).then(
                                        m_4 => {

                                    let coletor_4 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

                                    coletor_4.on("collect", (palavra_4) => {

                                    let banner = palavra_4.content;

                                    message.reply(`O anúncio foi enviado para ${chat} com sucesso.`).then(m => {
                                        chat.send({ embeds: [
                                            new Discord.MessageEmbed()
                                            .setColor("YELLOW")
                                            .setTimestamp(new Date)
                                            .setFooter("WordPress - by Vision")
                                           
                        .setThumbnail("https://media.discordapp.net/attachments/1033136869292130315/1036316978262069309/approval-form-for-teachers-and-staff-to-cancel.png") 
                        .setTitle("Produtos - Analistas")
                        .setDescription(`**Informações do tempo final desse plano:**`)
                        .addField(`**Comprador:**`, `${titulo}`, true)
                        .addField(`**Produto:**`, `${desc}`, true)
                        .addField(`**Dia da compra:**`, `${banner}`, true)
                                        ] }).catch(e => { m.edit({ content: `> ${message.author} Algo deu errado.`, embeds: [] }) })
                                    })
                                  })
                                })
                             })
                        })
                    })
                })
            }})
        })
    }   
  }