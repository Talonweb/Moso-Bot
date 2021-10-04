const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');
const Discord = require("discord.js");

module.exports = {
    name: 'drop',
    category: `🎁 Giveaway`,
    aliases : ['dp'],
    description: `Drop System for giveaways`,
    run: async (client, message, args) => {
   
        let hasPerm = message.member.hasPermission('MANAGE_MESSAGES');

        if (hasPerm === false) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle('Pee Pad | Drop Error')
                .setColor(ee.wrongcolor)
                .setDescription("You need `MANAGE_MESSAGES` permissions to use this command!")
                .setFooter(ee.footertext, ee.footericon)
                .setTimestamp()
            )
        }
    
        const Embed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setTitle("Pee Pad | Drop System")
            .setDescription("Mention a channel or type **stop** to cancel the giveaway!")
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp()
        let mainMsg = await message.channel.send(Embed)
    
        let error = false;
        let msg;
        await message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 20000,
            errors: ["time"]
        }).then(collected => {
            msg = collected.first().content;
            collected.first().delete();
        }).catch((err) => {
            error = true;
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setTitle('Pee Pad | Drop Error')
                .setColor(ee.wrongcolor)
                .setDescription("You didn't mentioned a channel in time... So, I cancelled the giveaway!")
                .setFooter(ee.footertext, ee.footericon)
                .setTimestamp()
            );
            return;
        });
        if (error) return;
        msg = msg.replace('<', '').replace('#', '').replace('>', '');
        if (msg === 'stop' || msg === 'cancel') {

            let cnl = new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setTitle('Pee Pad | Drop Error')
            .setDescription("Drop Cancelled!")
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp()
            return message.channel.send(cnl);
        }
        let salon = message.guild.channels.cache.find(c => c.id === msg);
        if (!salon) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setTitle('Pee Pad | Drop Error')
                .setColor(ee.wrongcolor)
                .setDescription('I can\'t find this channel. Are you sure that I can see it?')
                .setFooter(ee.footertext, ee.footericon)
                .setTimestamp()
            )
        }
    
        const MEmbed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription("Now enter the drop prize or type **stop** to cancel the giveaway!")
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp()
        mainMsg.edit(MEmbed)
    
        error = false;
        let msg2;
        await message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 20000,
            errors: ["time"]
        }).then(collected => {
            msg2 = collected.first().content;
            collected.first().delete();
        }).catch((err) => {
            error = true;
            mainMsg.edit(
                new Discord.MessageEmbed()
                .setTitle('Pee Pad | Drop Error')
                .setColor(ee.wrongcolor)
                .setDescription("You didn't specified a prize in time... So, I cancelled the giveaway!")
                .setFooter(ee.footertext, ee.footericon)
                .setTimestamp()
            );
            return;
        });
        if (error) return;
        if (msg2 === 'stop' || msg2 === 'cancel') {
            return message.channel.send('Cancelling drop...');
        }
    
        const wMEmbed = new Discord.MessageEmbed()
            .setColor(ee.color)
            .setDescription('Drop will start in <#' + salon.id + '> in 5 seconds!')
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp()
        mainMsg.edit(wMEmbed)
    
        setTimeout(async () => {
            const DropEmbed = new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL({
                    format: 'png',
                    dynamic: 'true'
                }))
                .setColor(ee.color)
                .setDescription(`First to click on \`☕\` will win !\n\n\`🎁\`・Prize: **${msg2}**\n\`⏲️\`・Max duration: **30** minutes\n\`🏆\`・Drop by: ${message.author.tag}`)
                .setFooter(ee.footertext, ee.footericon)
                .setTimestamp()
            let m = await salon.send(DropEmbed)
            m.react('☕')
            const filtre = (reaction, user) => {
                return ['☕'].includes(reaction.emoji.name) && !user.bot;
            };
            m.awaitReactions(filtre, {
                    max: 1,
                    time: 1800000,
                    errors: ['time']
                }).then(collected => {
                    const reaction = collected.first();
                    if (reaction.emoji.name === '☕') {
                        const WinEmbed = new Discord.MessageEmbed()
                            .setAuthor(message.author.tag, message.author.displayAvatarURL({
                                format: 'png',
                                dynamic: 'true'
                            }))
                            .setColor(ee.color)
                            .setFooter(ee.footertext, ee.footericon)
                            .setTimestamp()
                            .setDescription(`Congratulations <@${reaction.users.cache.last().id}> as you were the first one to react and you win __**${msg2}**__\n\n*Please message the* **Ownership Team** *to claim your prize.*`)
                        m.edit(WinEmbed)
                    }
                })
                .catch(collected => {
                    console.log(collected);
                });
        }, 5000)
    }
}