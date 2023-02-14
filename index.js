const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const config = require("./config.json");
const mercadopago = require("mercadopago")
const db = require("quick.db")
const axios = require("axios")
const { JsonDatabase, } = require("wio.db");
const dbB = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const dbm = new JsonDatabase({ databasePath:"./databases/myJsonMoney.json"});
const dbv = new JsonDatabase({ databasePath:"./databases/myJsonAvaliar.json" });
const dbc = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });
const { joinVoiceChannel } = require('@discordjs/voice');


const db2 = new JsonDatabase({
  databasePath:"./databases/myJsonDatabase.json"
});
const moment = require("moment")


moment.locale("pt-br");
client.login(config.TOKEN);

client.once('ready', async () => {

    console.log("✅ | Estou Online - By: Perwzinho#9248")

})



  //ENTRADA NO SERIVODR
  client.on("guildMemberAdd", async (member) => {

    let guild = client.guilds.cache.get("904511836488077332");
    let channel = client.channels.cache.get("1051254403342008320");
    const cargo = member.guild.roles.cache.get("904517086666182726")
    
    if (guild != member.guild) {
  
      return console.log ("Um membro entrou no servidor");
  
    } else {
  
      member.roles.add(cargo)

      let entrada = new Discord.MessageEmbed()
      .setTitle (`Um novo membro entrou no servidor ${member.guild.name}.`)
      .setDescription(`${member} Seja bem vindo(a) ao servidor ${member.guild.name}`)
      
      .addField(`<:membros:1049473377519280149>** - Membros:**`, `[${guild.memberCount} membros](https://discord.com/)`, true)
      .addField(`<:ticket:1049471524647743489>** - Ticket:**`, `[Nesse canal](https://discord.com/channels/904511836488077332/1051254430210732162)`, true)
      .addField(`<:termos:1049473943876149248>** - Termos:**`, `[Nesse canal](https://discord.com/channels/904511836488077332/1051254423663419472)`, true)
      .addField(`<:email:1049474235631943680>** - Gmail:**`, `[brbots@suporte.app](https://discord.com/)`, true)
      
      .setColor(`${dbB.get(`cor`)}`)
      .setImage(`${dbB.get(`imagem`)}`)
      .setThumbnail(member.user.displayAvatarURL ({dynamic: true, format: "png", size: 1024}))
      .setFooter(`${config.nomebot} / 2022`)
      .setTimestamp();
  
      await channel.send({ embeds: [entrada] })
    }
  
  });

  client.on('messageCreate', message => {
    const ab = "**Consiga nosso Bot Store pelo nosso servidor do Discord: https://discord.gg/6Gh467GYsc**"
    if(message.content.startsWith("vision")){
      message.delete()
      return message.channel.send({ content: `${ab}` })
      
    }
  }) 

client.on("ready", () => {

    let channel = client.channels.cache.get(config.canalvoz);

    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    })

    console.log("✅ | Entrei no canal de vóz [" + channel.name + "] com sucesso.")
});

client.on("ready", () => {
    let activities = [
        `Melhor bot Store !`,
      ],
      i = 0;
    setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
          type: "PLAYING"
        }), 30000); // Aqui e o tempo de troca de status, esta e mili segundos 
    client.user
        .setStatus("dnd")
  });



process.on('multipleResolves', (type, reason, promise) => {
    console.log(`🚫 | Erro Detectado\n\n` + type, promise, reason)
});
process.on('unhandRejection', (reason, promise) => {
    console.log(`🚫 | Erro Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
    console.log(`🚫 | Erro Detectado:\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(`🚫 | Erro Detectado:\n\n` + error, origin)
});



client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
        console.log(err);
    }
});


