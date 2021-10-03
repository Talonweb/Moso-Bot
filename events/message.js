let config = require('../botconfig/config.json')
const db = require('quick.db')
const Discord = require("discord.js") , cooldowns = new Discord.Collection();
const ee = require(`../botconfig/embed.json`);


module.exports.run = async (client, message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  let prefix = ".";

 // checks if message mentions the bot, if so responds with prefix
 const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
 if (message.content.match(prefixMention)) {
     const embed = new Discord.MessageEmbed()
         .setTitle('PeePad | Command Help')
         .setColor(ee.color)
         //.setImage("https://tenor.com/view/among-us-twerk-thicc-among-us-twerk-funny-among-us-gif-20511920.gif")
         .addField('Commands', `My commands can be found by typing \`${prefix}help\`.`)

         message.channel.send(embed)
 }  
  if (!message.content.startsWith(prefix)) return;

  if (!message.member)
    message.member = await message.guild.members.fetch (message);

  const args = message.content.slice(prefix.length).trim().split (/ +/);
  const cmd = args.shift().toLowerCase ();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd) ||  client.commands.find(command => command.aliases && command.aliases.includes(cmd));
  if (!command) command = client.commands.get(client.aliases.get (cmd));
  if (!command) return;
  if (command.botPermission) {
    let neededPerms = [];
    command.botPermission.forEach (p => {
      if (!message.guild.me.hasPermission (p)) neededPerms.push ('`' + p + '`');
    });

    let permissioa = new Discord.MessageEmbed()
    .setTitle(`PeePad | Cooldown System`)
    .setDescription(`Hey ${message.author.username}, you dont have the required permissions to use this command (${neededPerms}.)`)
    .setColor(ee.color)
    .setFooter(ee.footertext, ee.footericon)
    .setTimestamp()
    if (neededPerms.length) return message.channel.send(permissioa)
  }
  if(command.authorPermission) {
    let neededPerms = [];
    command.authorPermission.forEach (p => {
      if (!message.member.hasPermission (p)) neededPerms.push ('`' + p + '`');
    });
    if (neededPerms.length)
    return message.channel.send(permissioa)
  }
  if (command.ownerOnly) {
    if (!config.devs.includes (message.author.id))
      return;
  }

if(command.dmOnly) {
if(!message.channel.type === "dm") return ;
}

  if (!cooldowns.has(command.cooldowns)) cooldowns.set(command.cooldowns, new Discord.Collection());
  const member = message.member,
        now = Date.now(),
        timestamps = cooldowns.get(command.cooldowns),
        cooldownAmount = (command.cooldowns || 3) * 1000;
  var own = ["170627862506766336"]
  if (!timestamps.has(member.id)) {
    if (!own.includes(message.author.id)) {
      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    
    if (now < expirationTime) {

      const timeLeft = (expirationTime - now) / 1000;
      let cooldowna = new Discord.MessageEmbed()
      .setTitle(`PeePad | Cooldown System`)
      .setDescription(`
      Hey ${message.author.username}, chill you're on cooldown for (${timeLeft.toFixed(1)} seconds.)
      `)
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTimestamp()
  
      return message.channel.send(cooldowna);
    }
    
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount); // This will delete the cooldown from the user by itself.
  }
  if (command) command.run (client, message, args, db);
};
