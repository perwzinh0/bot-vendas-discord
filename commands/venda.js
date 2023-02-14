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
        .setDescription(`${message.author} As perguntas da venda vão aparecer abaixo , digite "ok"`);

        let embed_erro = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Não foi possível reconhecer um canal de texto.`);

        let embed_2 = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Comprador ?`);

        let embed_3 = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Produto Comprado?`);

        let embed_4 = new Discord.MessageEmbed()
        .setColor("#00000b")
        .setDescription(`${message.author} Valor que você vendeu ?`);

        message.reply({ embeds: [embed_1] }).then(msg => {
            let coletor_1 = message.channel.createMessageCollector({ filter: mm => mm.author.id == message.author.id, max: 1 });

            coletor_1.on("collect", (palavra_1) => {
                let chat = palavra_1.mentions.channels.first() || message.guild.channels.cache.get("1010581426908954715");

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

                                    message.reply(`O anúncio foi enviado para <#1010581426908954715> com sucesso.`).then(m => {
                                        chat.send({ embeds: [
                                            new Discord.MessageEmbed()
                                            .setColor("00000b")
                                            .setTimestamp(new Date)
                                            .setFooter("Aguarde a Staff...")
                                           
                        .setImage("https://media.discordapp.net/attachments/1038531015645347860/1038609798939279390/Picsart_22-10-30_15-20-19-644.jpg") 
                        .setTitle("Nova venda Realizada")
                        .setDescription(`A staff vai analisar seu pedido e logo em seguida vai enviar uma resposta sobre seu pagamento em sua **DM**`)
                        .addField(`**Comprador:**`, `${titulo}`, true)
                        .addField(`**Produto Vendido:**`, `${desc}`, true)
                        .addField(`**Valor:**`, `${banner}`, true)
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