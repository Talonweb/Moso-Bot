const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { prefix } = require('../../botconfig/config.json');

module.exports = {
    name: `kick`,
    category: `☕ Moderation`,
    aliases: [`kck`],
    description: `kick a Member from a Guild`,
    usage: `kick @User [0-7 Days, 0 == Infinite] [Reason]`,
    memberpermissions: [`KICK_MEMBERS`],
    run: async (client, message, args, cmduser, text, prefix) => {
      if(!message.member.roles.cache.some(r=>["Admin", "Sr Admin", "Developer", "Operator", "Manager", "Owner", "*"].includes(r.name))) {
        return message.channel.send("You do not have permission to use this command!")
      };
      
        const { member, mentions } = message
        const tag = `<@${member.id}>`
        const target = mentions.users.first()
        if (target) {
          const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
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
            .setDescription(`${tag} Please specify someone to kick.`)
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp()
          message.channel.send(teg)
        }
    }
}