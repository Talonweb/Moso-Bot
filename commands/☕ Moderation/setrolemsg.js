const { MessageEmbed, Message } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');

module.exports = {
    name: 'setrolemsg',
    category: `☕ Moderation`,
    aliases : ['srm'],
    description: `Shows all available bot commands.`,
    run: async (client, message, args, db) => {
        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { max: 7, time: 60 * 1000 });
        let step = 0;

        let embed1 = new MessageEmbed()
        .setColor(ee.color)
        .setDescription('What is the title of the embed?')
    
        message.channel.send(embed1);
        collector.on('collect', async (msg) => {
            if (!msg.content) return collector.stop('error');
    
            step++;
            if (step == 1) {
                var title = msg.content;
                let embed2 = new MessageEmbed()
                .setColor(ee.color)
                .setDescription('What is the description of the embed?')
                message.channel.send(embed2);
                db.set(`title_message_${message.guild.id}`, title)
            }
            else if (step == 2) {
                let titlee = db.fetch(`title_message_${message.guild.id}`)
                var description = msg.content
                db.set(`text_message_${message.guild.id}`, description)

                let finished = new MessageEmbed()
                .setColor(ee.color)
                .setTitle(titlee)
                .setDescription(description)
                .setFooter(`Here is your finished product!`)
                .setTimestamp()

                message.channel.send(finished)
            }
        });
    }
}