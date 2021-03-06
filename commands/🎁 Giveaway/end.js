const ee = require(`../../botconfig/embed.json`);
const Discord = require('discord.js');
const Nuggies = require('nuggies');
module.exports = {
    name: 'end',
    category: `🎁 Giveaway`,
    aliases : [''],
    description: `Closes the giveaway`,
    run: async (client, message, args, db) => {
        if (!args[0]) return message.reply('Please provide a message ID of the giveaway to end!', { allowedMentions: { repliedUser: false } });
        try {
            const data = await Nuggies.giveaways.getByMessageID(args[0]);
            const msg = await client.guilds.cache.get(data.guildID).channels.cache.get(data.channelID).messages.fetch(args[0]);
            await Nuggies.giveaways.end(msg, data, msg);
        }
        catch (err) {
            console.log(err);
            return message.channel.send('Unable to find the giveaway!');
        }
    }
    }
