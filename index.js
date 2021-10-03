const Discord = require("discord.js"); 
const ee = require("./botconfig/embed.json");

const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.emoji = require("./botconfig/emojis.json");

["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

require('discord-buttons')(client);


client.on("guildMemberAdd", function (message) {

  let member = message;
  let er = message.author;
  let channel = member.guild.channels.cache.find(channel => channel.id === '847735327123963904');
  let rolee = member.guild.roles.cache.find(x => x.name === 'Members');

  let embed = new Discord.MessageEmbed()
  .setColor(ee.color)
  .setDescription(`Welcome to 💦 **mospee's pee pad**, ${member}\n\n**My Information**\n<:Tiktok:870264896963629116> Tiktok: https://tiktok.com/@mosleytw?\n<:Twitch:870265727079313428> Twitch: https://twitch.tv/mosleytw \n<:youtubee:887155743755759667> Youtube: https://youtube.com/channel/mosley\n\nWe now have **${member.guild.memberCount}** members in our server.`)
  .setThumbnail(member.user.avatarURL())
  channel.send(embed)
  member.roles.add(rolee)
});


client.login(require("./botconfig/config.json").token);