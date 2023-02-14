const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });

module.exports = {
    name: "configcupom", 
    run: async(client, message, args) => {
      const embederro = new Discord.MessageEmbed()
            .setTitle(`Erro - Permissão`)
            .setDescription(`Você não tem permissão para isto!`)
            .setColor(config.cor)
            .setFooter(`${config.nomebot} - Todos os direitos reservados.`)
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] });
      if(!args[0]) return message.reply(`❌ | Você não selecionou nenhum ID!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`❌ | Você não pode selecionar dois IDs de uma vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idcupom`)}`) return message.reply(`❌ | Esse ID de cupom não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
      const cupom = args[0];
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('qtdcupom')
            .setEmoji('<:infor:1015773390646284378>')
            .setLabel('Quantidade')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('mincupom')
            .setEmoji('<:infor:1015773390646284378>')
            .setLabel('Mínimo')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('pctcupom')
            .setEmoji('<:infor:1015773390646284378>')
            .setLabel('Porcentagem')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('delcupom')
            .setEmoji('<:expContextMenuDeleteMessage:1015771651377483808>')
            .setLabel('Excluir')
            .setStyle('DANGER'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('relcupom')
            .setEmoji('<:next:1015727899082510498>')
            .setLabel('Atualizar')
            .setStyle('SUCCESS'),
        );
        
        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`Bot Store | Configurando o ${db.get(`${cupom}.idcupom`)}`)
          .setDescription(`
📌 | Quantidade: ${db.get(`${cupom}.quantidade`)}
📌 | Mínimo: ${db.get(`${cupom}.minimo`)} Reais
📌 | Desconto: ${db.get(`${cupom}.desconto`)}%`)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(config.cor)], components: [row]})
        const interação = msg.createMessageComponentCollector({ componentType: "BUTTON", })
        interação.on("collect", async (interaction) => {
         if (message.author.id != interaction.user.id) {
          return;
         }
                
         if (interaction.customId === "delcupom") {
           msg.delete()
           msg.channel.send("✅ | Excluido!")
           db.delete(`${cupom}`)
         }
         if (interaction.customId === "qtdcupom") {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual a nova quantidade de usos?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if (isNaN(message.content)) return msg.edit("❌ | Não coloque nenhum caractere especial além de números.")
                 db.set(`${cupom}.quantidade`, `${message.content}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === "mincupom") {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual o novo mínimo para uso em reais?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`${cupom}.minimo`, `${message.content.replace(",", ".")}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === 'pctcupom') {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual o novo desconto em porcentagem?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if(isNaN(message.content)) return msg.edit("❌ | Não coloque nenhum caractere especial além de números.")
                 db.set(`${cupom}.desconto`, `${message.content}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === 'relcupom') {
           interaction.deferUpdate();
           const embed = new Discord.MessageEmbed()
             .setTitle(`Bot Store | Configurando o ${cupom}`)
             .setDescription(`
📌 | Quantidade: ${db.get(`${cupom}.quantidade`)}
📌 | Mínimo: ${db.get(`${cupom}.minimo`)} Reais
📌 | Desconto: ${db.get(`${cupom}.desconto`)}%`)
             .setThumbnail(client.user.displayAvatarURL())
             .setColor(config.color)
           msg.edit({ embeds: [embed] })
           message.channel.send("✅ | Atualizado!")
             }
           })
         }
       }