client.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) {

        const eprod = db.get(interaction.customId);
        if (!eprod) return;
        const severi = interaction.customId;
        if (eprod) {
            const quantidade = db.get(`${severi}.conta`).length;



            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId(interaction.customId)
                        .setLabel('Comprar')
                       .setEmoji('<:STORE:1012138965580644494>')
                        .setStyle('SUCCESS'),
                );
            const embed = new Discord.MessageEmbed()
                .setTitle(`${config.nomebot} | Produto`)
                .setDescription(`\`\`\`${db.get(`${interaction.customId}.desc`)}\`\`\`\n<:nomeprod:1048380873545883779> | **Nome:** **__${db.get(`${interaction.customId}.nome`)}__**\n<:dinheirobot:1048377434774437918> | **Preço:** **__R$${db.get(`${interaction.customId}.preco`)}__**\n<:caixa:1048381269714673705> | **Estoque:** **__${db.get(`${interaction.customId}.conta`).length}__**`)
                .setColor(`${dbB.get(`cor`)}`)
                .setImage(`${dbB.get(`imagem`)}`)
            interaction.message.edit({ embeds: [embed], components: [row] })


            const embedsemstock = new Discord.MessageEmbed()
                .setTitle(`${config.nomebot} | Sistema de Vendas`)
                .setDescription(`Este produto está sem estoque, aguarde um reabastecimento!`)
                .setColor(`${dbB.get(`cor`)}`)
                .setImage(`${dbB.get(`imagem`)}`)
            if (quantidade < 1) return interaction.reply({
                embeds: [embedsemstock],
                ephemeral: true
            });
            
                        const sla = new Discord.MessageEmbed()
                .setTitle(`${config.nomebot} | Sistema de Vendas`)
                .setDescription(`Carrinho criado com Sucesso na categoria de <#${`${dbB.get(`categoria`)}`}>`)
                .setColor(`${dbB.get(`cor`)}`)
                .setImage(`${dbB.get(`imagem`)}`)
                
                interaction.reply({
                embeds: [sla],
                ephemeral: true
            });

const canal = "🛒・carrinho-" + interaction.user.username.toLowerCase().replace(" ","-").replace("!","").replace("<","").replace("/","").replace(">","");
interaction.deferUpdate()
if ((interaction.guild.channels.cache.find(c => c.name.toLowerCase() === canal))) {
  return;
}

            interaction.guild.channels.create(`🛒・carrinho-${interaction.user.username}`, {
                type: "GUILD_TEXT",
                parent: `${dbB.get(`categoria`)}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS"]
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ]
            }).then(c => {
                interaction.reply({embeds: [], ephemeral: true})
                const timer1 = setTimeout(function () {
                    
                    c.delete()
                }, 300000)
                c.setTopic(interaction.user.id)
                const emessage = c.send({ content: `<@${interaction.user.id}>` }).then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                })

                const row2 = new Discord.MessageActionRow()
                .addComponents(
                   new Discord.MessageButton()
                       .setCustomId('pix')
                       .setLabel("Continuar")
                       .setEmoji('<:continuar:1048375786819813486>')
                       .setStyle("PRIMARY"),
               )
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('cancelar')
                        .setLabel("Cancelar")
                        .setStyle("DANGER")
                        .setEmoji('<:emoji_52:1041744057023594536>'),
                )
                .addComponents(
                   new Discord.MessageButton()
                       .setCustomId('dm')
                       .setLabel("Testar DM")
                       .setEmoji('<:continuar:1041566049214136340>')
                       .setStyle("SUCCESS"),
               );
                const embed2 = new Discord.MessageEmbed()
                .setTitle(`${config.nomebot} | Sistema de Termos`)
                .setDescription(`Aceite os nossos termos antes de comprar algo:\n\n> ${config.emojic} **Mantenha sua dm completamente aberta (Use o botão abaixo para testar , caso o bot não envie nada na sua DM você vai ter que deixar ela aberta para receber o produto.)**\n\n> **${config.emojic} Não temos reembolso na Compra**\n\n> **${config.emojic} Seu produto e recebido na dm**\n\n> **${config.emojic} Seu carrinho e fechado por inatividade de 5 minutos.**`)
                .setColor(`${dbB.get(`cor`)}`)
            c.send({ embeds: [embed2], components: [row2] }).then(msg => {
                const filter = i => i.user.id === interaction.user.id;
                const collector = msg.channel.createMessageComponentCollector({ filter });
                collector.on("collect", interaction2 => {
                
                        if (interaction2.customId === "cupom") {

                            interaction2.channel.send(`<:infor:1015773390646284378> | Envie o Cupom de desconto`)
                    }
                         
                         if (interaction2.customId === "dm") {
                             
const dm = new Discord.MessageEmbed()
.setTitle(`${config.nomebot} | Vendas`)
.setColor(`${dbB.get(`cor`)}`)
.setDescription(`<@${interaction.user.id}>\n\n<:email:1018320553926475786> | Se você recebeu essa mensagem sua dm está aberta tranquilamente`)    
.setThumbnail(client.user.displayAvatarURL ({dynamic: true, format: "png", size: 1024}))

row.components[0]
.setDisabled(true)

interaction2.user.send({ embeds: [dm] })
                    }
                                        
                    if (interaction2.customId === "avaliar") {

const ava = new Discord.MessageEmbed()
.setColor('YELLOW')
.setTitle("Avalie sua compra no final do pedido")
.setDescription("Aperte em um dos botões abaixo para avaliar sua compra e depois pague para aparecer nas logs sua avaliação.")

dbv.set(`avaliar`, `Sem avaliação...`)

const avab = new Discord.MessageActionRow()
                    .addComponents(
                                    new Discord.MessageButton()
                                        .setCustomId('um')
                                        .setLabel("(1)")
                                        .setEmoji('⭐')
                                        .setStyle("SECONDARY"),
                                )
                    .addComponents(
                                    new Discord.MessageButton()
                                        .setCustomId('dois')
                                        .setLabel("(2)")
                                        .setEmoji('⭐')
                                        .setStyle("SECONDARY"),
                                )
                    .addComponents(
                                    new Discord.MessageButton()
                                        .setCustomId('tres')
                                        .setLabel("(3)")
                                        .setEmoji('⭐')
                                        .setStyle("SECONDARY"),
                                )
                    .addComponents(
                                    new Discord.MessageButton()
                                        .setCustomId('quatro')
                                        .setLabel("(4)")
                                        .setEmoji('⭐')
                                        .setStyle("SECONDARY"),
                                )
                    .addComponents(
                                    new Discord.MessageButton()
                                        .setCustomId('cinco')
                                        .setLabel("(5)")
                                        .setEmoji('⭐')
                                        .setStyle("SECONDARY"),
                                );
                                        
                            interaction2.channel.send({ embeds: [ava], components: [avab] })
                    }
                    
            if (interaction2.customId === "um") {
                    
                    dbv.set(`avaliar`, `⭐ (1)`)
                    
                    interaction2.channel.send("avaliação feita com sucesso")
                             }
                             
            if  (interaction2.customId === "dois") {
                    
                    dbv.set(`avaliar`, `⭐⭐  (2)`)
                    
                    interaction2.channel.send("avaliação feita com sucesso")
                             }
                             
            if  (interaction2.customId === "tres") {
                    
                    dbv.set(`avaliar`, `⭐⭐⭐ (3)`)
                    
                    interaction2.channel.send("avaliação feita com sucesso")
                             }
                             
            if  (interaction2.customId === "quatro") {
                    
                    dbv.set(`avaliar`, `⭐⭐⭐⭐ (4)`)
                    
                    interaction2.channel.send("avaliação feita com sucesso")
                             }
                             
            if  (interaction2.customId === "cinco") {
                    
                    dbv.set(`avaliar`, `⭐⭐⭐⭐⭐ (5)`)
                    
                    interaction2.channel.send("avaliação feita com sucesso")
                             }
                                 
                             if (interaction2.customId === "comprarboton") {
                             
                                const pen = new Discord.MessageEmbed()
                                .setColor(`${dbB.get(`cor`)}`)
                                .addField(`**Compra Solicitada**`, ` <:lista:1051269381285490688> | Seu pagamento foi solicitado, o sistema está aguardando a confirmação do pagamento.`, true)
                                
                                interaction.user.send({ embeds: [pen] })
                                                    }
                                
                                                    if (interaction2.customId === "cancelar") {
                                
                                const cancelado = new Discord.MessageEmbed()
                                .setColor(`${dbB.get(`cor`)}`)
                                .addField(`**Compra Cancelada**`, ` <:cancelar:1051269474885570700> | Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`, true)

                     interaction2.user.send({ embeds: [cancelado] })
                    }
 
                        if (interaction2.customId == 'pix') {
                            clearInterval(timer1)
                            const timer2 = setTimeout(function () {
                    
                                c.delete()
                            }, 300000)
                            msg.delete()
                            let quantidade1 = 1;
                            let precoalt = eprod.preco;
                            const row = new Discord.MessageActionRow()
                            .addComponents(
                                new Discord.MessageButton()
                                    .setCustomId('addcboton')
                                    .setLabel("Adicionar")
                                    .setEmoji('<:cupom:1051269705152860160>')
                                    .setStyle("SUCCESS"),
                            )
                            .addComponents(
                                new Discord.MessageButton()
                                    .setCustomId('removeboton')
                                    .setLabel('')
                                    .setEmoji('<:remove:1051269844848353411>')
                                    .setStyle("SECONDARY"),
                            )
                            .addComponents(
                                new Discord.MessageButton()
                                    .setCustomId('comprarboton')
                                    .setLabel("Continuar")
                                    .setEmoji('<:continuar:1051269951710822504>')
                                    .setStyle("SUCCESS"),
                            )
                            .addComponents(
                                new Discord.MessageButton()
                                    .setCustomId('addboton')
                                    .setLabel('')
                                    .setEmoji('<:add:1051270154710962196>')
                                    .setStyle("SECONDARY"),
                            )
                            .addComponents(
                                new Discord.MessageButton()
                                    .setCustomId('cancelar')
                                    .setLabel("Cancelar")
                                    .setEmoji('<:emoji_52:1051270294830055434>')
                                    .setStyle("DANGER"),
                            );
                                              
                            const embedss = new Discord.MessageEmbed()
                        .setDescription(`\`\`\`Pague para receber seu produto\`\`\`\n\⛩️ | **Produto: **\`${eprod.nome}\`\n\n🛒 | **Quantidade: **\`${quantidade1}\`\n\n <:dinheirobot:1051267320749764740> **| Preço Atual: **\`R$${precoalt}\`\n\n**✨ | ID da compra** \`${interaction.user.id}\``)
                       .setTitle(`${config.nomebot} | Sistema de Compras`)
                       .addField(`**🚀 | Cupom:**`, `Nenhum`)
                       .addField(`** <:cupom:1051269705152860160> | Desconto:**`, `0.00%`)
                       .setColor(`${dbB.get(`cor`)}`)
                       .setThumbnail(client.user.displayAvatarURL())
                     c.send({ embeds: [embedss], components: [row], content: ` `, fetchReply: true }).then(msg => {
                       const filter = i => i.user.id === interaction.user.id;
                       const collector = msg.createMessageComponentCollector({ filter });
                       collector.on("collect", interaction => {
                         interaction.deferUpdate()
                         if (interaction.customId === 'addcboton') {
                           interaction.channel.permissionOverwrites.edit(interaction.user.id, { SEND_MESSAGES: true });
                            msg.channel.send("❓ | Qual o cupom?").then(mensagem => {
                             const filter = m => m.author.id === interaction.user.id;
                             const collector = mensagem.channel.createMessageCollector({ filter, max: 1 });
                             collector.on("collect", cupom => {
                               if(`${cupom}` !== `${dbc.get(`${cupom}.idcupom`)}`) {
                                 cupom.delete()
                                 mensagem.edit("❌ | Isso não é um cupom!")
                                 interaction.channel.permissionOverwrites.edit(interaction.user.id, { SEND_MESSAGES: false });
                                 return;
                               }
                                 
                               var minalt = 
                               dbc.get(`${cupom}.minimo`);
                               var dscalt = dbc.get(`${cupom}.desconto`);
                               var qtdalt = dbc.get(`${cupom}.quantidade`);
                                 
                               precoalt = Number(precoalt) + Number(`1`);
                               minalt = Number(minalt) + Number(`1`);
                               if(precoalt < minalt) {
                                 cupom.delete()
                                 interaction.channel.permissionOverwrites.edit(interaction.user.id, { SEND_MESSAGES: false });
                                 mensagem.edit(`❌ | Você não atingiu o mínimo!`)
                                 return;
                               } else {
                              
                               precoalt = Number(precoalt) - Number(`1`);
                               minalt = Number(minalt) - Number(`1`);
                                   
                               if(`${dbc.get(`${cupom}.quantidade`)}` === "0") {
                                 cupom.delete()
                                 interaction.channel.permissionOverwrites.edit(interaction.user.id, { SEND_MESSAGES: false });
                                 mensagem.edit("❌ | Esse cupom saiu de estoque!")
                                 return;
                               }
                                              
                               if(`${cupom}` === `${dbc.get(`${cupom}.idcupom`)}`) {
                                 cupom.delete()
                                 mensagem.edit("✅ | Cupom adicionado")
                                  interaction.channel.permissionOverwrites.edit(interaction.user.id, { SEND_MESSAGES: false });
                                   var precinho = precoalt;
                                   var descontinho = "0."+dscalt;
                                   var cupomfinal = precinho * descontinho;
                                   precoalt = precinho - cupomfinal;
                                   qtdalt = qtdalt - 1;
                                   row.components[0].setDisabled(true)
                                   const embedss2 = new Discord.MessageEmbed()
                        .setDescription(`\`\`\`Pague para receber seu produto\`\`\`\n\⛩️ | **Produto: **\`${eprod.nome}\`\n\n**🛒 | Quantidade: **\`${quantidade1}\`\n\n<:dinheirobot:1051267320749764740> **| Preço Atual: **\`R$${precoalt}\`\n\n**✨ | Id da compra** \`${interaction.user.id}\``)
                                     .setTitle(`${config.nomebot} | Sistema de Compras`)
                                                            .addField(`**🚀 | Cupom:**`, `${dbc.get(`${cupom}.idcupom`)}`)
                                     .addField(`** <:cupom:1051269705152860160> | Desconto:**`, `${dbc.get(`${cupom}.desconto`)}.00%`)
                                     .setColor(`${dbB.get(`cor`)}`)
                                     .setThumbnail(client.user.displayAvatarURL())
                                   msg.edit({ embeds: [embedss2], components: [row], content: `Tenha uma boa compra !`, fetchReply: true })
                                   dbc.set(`${cupom}.quantidade`, `${qtdalt}`)
                                 }
                               }
                              }) 
                            })
                          }
                                    
                                    if (interaction.customId === "addboton") {

                                        const embedadici = new Discord.MessageEmbed()
                                            .setDescription(`Você não pode adicionar um valor maior do que o estoque`)
                                            .setColor(`${dbB.get(`cor`)}`)
                                        if (quantidade1++ >= quantidade) {
                                            quantidade1--;

                                            interaction.channel.send({ embeds: [embedadici] })
                                            const embedss2 = new Discord.MessageEmbed()
                                                .setTitle(`Sistema de Compras`)

                        .setDescription(`\`\`\`Pague para receber seu produto\`\`\`\n\⛩️ | **Produto: **\`${eprod.nome}\`\n\n**🛒 | Quantidade:** \`${quantidade1}\`\n\n<:dinheirobot:1051267320749764740>** | Preço Atual: **\`R$${precoalt}\`\n\n**✨ | Id da compra** \`${interaction.user.id}\``)
                       .addField(`**🚀 | Cupom:**`, `Nenhum`)
                       .addField(`** <:cupom:1051269705152860160> | Desconto:**`, `0.00%`)
                                                .setColor(`${dbB.get(`cor`)}`)
                                            msg.edit({ embeds: [embedss2] })
                                        } else {
                                            precoalt = Number(precoalt) + Number(eprod.preco);
                                            const embedss = new Discord.MessageEmbed()
                                                .setTitle(`Sistema de Compras`)

                        .setDescription(`\`\`\`Pague para receber seu produto\`\`\`\n\⛩️ | **Produto: **\`${eprod.nome}\`\n\n**🛒 | Quantidade: **\`${quantidade1}\`\n\n<:dinheirobot:1051267320749764740> **| Preço Atual: **\`R$${precoalt}\`\n\n**✨ | Id da compra** \`${interaction.user.id}\``)
                       .addField(`**🚀 | Cupom:**`, `Nenhum`)
                       .addField(`** <:cupom:1051269705152860160> | Desconto:**`, `0.00%`)
                                                .setColor(`${dbB.get(`cor`)}`)
                                            msg.edit({ embeds: [embedss] })
                                        }
                                    }
                                    if (interaction.customId === "removeboton") {
                                        if (quantidade1 <= 1) {
                                            const embedadici = new Discord.MessageEmbed()
                                                .setDescription(`Você não pode remover mais produtos`)
                                                .setColor(`${dbB.get(`cor`)}`)

                                            interaction.channel.send({ embeds: [embedadici] })

                                        } else {
                                            precoalt = precoalt - eprod.preco;
                                            quantidade1--;
                                            const embedss = new Discord.MessageEmbed()
                                                .setTitle(`Sistema de Compras`)

                        .setDescription(`\`\`\`${db.get(`${interaction.customId}.desc`)}\`\`\`\n\⛩️** | Produto: **\`${eprod.nome}\`\n\n**🛒 | Quantidade: **\`${quantidade1}\`\n\n<:dinheirobot:1051267320749764740> **| Preço Atual: **\`R$${precoalt}\`\n\n**✨ | Id da compra** \`${interaction.user.id}\``)
                       .addField(`**🚀 | Cupom:**`, `Nenhum`)
                       .addField(`** <:cupom:1051269705152860160> | Desconto:**`, `0.00%`)
                                                .setColor(`${dbB.get(`cor`)}`)
                                            msg.edit({ embeds: [embedss] })
                                        }
                                    }
                                    
                                    if (interaction.customId === "comprarboton") {
                                        clearInterval(timer2)
msg.channel.bulkDelete(50);
                                        mercadopago.configurations.setAccessToken(`${dbB.get(`acesstoken`)}`);
                                        var payment_data = {
                                            transaction_amount: Number(precoalt),
                                            description: `Pagamento - ${client.user.username} | ${interaction2.user.username}`,
                                            payment_method_id: 'pix',
                                            payer: {
                                                email: 'BR@pagamentos.com',
                                                first_name: 'BR',
                                                last_name: 'Company',
                                                identification: {
                                                    type: 'CPF',
                                                    number: '07944777984'
                                                },
                                                address: {
                                                    zip_code: '06233200',
                                                    street_name: 'Av. das Nações Unidas',
                                                    street_number: '3003',
                                                    neighborhood: 'Bonfim',
                                                    city: 'Osasco',
                                                    federal_unit: 'SP'
                                                }
                                            }
                                        };
        
                                        mercadopago.payment.create(payment_data).then(function (data) {
                                            const buffer = Buffer.from(data.body.point_of_interaction.transaction_data.qr_code_base64, "base64");
                                            const attachment = new Discord.MessageAttachment(buffer, "payment.png");
                                            const row = new Discord.MessageActionRow()
                                                .addComponents(
                                                    new Discord.MessageButton()
                                                        .setCustomId('qr')
                                                        .setLabel("QR Code")
                                                        .setEmoji('<:qrcode:1051271648390697011>')
                                                        .setDisabled(true)                      
                                                        .setStyle("SECONDARY"),
                                                )
                                                       
                                                .addComponents(
                                                    new Discord.MessageButton()                                  
                                                        .setCustomId('codigo')
                                                        .setLabel("Pix Copia e Cola")
                                                        .setEmoji('<:copiar:1051271828577992734>')
                                                        .setStyle("SECONDARY"),
                                                )
                                                .addComponents(
                                                    new Discord.MessageButton()
                                                        .setCustomId('bitcoin')
                                                        .setLabel("Bitcoin")
                                 
                                .setDisabled(true)
                                                        .setEmoji('<:bitcoin:1051272072808120412>')
                                                        .setStyle("SECONDARY"),
                                                )
                                                .addComponents(
                                                    new Discord.MessageButton()
                                                        .setCustomId('cancelarpix')
                                                        .setLabel("Cancelar")
                                                        .setEmoji('<:cancelar:1051269474885570700>')
                                                        .setStyle("DANGER"),
                                                );

                                            const embed = new Discord.MessageEmbed()
                                                .setTitle(`${config.nomebot} | Sistema de pagamento`)


                        .setDescription(`\`\`\`Pague para receber seu produto\`\`\`\n\⛩️** | Produto: **\`${eprod.nome}\`\n\n🛒** | Quantidade: **\`${quantidade1}\`\n\n<:dinheirobot:1048377434774437918> **| Preço Atual: **\`R$${precoalt}\`\n\n**✨ | Id da compra** \`${data.body.id}\``)
                                                .setImage("attachment://payment.png")
                                                .setColor(`${dbB.get(`cor`)}`)
                                                .setFooter("Após efetuar o pagamento, o tempo de processo é de no maximo 8 segundos !")
                                            msg.channel.send({ embeds: [embed], files: [attachment], components: [row] }).then(msg => {

                                                const collector = msg.channel.createMessageComponentCollector();
                                                const lopp = setInterval(function () {
                                                    const time2 = setTimeout(function () {
                                                        clearInterval(lopp);
                                                        msg.channel.delete()
                                                    }, 300000)
                                                    axios.get(`https://api.mercadolibre.com/collections/notifications/${data.body.id}`, {
                                                        headers: {
                                                            'Authorization': `Bearer ${dbB.get(`acesstoken`)}`
                                                        }
                                                    }).then(async (doc) => {

                                                        if (doc.data.collection.status === "approved") {
                                                            clearTimeout(time2)
                                                            clearInterval(lopp);
                                                            const a = db.get(`${severi}.conta`);
                                                            const embederror = new Discord.MessageEmbed()
                                                                .setTitle(`${config.nomebot} | Erro na compra`)
                                  .setImage(`${dbB.get(`imagem`)}`)
                                                                .setDescription(`\`\`\`Infelizmente alguem comprou esse produto antes de você, mande mensagem para algum dos staffs e apresente o codigo: [${data.body.id}]\`\`\``)
                                                                .setColor(`${dbB.get(`cor`)}`)

                                                                db2.add("pedidostotal", 1)
                                                                db2.add("gastostotal", Number(precoalt))
                                                                
                                                                db2.add(`${moment().format('L')}.pedidos`, 1)
                                                                db2.add(`${moment().format('L')}.recebimentos`, Number(precoalt))
                                                                
                                                                db2.add(`${interaction.user.id}.gastosaprovados`, Number(precoalt))
                                                                db2.add(`${interaction.user.id}.pedidosaprovados`, 1)

                                                            if (a < quantidade1) {
                                                                interaction2.channel.send({ embeds: [embederror] })
                                                                client.channels.cache.get(`${dbB.get(`logs`)}`).send(`Ocorreu um erro na compra do: <@${interaction.user.id}>, Valor da compra: ${precoalt}`)
                                                            } else {
                                                            const removed = a.splice(0, Number(quantidade1));
                                                            db.set(`${severi}.conta`, a);
                                        
                           botaokk = new Discord.MessageActionRow()

                         .addComponents(
                                                    new Discord.MessageButton()
                                                        .setCustomId('cancelar')
                                                        .setLabel("Fechar Carrinho")
                                                        .setEmoji('<:vlt:1020930289528209438>')
                                                        .setStyle("PRIMARY"),
                                                );                                                 const embed = new Discord.MessageEmbed()
                                                            .setTitle(`${config.nomebot} | Sistema de pagamento`)
                                                            .setDescription(`📌 | **Verifique sua dm para visualizar seu produto: ${eprod.nome}**\n\n📌 | **Esse canal vai ser fechado em 5 minutos**`)
                                                            .setColor(`${dbB.get(`cor`)}`)
                                                        msg.edit({ embeds: [embed], files: [attachment], components: [botaokk] })
                                        
                                                            const embedentrega = new Discord.MessageEmbed()
                    
                                                            .setTitle(` ${dbB.get(`nomebot`)} | Compra Realizada!`)
                                                            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
                                                            .setFooter(`BR Bots Agradesçe pela compra! Volte sempre!`)
                                                            .setDescription(` | Produto: \`\`\`${removed.join("\n")}\`\`\`
<:dinheirobot:1051267320749764740> **|** **__Valor__**: 
R$ ${precoalt}
<:nomeprod:1051263981488189531> **|** **__Id da compra__**: 
${data.body.id}
<:picture:1051267153275392030> **|** **__Nome__**: 
${eprod.nome}`)
.setColor(`${dbB.get(`cor`)}`)
                                                           interaction.user.send({ embeds: [embedentrega] })
                                            
                                                            const membro = interaction.guild.members.cache.get(interaction.user.id)
                                                            const role = interaction.guild.roles.cache.find(role => role.id === `${config.cargovip}`)
                                           
                                        
                                           membro.roles.add(config.cargovip)
                                                            setTimeout(() => interaction2.channel.delete(), 300000)
                                                            const embedcompraaprovada = new Discord.MessageEmbed()
                                                                .setTitle(`${dbB.get(`nomebot`)} | Compra aprovada`)
                                                                .setDescription(`<:compraaprovada:1048401681156685914>  Nova compra aprovada! <:compraaprovada:1048401681156685914>`)
                                                                .addField(` <:comprador:1051268267806830602> | Comprador:`, `${interaction.user.tag}`, false)
                                                                .addField(` <:nomeprod:1051263981488189531> | Id do comprador:`, `${interaction.user.id}`, false)
                                                                .addField(` <:data:1051266982789513306> | Data da compra:`, `${moment().format('LLLL')}`, false)
                                                               .addField(` <:picture:1051267153275392030> | Produto:`, `${eprod.nome}`, false)
                                                               .addField(` <:dinheirobot:1051267320749764740> | Valor:`, `R$${precoalt}`, false)
                                                               .addField(` <:caixa:1051267453373657128> | Quantidade:`, `${quantidade1}`, false)
                                                               .addField(` <:avaliao:1051267677450153984> | Avaliação:`, `⭐⭐⭐⭐⭐ (5)`, false)
                                                               .addField(` <:nomeprod:1049380912426668142> | Id da compra:`, `${data.body.id}`, false)
                                                               .setColor(`${dbB.get(`cor`)}`)
                                                client.channels.cache.get(`${dbB.get(`logs`)}`).send({ embeds: [embedcompraaprovada] })

                                                            const { WebhookClient } = require("discord.js");
    const webhook = new WebhookClient({ url: "https://discord.com/api/webhooks/1051260964235923466/tuJAAYiVwGN3BzjMTXVCJhj_9493K9j8NzvuzGbNRrhhsNc8Fo3FZ0jtvDL0J7fP9aKX" });
    webhook.send(
      { embeds: [
      new Discord.MessageEmbed()
        .setTitle(`**BR Bots | Vendas Clientes**`)
    
    
        .setColor(`${dbB.get(`cor`)}`)
        .setDescription(`${config.nomebot} | Compra Aprovada`)
                         .addField(`Comprador:`, `${interaction.user.tag}`, false)
                                                .addField(` <:nomeprod:1051263981488189531> | Id do comprador:`, `${interaction.user.id}`, false)
                                                .addField(` <:data:1051266982789513306> | Data da compra:`, `${moment().format('LLLL')}`, false)
                                                .addField(` <:picture:1051267153275392030> | Produto:`, `${eprod.nome}`, false)
                                                .addField(` <:dinheirobot:1051267320749764740> | Valor:`, `R$${precoalt}`, false)
                                                .addField(` <:caixa:1051267453373657128> | Quantidade:`, `${quantidade1}`, false)
                                                .addField(` <:avaliao:1051267677450153984> | Avaliação:`, `⭐⭐⭐⭐⭐ (5)`, false)
                                                .addField(` <:nomeprod:1049380912426668142> | Id da compra:`, `${data.body.id}`, false)
        .setImage(`${dbB.get(`imagem`)}`)
        .setThumbnail(interaction.guild.iconURL({dynamyc: true}))
    ]}); 
      
    client.on("messageCreate", async (message) => {
    if (message.channel.id !== '1023970678489231391') return;
    
    const embed = new Discord.MessageEmbed().setDescription(`${message.content}`).setColor(config.color)
    const channel = client.channels.cache.get('1023970678489231391')
    
    channel.send({ embeds: [embed] })
    });

                                                            const row2 = new Discord.MessageActionRow()
                                                                .addComponents(
                                                                    new Discord.MessageButton()
                                                                        .setCustomId(interaction.customId)
                                                                        .setLabel('Comprar')
                                                                        .setEmoji('<:STORE:1012138965580644494>')
                                                                        .setStyle('SUCCESS'),
                                                                );
                                                            const embed2 = new Discord.MessageEmbed()
                                                                .setTitle(`${config.nomebot} | Produto`)
                                                                .setDescription(`\`\`\`${db.get(`${interaction.customId}.desc`)}\`\`\`\n<:nomeprod:1048380873545883779> | **Nome:** **__${db.get(`${interaction.customId}.nome`)}__**\n<:dinheirobot:1048377434774437918> | **Preço:** **__R$${db.get(`${interaction.customId}.preco`)}__**\n<:caixa:1048381269714673705> | **Estoque:** **__${db.get(`${interaction.customId}.conta`).length}__**`)
                                                                .setColor(`${dbB.get(`cor`)}`)
                                                                .setImage(`${dbB.get(`imagem`)}`)
                                                            interaction.message.edit({ embeds: [embed2], components: [row2] })
                                                        }}
                                                    })
                                                }, 10000)
                                                collector.on("collect", interaction => {
                                                    if (interaction.customId === 'codigo') {
                                                        interaction.deferUpdate();
                                                        const row = new Discord.MessageActionRow()
                                                 .addComponents(
                                                    new Discord.MessageButton()
                                                        .setCustomId('qr')
                                                        .setLabel("QR Code")
                                                        .setEmoji('<:qr:1041754445035347979>')
                                                        .setDisabled(true)                      
                                                        .setStyle("SECONDARY"),
                                                )
                                                       
                                                .addComponents(
                                                    new Discord.MessageButton()                                  
                                                        .setCustomId('codigo')
                                                        .setLabel("Pix Copia e Cola")
                                                        .setEmoji('<:copiar:1041754676581892126>')
                                                        .setDisabled(true)
                                                        .setStyle("SECONDARY"),
                                                )
                           .addComponents(
                                                    new Discord.MessageButton()
                                                        .setCustomId('money')
                                                        .setLabel("Bitcoin")
                                                        .setDisabled(true)
                                                        .setEmoji('<:bitcoin:1041565300124024852>')
                                                        .setStyle("SECONDARY"),
                                                )
                           .addComponents(
                                                    new Discord.MessageButton()
                                                        .setCustomId('cancelar')
                                                        .setLabel("Cancelar")
                                                        .setEmoji('<:emoji_52:1041744057023594536>')
                                                        .setStyle("DANGER"),
                                                );
                                                        const embed = new Discord.MessageEmbed()
                                                            .setTitle(`${config.nomebot} | Sistema de pagamento`)
                                                                        .setDescription(`\`\`\`Pague para receber seu produto\`\`\`\n\⛩️** | Produto: **\`${eprod.nome}\`\n\n🛒** | Quantidade: **\`${quantidade1}\`\n\n<:dinheirobot:1048377434774437918> **| Preço Atual: **\`R$${precoalt}\`\n\n**✨ | Id da compra** \`${data.body.id}\``)
                                                            .setImage("attachment://payment.png")
                                                            .setColor(`${dbB.get(`cor`)}`)
                                                            .setFooter("Após efetuar o pagamento, o tempo de entrega é de no maximo 5 segundos")
                                                        msg.edit({ embeds: [embed], files: [attachment], components: [row] })
                                          
                     const codigone = new Discord.MessageEmbed()
                    .setDescription(data.body.point_of_interaction.transaction_data.qr_code)
                    .setColor(`${dbB.get(`cor`)}`)
                                                        interaction.channel.send({ embeds: [codigone] })
                                                    }
                                                    if (interaction.customId === 'cancelarpix') {
                                                        clearInterval(lopp);
                                                        interaction.channel.delete()
                                                    }
                                                })
                                            })
                                        }).catch(function (error) {
                                            console.log(error)
                                        });





                                    }
                                })
                            })
                        }
                        if (interaction2.customId == 'cancelar') {
                            clearInterval(timer1);
                         interaction2.channel.delete();
                        }
                    })
                })
            })
        }



    }
})




