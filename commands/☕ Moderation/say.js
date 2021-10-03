const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { prefix } = require('../../botconfig/config.json');

module.exports = {
    name: `say`,
    category: `☕ Moderation`,
    aliases: [``],
    description: `Bans a Member from a Guild`,
    usage: `ban @User [0-7 Days, 0 == Infinite] [Reason]`,
    memberpermissions: [`BAN_MEMBERS`],
    run: async (client, message, args, cmduser, prefix) => {
        if(!message.member.roles.cache.some(r=>["Developer", "Manager", "Owner", "*"].includes(r.name))) {
            return message.channel.send("You do not have permission to use this command!")
          };
          
        var text = message.content.split(' ').slice(1).join(' ');
        if(!text) return message.channel.send("Say something.")
         message.delete({timeout: 1000})
         let embed = new MessageEmbed()
         .setColor(ee.color)
         .setDescription(text)
         //.setFooter(ee.footertext, ee.footericon)
         //.setTimestamp()
      
      
         message.channel.send(embed)
    }
}