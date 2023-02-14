const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });
const dbB = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });

module.exports = {
    name: "configbot", 
    run: async(client, message, args) => {
        
const embederro = new Discord.MessageEmbed()
        .setTitle(`Erro - Permissão`)
        .setDescription(`Você não tem permissão para isto!`)
        .setColor(config.cor)
        .setFooter(`${config.nomebot} - Todos os direitos reservados.`)
                if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] })
       
      const chave = args[0];
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('logsvendas')
            .setEmoji('<:infor:1015773390646284378>')
            .setLabel('Nome Bot')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('minchave')
            .setEmoji('<:infor:1015773390646284378>')
            .setLabel('Cargo Comprador')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('tokendomp')
            .setEmoji('<:infor:1015773390646284378>')
            .setLabel('Token MP')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('pctchave')
            .setEmoji('<:infor:1015773390646284378>')
            .setLabel('Cor Embed')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('relchave')
            .setEmoji('<:next:1015727899082510498>')
            .setLabel('Atualizar')
            .setStyle('SECONDARY'),
        );
        
        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`Bot Store | Configurando o bot`)
          .setDescription(`
🚀 | **Nome Bot:** **${db.get(`nomebot`)}**
🚀 | **Cargo Cliente:** <@&${db.get(`cargo`)}>
🚀 | **Token MP:** || ${db.get(`acesstoken`)} ||
🚀 | **Cor:** ${db.get(`cor`)}`)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(config.cor)], components: [row]})
        const interação = msg.createMessageComponentCollector({ componentType: "BUTTON", })
        interação.on("collect", async (interaction) => {
         if (message.author.id != interaction.user.id) {
          return;
         }
                
         if (interaction.customId === "delchave") {
           msg.delete()
           msg.channel.send("✅ | Excluido!")
           db.delete(`${chave}`)
         }
         if (interaction.customId === "logsvendas") {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual o nome do bot:").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`nomebot`, `${message.content}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === "tokendomp") {
          interaction.deferUpdate();
          msg.channel.send("❓ | Qual o token do MP ?").then(msg => {
            const filter = m => m.author.id === interaction.user.id;
            const collector = msg.channel.createMessageCollector({ filter, max: 1 });
            collector.on("collect", message => {
              message.delete()
              db.set(`acesstoken`, `${message.content}`)
              msg.edit("✅ | Token Alterado!")
          })
        })
      }
         if (interaction.customId === "minchave") {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual o cargo de cliente? (mande o id)").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`cargo`, `${message.content.replace(",", ".")}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === 'pctchave') {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual a cor da embed? (ex: #00ff00)").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`cor`, `${message.content}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === 'relchave') {
           interaction.deferUpdate();
           const embed = new Discord.MessageEmbed()
          .setTitle(`Bot Store | Configurando o bot`)
             .setDescription(`
🚀 | **Nome Bot:** **${db.get(`nomebot`)}**
🚀 | **Cargo Cliente:** <@&${db.get(`cargo`)}>
🚀 | **Token MP:** || ${db.get(`acesstoken`)} ||
🚀 | **Cor:** ${db.get(`cor`)}`)
             .setThumbnail(client.user.displayAvatarURL())
             .setColor(config.cor)
           msg.edit({ embeds: [embed] })
           message.channel.send("✅ | Atualizado!")
             }
           })
         }
       }