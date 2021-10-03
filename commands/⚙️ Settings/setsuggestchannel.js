const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');

module.exports = {
    name: 'setsuggestchannel',
    category: `⚙️ Settings`,
    aliases : ['ssc'],
    description: `Shows all available bot commands.`,
    run: async (client, message, args, db) => {
        if(!message.member.roles.cache.some(r=>["Developer", "Operator", "Manager", "Owner", "*"].includes(r.name))) {
            return message.channel.send("You do not have permission to use this command!")
          };

        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);

        await db.set(`suggestion_${message.guild.id}`, Channel.id);

        let Embed = new MessageEmbed()
        .setColor(ee.color)
        .setDescription(`Suggestion Channel is set as <#${Channel.id}>`)

        return message.channel.send(Embed);



    }
}