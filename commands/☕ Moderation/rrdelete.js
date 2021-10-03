const Discord = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');
const emojis = require('../../handlers/emojis');
module.exports = {
    name: 'rrdelete',
    category: `☕ Moderation`,
    aliases : ['rrd'],
    description: `Shows all available bot commands.`,
    run: async (client, message, args, db) => {
        if(!message.member.roles.cache.some(r=>["Developer", "Manager", "Owner", "*"].includes(r.name))) {
            return message.channel.send("You do not have permission to use this command!")
          };
          
        if (!args[0]) return message.channel.send(`Specify the ChannelID or mention the Channel`);
        if (!args[1]) return message.channel.send(`Specify the MessageID`);
        if (!args[2]) return message.channel.send(`Specify the RoleID or mention the Role`);
        if (!args[3]) return message.channel.send(`Specify the Emoji`);
        
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel) return message.channel.send(`Channel Not Found`);
        let msg = await channel.messages.fetch(args[1]);
        if (!msg) return message.channel.send(`Message Not Found`);
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
        if (!role) return message.channel.send(`Role Not Found`);
        let emoji = await Discord.Util.parseEmoji(args[3]);
        if (!emoji && !emojis.includes(args[3])) return message.channel.send("Specify a valid Emoji");
        
        let pog = db.get(`reactions_${message.guild.id}_${msg.id}`)
        
        if (pog) {
        let data = pog.find((x) => x.emoji === args[3]);
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.guild.name, message.guild.iconURL())
        embed.setTitle("ScolioLand | Error")
        embed.setDescription(`Reaction Roles not Found!`)
        embed.setFooter(ee.footertext, ee.footericon);
        embed.setTimestamp()
        embed.setColor(ee.color)
        embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        if (!data) return message.channel.send(
        {
        embed: embed
        }
        )
        let index = pog.indexOf(data);
        delete pog[index];
        var filter = pog.filter((x) => {
        return x !== null && x
        });
        db.set(`reactions_${message.guild.id}_${msg.id}`, filter)
        let embed2 = new Discord.MessageEmbed()
        embed2.setAuthor(message.author.tag, message.author.displayAvatarURL())
        embed2.setDescription(`The Reaction Role has been deleted!`)
        embed.setFooter(ee.footertext, ee.footericon);
        embed2.setColor(ee.color)
        embed2.setTimestamp()
        return message.channel.send(
        {
        embed: embed2
        }
        )
        } else {
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.guild.name, message.guild.iconURL())
        embed.setTitle("ScolioLand | Error")
        embed.setDescription(`Reaction Roles not Found!`)
        embed.setFooter(ee.footertext, ee.footericon);
        embed.setTimestamp()
        embed.setColor(ee.color)
        embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        return message.channel.send(
        {
        embed: embed
        }
        );
        }
    }
}