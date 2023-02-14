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
            .setLabel('Logs Vendas')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('tokendomp')
            .setEmoji('<:infor:1015773390646284378>')
            .setLabel('Categoria Carrinho')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('minchave')
            .setEmoji('<:infor:1015773390646284378>')
            .setLabel('Imagem Larga')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('pctchave')
            .setEmoji('<:infor:1015773390646284378>')
            .setLabel('ID cargo adm')
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
🚀 | **Logs Vendas:** <#${db.get(`logs`)}>
🚀 | **Categoria Carrinho:** <#${db.get(`categoria`)}>
🚀 | **Imagem:** ${db.get(`imagem`)} 
🚀 | **ID do cargo ADM:** <@&${db.get(`id`)}> `)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(`00000b`)], components: [row]})
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
             msg.channel.send("❓ | Qual o canal de logs vendas ?(mande o id)").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if (isNaN(message.content)) return msg.edit("❌ | Não coloque nenhum caractere especial além de números.")
                 db.set(`logs`, `${message.content}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === "tokendomp") {
          interaction.deferUpdate();
          msg.channel.send("❓ | Qual a categoria aonde vai ser criado os carrinhos (envie o id)?").then(msg => {
            const filter = m => m.author.id === interaction.user.id;
            const collector = msg.channel.createMessageCollector({ filter, max: 1 });
            collector.on("collect", message => {
              message.delete()
              db.set(`categoria`, `${message.content}`)
              msg.edit("✅ | Categoria Alterado!")
          })
        })
      }
         if (interaction.customId === "minchave") {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual a imagem larga para as embed? (mande o link)").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`imagem`, `${message.content}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === 'pctchave') {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual o id do cargo de adm? (envie o id)").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`id`, `${message.content}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === 'relchave') {
           interaction.deferUpdate();
           const embed = new Discord.MessageEmbed()
          .setTitle(`Bot Store | Configurando o bot`)
          .setDescription(`
🚀 | **Logs Vendas:** <#${db.get(`logs`)}>
🚀 | **Categoria Carrinho:** <#${db.get(`categoria`)}>
🚀 | **Imagem:** ${db.get(`imagem`)} 
🚀 | **ID do cargo ADM:** <@&${db.get(`id`)}> `)
             .setThumbnail(client.user.displayAvatarURL())
             .setColor(`00000b`)
           msg.edit({ embeds: [embed] })
           message.channel.send("✅ | Atualizado!")
             }
           })
         }
       }