client.on('interactionCreate', async interaction => {
    
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'gerenciar') {
        interaction.deferUpdate();
        const adb = interaction.values[0];
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('precogerenciar')
                    .setLabel('Valor')
                    .setEmoji('<:infor:1015773390646284378>')
                    .setStyle('SECONDARY'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('nomegerenciar')
                    .setLabel('Nome')
                    .setEmoji('<:infor:1015773390646284378>')
                    .setStyle('SECONDARY'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('estoquegerenciar')
                    .setLabel('Estoque')
                    .setEmoji('<:infor:1015773390646284378>')
                    .setStyle('SECONDARY'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('descgerenciar')
                    .setLabel('Descrição')
                    .setEmoji('<:infor:1015773390646284378>')
                    .setStyle('SECONDARY'),
            ).addComponents(
                new Discord.MessageButton()
                    .setCustomId('deletegerenciar')
                    .setLabel('Deletar')
                    .setEmoji('<:expContextMenuDeleteMessage:1015771651377483808>')
                    .setStyle('DANGER'),
            );
        const embed = new Discord.MessageEmbed()
            .setTitle(`${config.nomebot} | Gerenciar Produto`)
            .setDescription(`Produto sendo gerenciado: ${adb}`)
            .setColor(`${dbB.get(`cor`)}`)
            .setFooter({ text: `${config.nomebot} - Todos os direitos reservados.` })
        interaction.message.edit({ embeds: [embed], components: [row] }).then(msg => {
            const filter = i => i.user.id === interaction.user.id;
            const collector = msg.createMessageComponentCollector({ filter });
            collector.on("collect", interaction => {
                if (interaction.customId === "deletegerenciar") {
                    msg.delete()
                    db.delete(adb)
                    const row = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageSelectMenu()
                                .setCustomId('gerenciar')
                                .setPlaceholder('Selecione uma opção')
                                .addOptions(db.all().map(item => ({ label: `ID: ${item.ID} - PREÇO: R$${item.data.preco}`, description: `NOME: ${item.data.nome || "Sem nome"}`, value: item.ID }))),
                        );
                    const embed = new Discord.MessageEmbed()
                        .setDescription(`Olá, para você gerenciar um produto\nselecione o menu abaixo e clique no produto\nque você quer gerenciar :)`)
                        .setColor(`${dbB.get(`cor`)}`)
                    msg.edit({ embeds: [embed], components: [row] })
                }
                if (interaction.customId === "precogerenciar") {
                    msg.delete()
                    const embedpreco = new Discord.MessageEmbed()
                        .setTitle(`${config.nomebot} | Gerenciar Produto`)
                        .setDescription(`Envie o novo preço abaixo`)
                        .setColor(`${dbB.get(`cor`)}`)
                    interaction.channel.send({ embeds: [embedpreco] }).then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.preco`, [`${message.content}`])

                            const row = new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageSelectMenu()
                                        .setCustomId('gerenciar')
                                        .setPlaceholder('Selecione uma opção')
                                        .addOptions(db.all().map(item => ({ label: `ID: ${item.ID} - PREÇO: R$${item.data.preco}`, description: `NOME: ${item.data.nome || "Sem nome"}`, value: item.ID }))),
                                );
                            const embed = new Discord.MessageEmbed()
                                .setDescription(`Olá, para você gerenciar um produto\nselecione o menu abaixo e clique no produto\nque você quer gerenciar :)`)
                                .setColor(`${dbB.get(`cor`)}`)
                            msg.edit({ embeds: [embed], components: [row] })
                        })
                    })
                }
                if (interaction.customId === "nomegerenciar") {
                    msg.delete()
                    const embednome = new Discord.MessageEmbed()
                        .setTitle(`${config.nomebot} | Gerenciar Produto`)
                        .setDescription(`Envie o novo nome abaixo`)
                        .setColor(`${dbB.get(`cor`)}`)
                    interaction.channel.send({ embeds: [embednome] }).then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            db.set(`${adb}.nome`, [`${message.content}`])
                            const row = new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageSelectMenu()
                                        .setCustomId('gerenciar')
                                        .setPlaceholder('Selecione uma opção')
                                        .addOptions(db.all().map(item => ({ label: `ID: ${item.ID} - PREÇO: R$${item.data.preco}`, description: `NOME: ${item.data.nome || "Sem nome"}`, value: item.ID }))),
                                );
                            const embed = new Discord.MessageEmbed()
                                .setDescription(`Olá, para você gerenciar um produto\nselecione o menu abaixo e clique no produto\nque você quer gerenciar :)`)
                                .setColor(`${dbB.get(`cor`)}`)
                            msg.edit({ embeds: [embed], components: [row] })
                        })
                    })
                }
                if (interaction.customId === "estoquegerenciar") {
                    msg.delete()
                    const itens = db.get(`${adb}.conta`);
                    const row2 = new Discord.MessageActionRow()
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId('adicionarest')
                                .setLabel('Adicionar')
                                .setEmoji('<:infor:1015773390646284378>')
                                .setStyle('SECONDARY'),
                        )
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId('removerest')
                                .setLabel('Remover')
                           .setEmoji('<:infor:1015773390646284378>')
                                .setStyle('SECONDARY'),
                                
                        )
                        .addComponents(
                            new Discord.MessageButton()
                                .setCustomId('backup')
                                .setLabel('Backup')
                             .setDisabled(true)
                             .setEmoji('<:Box:1015715624183402497>')
                                .setStyle('PRIMARY'),
                        );
                    const embedest = new Discord.MessageEmbed()
                        .setTitle(`${config.nomebot} | Gerenciar Produto`)
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
                                                .setTitle(`Estoque adicionado`)
                                                .setDescription(`Seu novo estoque agora é: \n\`\`\`${itens.join(" \n")}\`\`\``)
                                                .setColor(`${dbB.get(`cor`)}`)
                                            interaction.channel.send({ embeds: [embedfinalizar] })
                                            const row = new Discord.MessageActionRow()
                                                .addComponents(
                                                    new Discord.MessageSelectMenu()
                                                        .setCustomId('gerenciar')
                                                        .setPlaceholder('Selecione uma opção')
                                                        .addOptions(db.all().map(item => ({ label: `ID: ${item.ID} - PREÇO: R$${item.data.preco}`, description: `NOME: ${item.data.nome || "Sem nome"}`, value: item.ID }))),
                                                );
                                            const embed = new Discord.MessageEmbed()
                                                .setDescription(`Olá, para você gerenciar um produto\nselecione o menu abaixoe clique no produto\nque você quer gerenciar :)`)
                                                .setColor(`${dbB.get(`cor`)}`)
                                            msg.channel.send({ embeds: [embed], components: [row] })
                                        } else {

                                            message.delete()

                                            db.push(`${adb}.conta`, [`${message.content}`])
                                        }
                                    })
                                })
                            }
                            if (interaction.customId === "removerest") {
                                const embedest = new Discord.MessageEmbed()
                                    .setTitle(`${config.nomebot} | Gerenciar Produto`)
                                    .setDescription(`Este é seu estoque: \`\`\`${itens.join(" \n") || "Sem estoque"}\`\`\`\n**Para remover um item você irá enviar a linha do produto! \nObs: cada produto representa uma linha de cima a baixo , numere o estoque que você deseja apagar e mande a numeração**`)
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
                                            .setTitle(`${config.nomebot} | Gerenciar Produto`)
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
                                        const embed = new Discord.MessageEmbed()
                                            .setDescription(`Olá, para você gerenciar um produto\nselecione o menu abaixoe clique no produto\nque você quer gerenciar :)`)
                                            .setColor(`${dbB.get(`cor`)}`)
                                        msg.channel.send({ embeds: [embed], components: [row] })
                                    })
                                })
                            }
                        })
                    })
                }
                if (interaction.customId === "descgerenciar") {
                    msg.delete()
                    const embeddesc = new Discord.MessageEmbed()
                        .setTitle(`${config.nomebot} | Gerenciar Produto`)
                        .setDescription(`Envie a nova descrição abaixo`)
                        .setColor(`${dbB.get(`cor`)}`)
                    interaction.channel.send({ embeds: [embeddesc] }).then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.desc`, [`${message.content}`])
                            const row = new Discord.MessageActionRow()
                                .addComponents(
                                    new Discord.MessageSelectMenu()
                                        .setCustomId('gerenciar')
                                        .setPlaceholder('Selecione uma opção')
                                        .addOptions(db.all().map(item => ({ label: `ID: ${item.ID} - PREÇO: R$${item.data.preco}`, description: `NOME: ${item.data.nome || "Sem nome"}`, value: item.ID }))),
                                );
                            const embed = new Discord.MessageEmbed()
                                .setDescription(`Olá, para você gerenciar um produto\nselecione o menu abaixoe clique no produto\nque você quer gerenciar :)`)
                                .setColor(`${dbB.get(`cor`)}`)
                            msg.edit({ embeds: [embed], components: [row] })
                        })
                    })
                }
            })
        })
    }
})

client.on("messageCreate", (message) => {
    if (message.content === "GANHE10") {
      message.delete()
      message.channel.send(`⚠️ | Ops ! ${message.author} , a opção de cupom não pode ser utilizado ainda !`);
    }
  })

client.on("messageCreate", (message) => {
  let id_canal_de_verificacao = "1012195675750006836";
  let id_cargo_de_verificacao = "1010581356230754304";
        
  if (message.channel.id !== id_canal_de_verificacao) return;
  if (message.content === "1F9CDF") {
    message.delete();
    message.member.roles.add(id_cargo_de_verificacao)
  }
})

client.on("messageCreate", (message) => {
    let id_canal_de_verificacao = "1012195675750006836";
    let id_cargo_de_verificacao = "1010581356230754304";
          
    if (message.channel.id !== id_canal_de_verificacao) return;
    if (message.content === "1f9cdf") {
      message.delete();
      message.member.roles.add(id_cargo_de_verificacao)
    }
  })

client.on('ready', () => {
const { WebhookClient } = require("discord.js");
const webhook = new WebhookClient({ url: "https://discord.com/api/webhooks/1051260797256466442/hga7n2UQjGqEjZxe2pgsSByIok0p5ti-dYBEUCoODBUZwJihbq-jNAxkeFdcPv9mbQXm" });
webhook.send(
  { embeds: [
  new Discord.MessageEmbed()
    .setTitle(`**BR | sistema de logs**`)


    .setColor(`0073ff`)
    .setDescription(`<a:netword:1051263596983746680> | Bot iniciado com sucesso \n\n<:idbot:1051263682212024371> | Nome: ${client.user.username}\n\n <:nomeprod:1051263981488189531> | ID: ${client.user.id} \n\n<:pingbot:1051264094306586666> | Ping: ${client.ws.ping}\n\n<:memoriaram:1051264213055705139> | RAM: 256MB\n\n\<:js:1051264296698519674> | Linguagem: JavaScript\n\n<:sistema:1051264480274825307> | Sistema: Vendas\n\n<:vscode:1051264539892645998> | CPU: 4 vCPU (Intel Xeon) \n\n<:terminal:1051264596087935138> | Ultimas Logs:\n\n\`\`\`\ \n Logs de: ${moment().format('LLLL')} \n✅ | Comando carregado: help\n✅ | Comando carregado: gerenciar
✅ | Bot logado com Sucesso em ${config.nomebot}\n
✅ | Sistema Carregando\n✅ | Sistema atualizado V21.0.2\`\`\`\ `)
    .setImage("https://media.discordapp.net/attachments/1010581418293870592/1023649515544248371/unknown.png")
    .setThumbnail(`https://media.discordapp.net/attachments/1010581418293870592/1023825744960426075/on.png`)
]}); 
  
