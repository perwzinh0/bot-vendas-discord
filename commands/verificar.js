const Discord = require("discord.js")



module.exports = {
    name: "verificar", // Coloque o nome do comando do arquivo
    aliases: ["Verificação"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        let servidor = client.guilds.cache.size;
        let usuarios = client.users.cache.size;
        let canais = client.channels.cache.size;
        let ping = client.ws.ping;
        let dono_id = "995150954670342164"; // Seu ID
        let dono = client.users.cache.get(dono_id);
        let prefixo = "/";
        let versao = "6";

        let embed = new Discord.MessageEmbed()
            .setColor("#ff7300")
            .setThumbnail("https://images-ext-2.discordapp.net/external/K0e_u-MWS7hRqE_Ht7fvXPCUK0Bi8RshLGAlTbO64nU/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/743183681182498906/4b0ee9ff6a7793cb1a3eb7a4528aec71.png?width=408&height=408")
            .setTitle("Verificação Humana")
            .setImage("https://media.discordapp.net/attachments/1013493549527994398/1020872563930435634/captcha.png")
            .setFooter("Você tem: 20 minutos")
            .setDescription(`Se verifique! Para entrar no **Servidor**\nCom o __Sistema de Captcha por imagem__\nEnvie as digitações que estão na imagem.\n\n**Note:**\n\n<:B_white_SetabrancaTKF:1015719810157518908> Coloque letras grandes\n<:B_white_SetabrancaTKF:1015719810157518908> Não erre , você tem 5 chances\n<:B_white_SetabrancaTKF:1015719810157518908> Resultados de falha e **Ban**\n\n**Detalhes:**\n\nAperta na imagem para ver ela completa\nMande o código todo junto\nApenas o código verde\nNão envie letras minúsculas\nNão coloque o codigo cinza\n\n**LEIA COM ATENÇÃO !**`);

        message.channel.send({ embeds: [embed] })



    }
}