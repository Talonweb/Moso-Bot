const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');
const Nuggies = require('nuggies');

module.exports = {
    name: 'roleedit',
    category: `☕ Moderation`,
    aliases : [''],
    description: `Shows all available bot commands.`,
    run: async (client, message, args) => {
        const brmanager = new Nuggies.buttonroles.edit()
    }
}