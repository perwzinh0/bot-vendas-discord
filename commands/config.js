const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });

module.exports = {
    name: "config", 
    run: async(client, message, args) => {
      const embederro = new Discord.MessageEmbed()
            .setTitle(`Erro - Permissão`)
            .setDescription(`Você não tem permissão para isto!`)
            .setColor(config.cor)
            .setFooter(`${config.nomebot} - Todos os direitos reservados.`)
      if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] });
      if(!args[0]) return message.reply(`❌ | Você não selecionou nenhum ID!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`❌ | Você não pode selecionar dois IDs de uma vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idchave`)}`) return message.reply(`❌ | Esse ID de chave não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
      const chave = args[0];
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('logsvendas')
            .setEmoji('🔁')
            .setLabel('Logs Vendas')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('minchave')
            .setEmoji('🔁')
            .setLabel('Cargo Cliente')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('pctchave')
            .setEmoji('🔁')
            .setLabel('Cor Embed')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('relchave')
            .setEmoji('🔁')
            .setLabel('Atualizar')
            .setStyle('SECONDARY'),
        );
        
        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`Bot Store | Configurando o ${db.get(`${chave}.idchave`)}`)
          .setDescription(`
🚀 | logs: <#${db.get(`${chave}.logs`)}>
🚀 | Cargo: <@&${db.get(`${chave}.cargo`)}>
🚀 | Cor Embed: ${db.get(`${chave}.cor`)}`)
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
             msg.channel.send("❓ | Qual o canal de logs vendas ?(mande o id)").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if (isNaN(message.content)) return msg.edit("❌ | Não coloque nenhum caractere especial além de números.")
                 db.set(`${chave}.logs`, `${message.content}`)
                 msg.edit("✅ | Alterado!")
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
                 db.set(`${chave}.cargo`, `${message.content.replace(",", ".")}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === 'pctchave') {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual a cor da embed? (ex: 00ff00)").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`${chave}.cor`, `${message.content}`)
                 msg.edit("✅ | Alterado!")
             })
           })
         }
         if (interaction.customId === 'relchave') {
           interaction.deferUpdate();
           const embed = new Discord.MessageEmbed()
             .setTitle(`Bot Store | Configurando o ${chave}`)
             .setDescription(`
🚀 | Logs Vendas: <#${db.get(`${chave}.logs`)}>
🚀 | Cargo: <@&${db.get(`${chave}.cargo`)}>
🚀 | cor: ${db.get(`${chave}.cor`)}`)
             .setThumbnail(client.user.displayAvatarURL())
             .setColor(config.color)
           msg.edit({ embeds: [embed] })
           message.channel.send("✅ | Atualizado!")
             }
           })
         }
       }