const Discord = require("discord.js")

module.exports = {
    name: "botinfo", // Coloque o nome do comando do arquivo
    aliases: ["infobot"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        let servidor = client.guilds.cache.size;
        let usuarios = client.users.cache.size;
        let canais = client.channels.cache.size;
        let ping = client.ws.ping;
        let dono_id = "995150954670342164"; // Seu ID
        let dono = client.users.cache.get(dono_id);
        let prefixo = "/";
        let versao = "7.0.2";

        let embed = new Discord.MessageEmbed()
            .setColor("#9400D3")
            .setTimestamp(new Date)
            .setDescription(`⛩  | Olá, tudo bem? me chamo, **[${client.user.username}](https://discord.dog/${client.user.id})**  e fui desenvolvido para lojas de Store.


\ **・⛄| Desenvolvedores: ** [Drin Word](https://discord.gg/Gb368dFXgV)
\ **・🌈| Linguagem: ** [node.js](https://nodejs.org/en/)
\ **・🛡| Versão: ** ${versao}

\ **・🗡 | Ping:** ${ping}`);



        message.reply({ embeds: [embed] })



    }
}