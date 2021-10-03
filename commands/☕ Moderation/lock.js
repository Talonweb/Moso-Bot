const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);

module.exports = {
    name: 'lock',
    category: `☕ Moderation`,
    aliases : [''],
    description: `Shows all available bot commands.`,
    run: async (client, message, args) => {
        if(!message.member.roles.cache.some(r=>["Admin", "Sr Admin", "Developer", "Operator", "Manager", "Owner", "*"].includes(r.name))) {
            return message.channel.send("You do not have permission to use this command!")
          };
        if(!message.mentions.channels.first()) return message.channel.send(
            new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setDescription("You didn't specify a channel to lock.")
        )
    
       await message.mentions.channels.forEach(async channel => {
    
            if(channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === false) return message.channel.send(
                new MessageEmbed()
                .setColor(ee.wrongcolor)
                .setDescription("That channel is already locked.")
            );
            try {
             await channel.updateOverwrite(message.guild.id, {
                SEND_MESSAGES: false
            });
            message.channel.send(
                new MessageEmbed()
                .setColor(ee.color)
                .setDescription(`<#${channel.id}> has been successfully locked.`)
            )
            } catch(err) {
                console.log(err);
            }
          }
        )
      }
    }