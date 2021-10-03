const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { prefix } = require('../../botconfig/config.json');

module.exports = {
  name: `ban`,
  category: `☕ Moderation`,
  aliases: [`b`],
  description: `Bans a user`,
  run: async (client, message, args, cmduser, text, prefix) => {
    if(!message.member.roles.cache.some(r=>["Admin", "Sr Admin", "Developer", "Operator", "Manager", "Owner", "*"].includes(r.name))) {
      return message.channel.send("You do not have permission to use this command!")
    };
  
  const { member, mentions } = message
  const tag = `<@${member.id}>`
  const target = mentions.users.first()
  if (target) {
    const targetMember = message.guild.members.cache.get(target.id)
      targetMember.ban()
      let embed = new MessageEmbed()
      .setColor(ee.color)
      .addField("User:", `${target}`)
      .addField("Staff Member:", `${message.author}`)
      .setFooter(ee.footertext, ee.footericon)
      .setTimestamp();
      message.channel.send(embed).then(x => x.delete({timeout: 1000}))
  } else {
      let teg = new MessageEmbed()
      .setColor(ee.color)
      .setDescription(`${tag} Please specify someone to ban.`)
      .setFooter(ee.footertext, ee.footericon)
      .setTimestamp()
    message.channel.send(teg)
  }
}
    };