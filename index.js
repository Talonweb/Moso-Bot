const Discord = require("discord.js"); 
const ee = require("./botconfig/embed.json");
const Nuggies = require("nuggies");
const db = require("quick.db");
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
});

//const uri = "mongodb://mongo:LXW4grfUaY71zE0BO3B0@containers-us-west-17.railway.app:7439";
//const mongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//mongo.connect(err => {
  //onst collection = mongo.db("test").collection("devices");
  // perform actions on the collection object
  //mongo.close();
//});
Nuggies.connect(uri);

require('discord-buttons')(client);
Nuggies.handleInteractions(client)


client.on('messageReactionAdd', async (reaction, user) => {
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  if(user.bot) return;
  let giveawayid = await db.get(`GiveawayEmbed_${reaction.message.id}`)
  if(!giveawayid) return
  let giveawayrole = await db.get(`GiveawayRole_${reaction.message.id}`)
  if(!giveawayrole) return;
   if(reaction.message.id == giveawayid && reaction.emoji.name == `📮`) {
    var home = await db.get(`giveawaydone_${reaction.message.id}`)
     
    var reactioncheck = setInterval(async function() {
  
       let member = reaction.message.guild.members.cache.get(user.id) 
      let guild = client.guilds.cache.get(reaction.message.guild.id)
      let role = guild.roles.cache.find(role => role.id === `${giveawayrole}`); 	      

      if(!member.roles.cache.has(`${role.id}`)) { 
        reaction.users.remove(user.id) 
       }
       
 
if(home === null) {
    clearInterval()
    clearInterval(reactioncheck);
  return;
}
if(!home) {
  clearInterval()
  clearInterval(reactioncheck);
return;
}
},5000);
let member = reaction.message.guild.members.cache.get(user.id) 
let guild = client.guilds.cache.get(reaction.message.guild.id)
let role = guild.roles.cache.find(role => role.id === `${giveawayrole}`)
let ffff = new Discord.MessageEmbed()
.setColor(ee.wrongcolor)
.setDescription(`Your entry for [this giveaway](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}) has been **Denied**. You need **${role.name}** role!`)
  let embed = new Discord.MessageEmbed()
  .setColor(ee.color)
  .setDescription(`Your Entry for [this giveaway](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}) has been **Approved**.
  
    `)
  .setTimestamp()
  .setFooter(ee.footertext, ee.footericon)
if(member.roles.cache.has(`${role.id}`)) return user.send(embed)
if(!member.roles.cache.has(`${role.id}`)) return user.send(ffff)
}
})

client.on('messageReactionAdd', async (reaction, user) => {
   if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  if(user.bot) return;
  let giveawayid = await db.get(`GiveawayEmbed_${reaction.message.id}`)
   if(!giveawayid) return
  let giveawayids = await db.get(`GiveawayID_${reaction.message.id}`)
  if(!giveawayids) return;
   if(reaction.message.id == giveawayid && reaction.emoji.name == `📮`) {
let guild = client.guilds.cache.get(giveawayids)
let guildcheck = guild.member(user.id)

     var reactioncheck = setInterval(async function() {
   if(!guildcheck) { return reaction.users.remove(user.id); }
    
    },5000)
    if(guildcheck) {
      let embed = new Discord.MessageEmbed()
    .setColor(ee.color)
    .setDescription(`Your Entry for [this giveaway](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}) has been **Approved**.
    
      `)
    user.send(embed) 
           }
           if(!guildcheck) {
       let ffff = new Discord.MessageEmbed()
      .setColor(ee.wrongcolor)
      .setDescription(`Your entry for [this giveaway](https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}) has been **Denied**.`)
    reaction.users.remove(user.id)
      user.send(ffff)  
     }
   }
});

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