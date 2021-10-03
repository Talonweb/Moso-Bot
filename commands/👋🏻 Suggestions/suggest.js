const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');

module.exports = {
    name: 'suggest',
    category: `👋🏻 Suggestions`,
    aliases : [''],
    description: `Shows all available bot commands.`,
    run: async (client, message, args, db) => {
 
        let channel = await db.fetch(`suggestion_${message.guild.id}`);
        if (channel === null) return;
      
      const suggestionQuery = args.join(" ");
      if(!suggestionQuery) return message.reply("Please Suggest Something.");
        
      const embed = new MessageEmbed()
             
           .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
           .setDescription(`${suggestionQuery}`)
           .setColor(ee.color)
           .setFooter("Status: Pending")
           .setTimestamp();
           
        const done = new MessageEmbed()
           .setDescription(`Your suggestion is Submitted here, <#${channel}>\n\nNote: You agreed to get a DM on a reply over your Suggestion!`)
           .setFooter(ee.footertext, ee.footericon)
           .setColor(ee.color)
           
        message.channel.send(done)
        
        let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)
        
        await msgEmbed.react('🔼')
        await msgEmbed.react('🔽')
    }
}