const Discord = require("discord.js")

module.exports = {
    name: "final",
    aliases: ["acabou", "acabar"],

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) {
            message.reply(`Você não possui a permissão de \`Administrador\` para poder utilziar este comando.`)
    } else {
        let embed_1 = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Qual será o chat para enviar o anúncio?`);

        let embed_erro = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Não foi possível reconhecer um canal de texto.`);

        let embed_2 = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Comprador ?`);

        let embed_3 = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Plano do Comprador?`);

        let embed_4 = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Motivo?`);

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
                                            .setColor("GREEN")
                                            .setTimestamp(new Date)
                                            .setFooter("Abra um ticker para resolver.")
                                           
                        .setImage("https://media.discordapp.net/attachments/1036059454615064668/1036094528198811658/images_4.jpg") 
                        .setTitle("Inatividade Detectada")
                        .setDescription(`O sistema não detectou nenhuma **atividade/pagamento** sua nos últimos 30 dias, todas as suas aplicações serão removidas e os demais backups serão enviados para o dono(yTRASHER), assim que o pagamento for confirmado sua aplicação vai ser ligada novamente.\n\n**O que pode ser tratado nesses casos?**\n\nBot vendas (mensal)\nBot vendas (permanente)\nBot vendas (trimensal)\nMercado Pago (aluguel)\n\n**Todos esses itens podem ser desligados por falta de pagamentos(artigos dos termos)**`)
                        .addField(`**Comprador:**`, `${titulo}`, true)
                        .addField(`**Plano:**`, `${desc}`, true)
                        .addField(`**Motivo:**`, `${banner}`, true)
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
}