const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');

module.exports = {
    name: 'roleinfo',
    category: `🌴 User`,
    aliases : [''],
    description: `Shows all available bot commands.`,
    run: async (client, message, args) => {
        if (!args[0]) return message.channel.send("**Please Enter A Role!**")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.channel.send("**Please Enter A Valid Role!**");
    
        const status = {
            false: "No",
            true: "Yes"
        }
    
        let roleembed = new MessageEmbed()
            .setColor(ee.color)
            .setAuthor(`PeePad | Role Info`)
            //.setThumbnail(message.guild.iconURL())
            .addField("📑 **ID**", `\`${role.id}\``, true)
            .addField("✏ **Name**", role.name, true)
            .addField("#️⃣ **Hex**", role.hexColor, true)
            .addField("👥 **Members**", role.members.size, true)
            .addField("ℹ **Position**", role.position, true)
            .addField("Ⓜ **Mentionable**", status[role.mentionable],true)
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp()
    
        message.channel.send(roleembed);
    }
}