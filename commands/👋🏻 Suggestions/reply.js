const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');

module.exports = {
    name: 'reply',
    category: `👋🏻 Suggestions`,
    aliases : [''],
    description: `Shows all available bot commands.`,
    run: async (client, message, args, db) => {
      if(!message.member.roles.cache.some(r=>["Admin", "Sr Admin", "Developer", "Operator", "Manager", "Owner", "*"].includes(r.name))) {
        return message.channel.send("You do not have permission to use this command!")
      };
      
        let channel = await db.fetch(`suggestion_${message.guild.id}`);
        if (channel === null) return;
             
              if(!message.member.hasPermission('MANAGE_GUILD')) return;
              
            const rgx = /^(?:<@!?)?(\d+)>?$/;
        
            const messageID = args[0];
            const replyQuery = args.slice(1).join(' ');
              
            const number = new MessageEmbed()
              .setDescription(`I don't think that was a Message ID!`)
              .setColor(ee.wrongcolor)
              
            const id = new MessageEmbed()
              .setDescription(`You forgot to specify Message ID!`)
              .setColor(ee.wrongcolor)
              
            const query = new MessageEmbed()
              .setDescription(`You forgot to specify the Reply!`)
              .setColor(ee.wrongcolor)
              
            const reply = new MessageEmbed()
              .setDescription(`Successfully Replied the Suggestion.`)
              .setColor(ee.color)
              
            const noChannel = new MessageEmbed()
              .setDescription(`No Suggestion Channel found!`)
              .setColor(ee.wrongcolor)
            
              if(!messageID) return message.channel.send(id);
              
              if (!rgx.test(messageID)) return message.channel.send(number);
              
              if(!replyQuery) return message.channel.send(query)
              
              try{
              const suggestionChannel = message.guild.channels.cache.get(channel)
              
              if(!suggestionChannel) return message.channel.send(noChannel)
              
              const suggestedEmbed = await suggestionChannel.messages.fetch(messageID).catch(error => {
            const noMessage = new MessageEmbed()
              .setDescription(`Didn't find any Message with that ID!`)
              .setColor(ee.wrongcolor)
          return message.channel.send(noMessage);
          })
             
              const data = suggestedEmbed.embeds[0];
             
              const replyEmbed = new MessageEmbed()
              .setAuthor(`${data.author.name}`, data.author.iconURL)
              .setDescription(data.description)
              .setColor(ee.color)
              .addField(`Reply from ${message.author.tag}`, replyQuery)
              .setFooter("Status: Replied")
              .setTimestamp();
              
             suggestedEmbed.edit(replyEmbed)
             
             message.channel.send(reply)
              
              const user = await client.users.cache.find((u) => u.tag === data.author.name)
              
            const embed = new MessageEmbed()
              .setDescription(`You have got a Reply over your Suggestion. **[Message Link](https://discord.com/channels/${message.guild.id}/${channel}/${messageID})**`)
              .setColor(ee.color)
              .setFooter(ee.footertext, ee.footericon)
              .setTimestamp()
              user.send(embed)
                
              } catch(err) {
                return;
            }
    }
}