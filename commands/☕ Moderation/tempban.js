const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');
const ms = require('ms');
module.exports = {
    name: 'tempban',
    category: `☕ Moderation`,
    aliases : [''],
    description: `Shows all available bot commands.`,
    run: async (client, message, args) => {
        if(!message.member.roles.cache.some(r=>["Admin", "Sr Admin", "Developer", "Operator", "Manager", "Owner", "*"].includes(r.name))) {
            return message.channel.send("You do not have permission to use this command!")
          };

        const member = message.mentions.members.first()
        if(!member) return  message.reply('Please Mention A User to Temp Ban.') //If User In Not Mentioned

        const time = args [1]
        if(!time) return message.reply('Specify Time to Temp Ban.') // If Time Is Not Provided

        await member.ban()

        const embed = new MessageEmbed()
        .setTitle('PeePad | Tempban System')
        .setDescription(`<@${member.user.id}> is temp banned for ${time}.`)
        .addField('BANNED BY', message.author)
        .setColor(ee.color)
        .setFooter(ee.footertext, ee.footericon)
        .setTimestamp()
        message.channel.send(embed)

        // Unban A User After Time Is Finished
        setTimeout(async () => {
            await message.guild.members.unban(member)
            message.channel.send(`<@${member.user.id}> has been unbanned after ${time} of ban.`)
        }, ms(time))

    }
}