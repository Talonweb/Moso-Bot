const Discord = require("discord.js"); 
const ee = require("./botconfig/embed.json");
const Nuggies = require("nuggies");
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

client.on('ready', () => {
  Nuggies.giveaways.startAgain(client);
  Nuggies.giveaways.Messages(client, {
    dmWinner: true,
    giveaway: '🎉 **GIVEAWAY** 🎉',
    giveawayDescription: '🎁 Prize: **{prize}**\n🎊 Hosted by: {hostedBy}\n⏲️ Winner(s): `{winners}`\n\nRequirements: {requirements}',
    endedGiveawayDescription: '🎁 Prize: **{prize}**\n🎊 Hosted by: {hostedBy}\n⏲️ Winner(s): {winners}',
    giveawayFooterImage: 'https://cdn.discordapp.com/emojis/843076397345144863.png',
    winMessage: '{winners} you won {prize} Congratulations! Hosted by {hostedBy}',
    rerolledMessage: 'Rerolled! {winner} is the new winner of the giveaway!', // only {winner} placeholder
    toParticipate: '**Click the Enter button to enter the giveaway!**',
    newParticipant: 'You have successfully entered for this giveaway', // no placeholders | ephemeral
    alreadyParticipated: 'you already entered this giveaway!', // no placeholders | ephemeral
    noParticipants: 'There are not enough people in the giveaway!', // no placeholders
    noRole: 'You do not have the required role(s)\n{requiredRoles}\n for the giveaway!', // only {requiredRoles} | ephemeral
    dmMessage: 'You have won a giveaway in **{guildName}**!\nPrize: [{prize}]({giveawayURL})',
    noWinner: 'Not enough people participated in this giveaway.', // no {winner} placerholder
    alreadyEnded: 'The giveaway has already ended!', // no {winner} placeholder
    dropWin: '{winner} Won The Drop!!', // only {winner} placeholder
  });
});

const uri = "mongodb://mongo:LXW4grfUaY71zE0BO3B0@containers-us-west-17.railway.app:7439";
//const mongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//mongo.connect(err => {
  //onst collection = mongo.db("test").collection("devices");
  // perform actions on the collection object
  //mongo.close();
//});
Nuggies.connect(uri);

require('discord-buttons')(client);
Nuggies.handleInteractions(client)


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