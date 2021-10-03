const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');

module.exports = {
    name: 'unban',
    category: `☕ Moderation`,
    aliases : [''],
    description: `Shows all available bot commands.`,
    run: async (client, message, args) => {
        if(!message.member.roles.cache.some(r=>["Admin", "Sr Admin", "Developer", "Operator", "Manager", "Owner", "*"].includes(r.name))) {
            return message.channel.send("You do not have permission to use this command!")
          };

        const userID = args[0]
        if(!userID) return message.channel.send("You need to unban using user\'s ID.")


        message.guild.fetchBans().then(bans => {
            if(bans.size == 0) return
            let bannedUser =  bans.find(b => b.user.id == userID)

            if(bannedUser) {
                const embed = new MessageEmbed()
                .setTitle("PeePad | Unban System")
                .setDescription(`<@${userID}> has been unbanned.`)
                .addField('UNBANNED BY', message.author, true)
                .addField('USER INFO', userID)
                .setColor(ee.color)
                .setFooter(ee.footertext, ee.footericon)
                .setTimestamp()

                message.channel.send(embed).then(message.guild.members.unban(bannedUser.user))
            } else {
                message.channel.send("Invalid Banned User ID.")
            }
        })

    }
}