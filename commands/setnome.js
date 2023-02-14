const Discord = require('discord.js'); //puxo a api aqui pq deu um embed
module.exports = {
    name: 'avatar', //o nome pra puxar o comando
  aliases: ['foto', 'icon', 'pfp'],//nomes alternativos
  //Descrição dele
    description: 'Pegue a URL de avatar do user mencionado.', 
  //conando abaixo, após o execute()
  cooldown: 5,//tempo de espera pra executar novamente
      async execute (msg, args) {

if (!msg.mentions.users.size) {
   return msg.channel.send('Ninguém mencionado');
    //tirei pra ver o proprio avatar
    //caso queira colocar 
    //msg.channel.send(`seu avatar: ${msg.author.displayAvatarURL({ dynamic: true })}`);
}

const avatarList = msg.mentions.users.map(user => {
          let nicer = new Discord.MessageEmbed() //Criei o embed antes do return
        .setTitle(`${user.username}'s avatar`) 
        .setImage(`${user.displayAvatarURL({ size: 1024 })}`)
        .setColor("RANDOM")
         
         return msg.channel.send(nicer); //Retornei o embed
;

        });
        
        
        
}
};  