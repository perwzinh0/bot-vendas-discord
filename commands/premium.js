const {
  EmbedBuilder,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  PermissionFlagsBits,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "premium",
  description: "setar cargo para um usuario.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "canal",
      type: ApplicationCommandOptionType.Channel,
      description: "Selecione um canal",
      required: true,
    },
    {
      name: "usuario",
      type: ApplicationCommandOptionType.User,
      description: "Selecione um usuario",
      required: true,
    },
    {
      name: "cargo",
      description: "Selecione um cargo.",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
    {
      name: "tempo",
      type: ApplicationCommandOptionType.String,
      description: "Informe o tempo.",
      required: true,
      choices: [
        {
          name: "30 Segundos",
          value: "30s",
        },
        {
          name: "1 Minuto",
          value: "1m",
        },
        {
          name: "1 Semana",
          value: "168h",
        },
        {
          name: "15 dias",
          value: "480h",
        },
        {
          name: "1 mês",
          value: "720h",
        },
      ],
    },
  ],

  run: async (client, interaction) => {
    const { options, guild, member } = interaction;
    if (!member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return interaction.reply({
        content: `**⛔ | ${interaction.user}, Você precisa da permissão \`MODERATE_MEMBERS\` para usar este comando!**`,
        ephemeral: true,
      });
    } else {
      const canal = options.getChannel("canal");
      const cargo = options.getRole("cargo");
      const user = options.getUser("usuario");
      const tempo = options.getString("tempo");

      const membro = guild.members.cache.get(user.id);
      const servericon = guild.iconURL({ dynamic: true });

      const duracao = ms(tempo);
      const embed = new EmbedBuilder()
        .setColor("#38fc00")
        .setTitle(`**Nova Promoção**`)
        .setDescription(
          `> Usuário Premium: ${membro.user} \n\ > Cargo: ${cargo} \n\ > Tempo: ${tempo}`
        );

      guild.members.cache.forEach((membro) => {
        membro.roles.add(cargo).then(() => {
          setTimeout(() => {
            membro.roles.remove(cargo);
          }, duracao);
        });
      });

      const erro = new EmbedBuilder()
        .setColor("#38fc00")
        .setDescription(
          `❌ - Não foi possível promover o usuário ${membro} para o ${cargo}!`
        );

      interaction.reply({ embeds: [embed] }).catch((e) => {
        interaction.reply({ embeds: [erro] });
      });

      membro.send({
        embeds: [
          new EmbedBuilder()
            .setThumbnail(servericon)
            .setTitle(`👤 | **${membro.user.username}**`)
            .setColor("#38fc00")
            .setTimestamp()
            .setFooter({ text: `Horario` })
            .setTimestamp()
            .setDescription(
              `**${interaction.user.username}**, Você virou premium do servidor **${interaction.guild.name}** \n\n\ Agora você tem o melhor sistema de resgates do servidor. \n\ **Parabéns** `
            ),
        ],
      });
      canal.send({
        embeds: [
          new EmbedBuilder()
            .setColor("#38fc00")
            .setTitle(`**Sistema de Premium**`)
            .setDescription(
              `> Usuário premium: ${membro.user} \n\ > Tempo: ${tempo}`
            )
            .setTimestamp(),
        ],
      });
    }
  },
};
