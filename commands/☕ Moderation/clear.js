const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');

module.exports = {
    name: "clear",
    category: `☕ Moderation`,
    aliases : ['cr'],
    description: "Clear all messages up to 14 days",
    run: async (client, message, args) => {
      let member = message.author;
      if(!message.member.roles.cache.some(r=>["Admin", "Sr Admin", "Developer", "Operator", "Manager", "Owner", "*"].includes(r.name))) {
        return message.channel.send("You do not have permission to use this command!")
      };
        
          message.delete()
          const user = message.mentions.users.first();
          // Parse Amount
          const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
          if (!amount) return message.reply((new MessageEmbed().setColor(ee.color).setTitle(`${emoji.msg.ERROR} | Error`).setDescription('Must specify an amount to delete!')).setFooter(ee.footertext, ee.footericon).setTimestamp());
          if (!amount && !user) return message.reply(new MessageEmbed().setColor(ee.color).setTitle(`${emoji.msg.ERROR} | Error`).setDescription('Must specify a user and amount, or just an amount, of messages to purge!').setFooter(ee.footertext, ee.footericon).setTimestamp());
          // Fetch 100 messages (will be filtered and lowered up to max amount requested)
          message.channel.messages.fetch({
          limit: 100,
          }).then((messages) => {
          if (user) {
          const filterBy = user ? user.id : Client.user.id;
          messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
          }
          message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
          const cl = new MessageEmbed()
          .setColor(ee.color)
          .setDescription(`Cleared **${amount}** of messages in **${message.channel.name}**`)
          .setFooter(ee.footertext, ee.footericon)
          .setTimestamp();
        
          message.channel.send(cl).then(msg => msg.delete({ timeout: 5000, reason: '' }));
       })
    }
}