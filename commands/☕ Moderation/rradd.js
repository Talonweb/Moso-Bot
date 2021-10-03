const Discord = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require("../../botconfig/config.json");
const emojis = require("../../handlers/emojis");

module.exports = {
  name: "rradd",
  category: `☕ Moderation`,
  aliases: ["rra"],
  description: `Shows all available bot commands.`,
  run: async (client, message, args, db) => {
    if(!message.member.roles.cache.some(r=>["Developer", "Manager", "Owner", "*"].includes(r.name))) {
      return message.channel.send("You do not have permission to use this command!")
    };

    message.delete();
    if (!args[0])
      return message.channel
        .send(
          new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(
              `Specify The ChannelID or mention a Channel\nExample: \`\`\`>rradd #example\`\`\``
            )
        )
        .then((m) => m.delete({ timeout: 3000 }));
    if (!args[1])
      return message.channel
        .send(
          new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(
              `Specify The MessageID\nExample: \`\`\`>rradd #example <messageID>\`\`\``
            )
        )
        .then((m) => m.delete({ timeout: 3000 }));
    if (!args[2])
      return message.channel
        .send(
          new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(
              `Specify The RoleID or mention a Role\nExample: \`\`\`>rradd #example <messageID> @Polls\`\`\``
            )
        )
        .then((m) => m.delete({ timeout: 3000 }));
    if (!args[3])
      return message.channel
        .send(
          new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(
              `Specify The Emoji\nExample: \`\`\`>rradd #example <messageID> @Polls ☕\`\`\``
            )
        )
        .then((m) => m.delete({ timeout: 3000 }));

    let channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel)
      return message.channel
        .send(
          new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Channel Not Found`)
        )
        .then((m) => m.delete({ timeout: 3000 }));
    let msg = await channel.messages.fetch(args[1]);
    if (!msg)
      return message.channel
        .send(
          new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Message Not Found`)
        )
        .then((m) => m.delete({ timeout: 3000 }));
    let role =
      message.mentions.roles.first() ||
      message.guild.roles.cache
        .get(args[2])
        .then((m) => m.delete({ timeout: 3000 }));
    if (!role)
      return message.channel
        .send(
          new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription(`Role Not Found`)
        )
        .then((m) => m.delete({ timeout: 3000 }));
    let emoji = await Discord.Util.parseEmoji(args[3]);
    if (!emoji && !emojis.includes(args[3]))
      return message.channel
        .send(
          new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription("Specify a valid Emoji")
        )
        .then((m) => m.delete({ timeout: 3000 }));
    if (emoji && !emojis.includes(args[3])) {
      let checking = await client.emojis.cache.find((x) => x.id === emoji.id);
      if (!checking)
        return message.channel
          .send(`Invalid Emoji`)
          .then((m) => m.delete({ timeout: 3000 }));
    }
    let pog = db.get(`reactions_${message.guild.id}_${msg.id}`);
    if (pog && pog.find((x) => x.emoji == args[3])) {
      let embed = new Discord.MessageEmbed()
        //.setAuthor(message.guild.name, message.guild.iconURL())
        .setTitle("GalaxyOrbs | Reaction Role")
        .setDescription(
          `This certain **Emoji** is already being used for the message you have selected!`
        )
        .setFooter(ee.footertext, ee.footericon)
        .setTimestamp()
        .setColor(ee.color);
      //.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      return message.channel
        .send(embed)
        .then((m) => m.delete({ timeout: 3000 }));
    }
    await msg.react(args[3]);
    db.push(`reactions_${message.guild.id}_${msg.id}`, {
      emoji: args[3],
      roleId: role.id,
    });

    let embed = new Discord.MessageEmbed()
      //.setAuthor(message.guild.name, message.guild.iconURL())
      .setTitle("GalaxyOrbs | Reaction Role ")
      .setThumbnail(message.guild.iconURL())
      .setDescription(`The **Reactions** has been set up`)
      .setFooter(ee.footertext, ee.footericon)
      .setColor(ee.color)
      .setTimestamp();
    message.channel.send(embed).then((m) => m.delete({ timeout: 3000 }));
  },
};
