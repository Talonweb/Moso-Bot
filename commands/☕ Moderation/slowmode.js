const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { prefix } = require('../../botconfig/config.json');

module.exports = {
    name: 'slowmode',
    category: `☕ Moderation`,
    aliases : [''],
    description: `Shows all available bot commands.`,
    run: async (client, message, args) => {
        if(!message.member.roles.cache.some(r=>["Admin", "Sr Admin", "Developer", "Operator", "Manager", "Owner", "*"].includes(r.name))) {
            return message.channel.send("You do not have permission to use this command!")
          };
          
        if(!args[0]) return message.channel.send('You should enter the amount your gonna put for slowmode!!!')
        if(isNaN(args[0])) return message.channel.send(`That is not a number!`)
        message.channel.setRateLimitPerUser(args[0])
        let embed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle("PeePad | Slowmode System")
        .setDescription(`Set the slowmode of this channel to **${args[0]}**`)
        .setFooter(ee.footertext, ee.footericon)
        .setTimestamp()
        message.channel.send(embed)
    }
}