client.on("messageCreate", async (message) => {
if (message.channel.id !== '1023811133410394123') return;

const embed = new Discord.MessageEmbed().setDescription(`${message.content}`).setColor(config.color)
const channel = client.channels.cache.get('1023811133410394123')

channel.send({ embeds: [embed] })
})
});

client.on('interactionCreate', interaction => {
    
    if (interaction.customId.startsWith('1')) {
        if (interaction.member.roles.cache.get(`${dbB.get(`categoria`)}`)) { //Coloque o  id do cargo
            interaction.member.roles.remove(`${dbB.get(`categoria`)}`) //Coloque o  id do cargo
            interaction.reply({ content: `**Você perdeu a permissão do bot com o cargo: <@&${config.idcargo}> ** `, ephemeral: true })

            return;
            } 

       

            try {
              
                interaction.member.roles.add(`${dbB.get(`categoria`)}`) //Coloque o  id do cargo
                interaction.reply({ content: `**Você recebeu permissão do bot com o cargo: <@&${config.idcargo}> **`, ephemeral: true })
                return;

            }
            catch (er) {
                console.log(er)
            }

            
            


}});

client.on("interactionCreate", (interaction) => {
    if (interaction.isButton()) {
        if ( interaction.customId === "t" ) {
            if (interaction.guild.channels.cache.find(c => c.name === `BR-${interaction.user.tag}`)) {
                let c = interaction.guild.channels.cache.find(c => c.name === `BR-${interaction.user.tag}`);
                interaction.reply({ content: `Você já possui um ticket aberto em ${c}.`, ephemeral: true })
            } else {
                interaction.guild.channels.create(`BR-${interaction.user.tag}`, {
                    type: "GUILD_TEXT",
                    //parent: "976589205398515732",
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ["VIEW_CHANNEL"]
                        },
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                        }
                    ]
                }).then(c => {

                    interaction.reply({ content: `Olá, seu ticket foi aberto em ${c}.`, ephemeral: true })

                    let embed = new Discord.MessageEmbed()
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`> Olá \`${interaction.user.username}\`, boas vindas ao seu ticket.\n > Aguarde alguns instantes para receber o suporte.\n\n > Seja claro no seu ticket!`);

                    let botao = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                        .setCustomId("tf")
                        .setEmoji("<:lixeira:966339848904540211> ")
                        .setStyle("DANGER")
                        .setLabel("Fechar Ticket")
                    );

                    c.send({ embeds: [embed], components: [botao] }).then(msg => msg.pin())
                })
            }
        } else 
      
        if (interaction.customId === "tf") {
            interaction.reply(`\\🔒 Olá ${interaction.user}, este ticket será fechado em \`5 seconds\`...`).then(() => {
                setTimeout(() => {
                    interaction.channel.delete();
                }, 5000)})}}})