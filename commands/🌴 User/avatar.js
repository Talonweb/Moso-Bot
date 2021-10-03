const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');

module.exports = {
    name: 'avatar',
    category: `🌴 User`,
    aliases : [''],
    description: `Shows all available bot commands.`,
    run: async (client, message, args) => {
        let member = message.mentions.users.first() || message.author;

        let avatar = member.displayAvatarURL({size: 1024})

        let embed = new MessageEmbed()
        .setColor(ee.color)
        .setTitle("PeePad | Avatar System")
        .setDescription(`${member.username}'s avatar`)
        .setImage(avatar)
        .setFooter(ee.footertext, ee.footericon)
        .setTimestamp()

        message.channel.send(embed)
    }
}