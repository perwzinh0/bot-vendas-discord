const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../config.json")
module.exports = {
    name: "stock", // Coloque o nome do comando do arquivo
    run: async(client, message, args) => {
        const embederro = new Discord.MessageEmbed()
        .setTitle(`Erro - Permissão`)
        .setDescription(`Você não tem permissão para isto!`)
        .setColor(config.cor)
        .setFooter(`${config.nomebot} - Todos os direitos reservados.`)
                if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send({ embeds: [embederro] })
        const embed = new Discord.MessageEmbed()
        .setTitle(`${config.nomebot} | Vendas Automaticas`)
        .setDescription(`\`📌| help\` - Exibe esta mensagem
        \`📌| add\` - Cria um produto para venda
        \`📌| stock\` - Mostra todos os produtos que você tem a venda
        \`📌| backup id\` - Manda o backup do produto selecionado no seu pv
        \`📌| set id\` - Cria a mensagem de compra do produto
        \`📌| gerenciar\` - gerenciar <id produto> , gerencia os produtos nome, preço e estoque do produto , veja os ids dos produto com o comando: ${config.prefix}stock
        \`📌| limpar\` - Limpa as mensagens do canal
        \`📌| estatisticas\` - Mostra as estatisticas de suas vendas
        \`📌| perfil\` - Mostra o perfil de quem enviou o comando(liberado para todos os usuarios)
        \`📌| rank\` - Mostra o rank de pessoas que mais compraram
        \`📌| infobot\` - Mostra as informações do bot e o link dele
        \`📌| manager\` - Mostra as informações de sua aplicação
        \`📌| taxa\` - Muda a taxa de suas vendas pelo bot
        \`📌| status\` - Utilize ${config.prefix}status <id da venda> para ver se a compra teve um problema ou foi aprovada
        \`📌| del\` - Caso seu gerenciar não abra, use esse comando e delete algum produto
        \`📌| anunciar\` - Envia uma mensagem do bot com say e embed por perguntas
        \`📌| reembolso\` - reembolso + id da compra , reembolsa a venda automatico.
        \`📌| setavatar\` - Muda a foto do bot para uma nova por link
        \`📌| perm\` - Envia uma embed com botão , quem apertar nele tem permissão para utilizar os comandos do bot (cuidado).
        \`📌| criarcupom\` - Cria um cupom para você utilizar no bot (use o comando para configurar cupons para modificar ele)
        \`📌| configcupom\` - configcupom + nome do cupom para você modificar as coisas do cupom (valor minimo , porcentagem , quantidade , etc ).
        \`📌| sorteio\` - gera um sorteio
        \`📌| ticket\` - seta a embed de ticket`)
.setColor(config.cor)
.setImage(config.fotoembed)
message.channel.send({embeds: [embed]})
        
    }
}