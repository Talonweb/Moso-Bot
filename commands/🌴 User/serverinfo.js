const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');
const moment = require('moment');
const { readdirSync } = require("fs");

module.exports = {
    name: 'serverinfo',
    category: `🌴 User`,
    aliases : ['si'],
    description: `Shows all available bot commands.`,
    run: async (client, message, args) => {
        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
          };
          const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
          };
          const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydney: 'Sydney',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
          };
          const members = message.guild.members.cache;
          const channels = message.guild.channels.cache;
          const emojis = message.guild.emojis.cache;
          const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
      
          let embed = new MessageEmbed()
          .setColor(ee.color)
          .setTitle(`PeePad | ServerInfo`)
          .addField(`📋 Guild Name`, `${message.guild.name}`, true)
          .addField('👑 Guild Owner', `${message.guild.owner.user.tag}`, true)
          .addField('🗺️ Region', `The server region is ${regions[message.guild.region]}.`, true)
          .addField('❌ Explicit Filter', `${filterLevels[message.guild.explicitContentFilter]}`, true)
          .addField(`😁 Emojis`, `There are **${emojis.filter(emoji => !emoji.animated).size}** regular emojis and **${emojis.filter(emoji => emoji.animated).size}** animated emojis.`, true)
          .addField('🛡️ Verification Level', `Verification level is: **${verificationLevels[message.guild.verificationLevel]}**`, true)
          .addField('📆 Creation Date', `${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`, true)
          .addField('🛡️ Roles', `There are **${roles.length}** roles in this server.`, true)
          .addField('📺 Channels', `There are **${channels.filter(channel => channel.type === 'text').size}** text channels and **${channels.filter(channel => channel.type === 'voice').size}** voice channels.`, true)
          .setFooter(ee.footertext, ee.footericon)
          .setTimestamp()
      
          message.channel.send(embed)
    }
}