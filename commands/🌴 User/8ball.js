const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');
const eightball = [
    'It is certain.'
    , 'It is decidedly so.'
    , 'Without a doubt.'
    , 'Yes - definitely.'
    , 'You may rely on it.'
    , 'As I see it, yes.'
    , 'Most likely.'
    , 'Outlook good.'
    , 'Yes.'
    , 'Signs point to yes.'
    , 'Reply hazy, try again.'
    , 'Ask again later.'
    , 'Better not tell you now.'
    , 'Cannot predict now.'
    , 'Concentrate and ask again.'
    , 'Don\'t count on it.'
    , 'My reply is no.'
    , 'My sources say no.'
    , 'Outlook not so good.'
    , 'Very doubtful.'
  ];


module.exports = {
    name: '8ball',
    category: `🌴 User`,
    aliases : ['8b', '🎱'],
    description: `Shows all available bot commands.`,
    run: async (client, message, args) => {

        if (!args.length){
            return message.channel.send(`Ask me anything...`, { replyTo: message})
          };
      
          const response = eightball[Math.floor(Math.random() * eightball.length)];

          const embed = new MessageEmbed()
          .setColor(ee.color)
          .setTitle("PeePad | Fortune Telling")
          .setDescription(response)
          .setFooter(ee.footertext, ee.footericon)
                
          return message.channel.send(embed);
    }
}