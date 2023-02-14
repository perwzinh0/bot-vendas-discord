const Discord = require("discord.js")
const config = require("../config.json");
const { JsonDatabase, } = require("wio.db");
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = require("quick.db")
const dbB = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });

module.exports = {
    name: "gerenciar", 
    run: async(client, message, args,) => {
        
const embederro = new Discord.MessageEmbed()
        .setTitle(`Erro - Permissão`)
        .setDescription(`Você não tem permissão para isto!`)
        .setColor(config.cor)
        .setFooter(`${config.nomebot} - Todos os direitos reservados.`)
                if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] })
      if(db.all().length == 0) return message.reply(`❌ | **Você não tem nenhum produto criado!**`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(!args[0]) return message.reply(`❌ | **Você não selecionou nenhum ID do produto!**`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
      
      const adb = args[0];
      const row = new Discord.MessageActionRow()
      .addComponents(
        new Discord.MessageButton()
            .setCustomId('nomegerenciar')
            .setLabel('Nome')
            .setEmoji('<a:planeta:1024350148991647904>')
            .setStyle('PRIMARY'),
    )
    .addComponents(
        new Discord.MessageButton()
            .setCustomId('precogerenciar')
            .setLabel('Valor')
            .setEmoji('<:Dinheiro:1024351056097980456>')
            .setStyle('PRIMARY'),
    )
    .addComponents(
        new Discord.MessageButton()
            .setCustomId('descgerenciar')
            .setLabel('Descrição')
            .setEmoji('<:ticketlog:1036240546785665124>')
            .setStyle('PRIMARY'),
    )
    .addComponents(
        new Discord.MessageButton()
            .setCustomId('estoquegerenciar')
            .setLabel('Estoque')
            .setEmoji('<:DS_caixa:1036240744672919594>')
            .setStyle('PRIMARY'),
    )
    .addComponents(
        new Discord.MessageButton()
            .setCustomId('deletegerenciar')
            .setLabel('Deletar')
            .setEmoji('<:lixo:1036240988504596631>')
            .setStyle('DANGER'),
    );
        
        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
            .setTitle(`${dbB.get(`nomebot`)} | Produto`)
            .setDescription(`\`\`\`${db.get(`${args[0]}.desc`)}\`\`\`\n✨ | **Nome:** **__${db.get(`${args[0]}.nome`)}__**\n💳 | **Preço:** **__R$${db.get(`${args[0]}.preco`)}__**\n🛒 | **Estoque:** **__${db.get(`${args[0]}.conta`).length}__**`)
            .setColor(`${dbB.get(`cor`)}`)
            .setFooter("Para comprar clique no botão abaixo.")
            .setImage(`${dbB.get(`imagem`)}`)], components: [row]})
        const interação = msg.createMessageComponentCollector({ componentType: "BUTTON", })
        interação.on("collect", async (interaction) => {
         if (message.author.id != interaction.user.id) {
          return;
         }

         if (interaction.customId === "nomegerenciar") {
            msg.delete()
            msg.channel.send("❓ | Qual é o novo nome").then(msg => {
                const filter = m => m.author.id === interaction.user.id;
                const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                collector.on("collect", message => {
                    db.set(`${adb}.nome`, [`${message.content}`])
                    message.delete()
                    msg.edit("<:diamante:1045838103765585931> | Nome Alterado!")
                    
                })
            })
        }

        if (interaction.customId === "descgerenciar") {
            msg.delete()
            msg.channel.send("❓ | Qual é a nova descrição?").then(msg => {
                const filter = m => m.author.id === interaction.user.id;
                const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                collector.on("collect", message => {
                    message.delete()
                    db.set(`${adb}.desc`, [`${message.content}`])
                    msg.edit("<:diamante:1045838103765585931> | Descrição Alterada!")
             })
           })
        }

        if (interaction.customId === "precogerenciar") {
            msg.delete()
            msg.channel.send("❓ | Qual é o novo preço").then(msg => {
                const filter = m => m.author.id === interaction.user.id;
                const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                collector.on("collect", message => {
                    message.delete()
                    msg.edit("<:diamante:1045838103765585931> | Preço Alterado!")
                    db.set(`${adb}.preco`, [`${message.content}`])
                })
            })
        }

        if (interaction.customId === "deletegerenciar") {
            msg.delete()
            db.delete(adb)
        }

        if (interaction.customId === "estoquegerenciar") {
            msg.delete()
            const itens = db.get(`${adb}.conta`);
            const row2 = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('adicionarest')
                        .setEmoji("<:infor:1015773390646284378>")
                        .setLabel('Adicionar')
                        .setStyle('SUCCESS'),
                )
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('removerest')
                        .setEmoji("<:infor:1015773390646284378>")
                        .setLabel('Remover')
                        .setStyle('SECONDARY'),
                );

            const embedest = new Discord.MessageEmbed()
                .setTitle(`${dbB.get(`nomebot`)} | Gerenciar Produto`)
                .setDescription(`Este é seu estoque: \`\`\`${itens.join(" \n") || "Sem estoque, adicione"}\`\`\``)
                .setColor(`${dbB.get(`cor`)}`)
            interaction.channel.send({ embeds: [embedest], components: [row2] }).then(msg => {
                const filter = i => i.user.id === interaction.user.id;
                const collector = msg.createMessageComponentCollector({ filter });
                collector.on("collect", interaction => {
                    if (interaction.customId === "adicionarest") {
                        const embede = new Discord.MessageEmbed().setDescription(`Envie o produto de um em um, quando terminar de enviar digite: "finalizar"`).setColor(`${dbB.get(`cor`)}`);
                        msg.edit({ embeds: [embede], components: [] }).then(msg => {
                            const filter = m => m.author.id === interaction.user.id;
                            const collector = msg.channel.createMessageCollector({ filter })
                            collector.on("collect", message => {

                                if (message.content === "finalizar") {
                                    collector.stop();
                                    const itens = db.get(`${adb}.conta`);
                                    const embedfinalizar = new Discord.MessageEmbed()
                                        .setTitle(`📌 | Estoque adicionado`)
                                        .setDescription(`** <:diamante:1045838103765585931> |Seu novo estoque agora é:** \n\`\`\`${itens.join(" \n")}\`\`\``)
                                        .setColor(`${dbB.get(`cor`)}`)
                                    interaction.channel.send({ embeds: [embedfinalizar] })

                                } else {

                                    message.delete()

                                    db.push(`${adb}.conta`, [`${message.content}`])
                                }
                            })
                        })
                    }
                    if (interaction.customId === "removerest") {
                        const embedest = new Discord.MessageEmbed()
                            .setTitle(`${dbB.get(`nomebot`)} | Gerenciar Produto`)
                            .setDescription(`Este é seu estoque: \`\`\`${itens.join(" \n") || "Sem estoque"}\`\`\`\n**Para remover um item você irá enviar a linha do produto!**`)
                            .setColor(`${dbB.get(`cor`)}`)
                        msg.edit({ embeds: [embedest], components: [] }).then(msg => {
                            const filter = m => m.author.id === interaction.user.id;
                            const collector = msg.channel.createMessageCollector({ filter, max: 1 })
                            collector.on("collect", message1 => {
                                const a = db.get(`${adb}.conta`);
                                a.splice(message1.content, 1)
                                db.set(`${adb}.conta`, a);
                                const itens2 = db.get(`${adb}.conta`);
                                const embedest2 = new Discord.MessageEmbed()
                                    .setTitle(`${dbB.get(`nomebot`)} | Gerenciar Produto`)
                                    .setDescription(`Este é seu novo estoque: \`\`\`${itens2.join(" \n") || "Sem estoque"}\`\`\``)
                                    .setColor(`${dbB.get(`cor`)}`)
                                msg.channel.send({ embeds: [embedest2] })
                                const row = new Discord.MessageActionRow()
                                    .addComponents(
                                        new Discord.MessageSelectMenu()
                                            .setCustomId('gerenciar')
                                            .setPlaceholder('Selecione uma opção')
                                            .addOptions(db.all().map(item => ({ label: `ID: ${item.ID} - PREÇO: R$${item.data.preco}`, description: `NOME: ${item.data.nome || "Sem nome"}`, value: item.ID }))),
                                    );
                            })
                        })
                    }
                })
            })
        }
    



           })
         }
       }
