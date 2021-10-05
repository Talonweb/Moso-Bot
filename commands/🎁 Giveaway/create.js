const Discord = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const { PREFIX } = require('../../botconfig/config.json');
const ms = require('ms');
module.exports = {
    name: 'create',
    category: `🎁 Giveaway`,
    aliases : ['cr'],
    description: `Shows all available bot commands.`,
    run: async (client, message, args, db) => {
        if (args[0]) {
            if (args[5]) {
                let time = (typeof ms(args[0]) == "number" ? ms(args[0]) : (isNaN(parseFloat(args[0])) ? undefined : parseFloat(args[0]) * 1000));
                let winners = parseFloat(args[1]);
               // let serverid = args[2];
                let rolevar = args[3];
                //let messagecountvar = args[4];
                let testargs = args;
                testargs.shift();
                testargs.shift();
                testargs.shift();
                testargs.shift();
                testargs.shift();
                let prize = testargs.join(" ").split(" | ");
                db.set(`prize_${message.guild.id}`, prize);
                if (!time) {
                    message.channel.send(
                        new Discord.MessageEmbed()
                            .setColor(ee.color)
                            .setDescription(`The **first** argument must be a number.`)
                    );
                } else {
                    if (time < 5000 || time > 2678400000) {
                        message.channel.send(
                            new Discord.MessageEmbed()
                                .setColor(ee.color)
                                .setDescription(`The **first** argument cannot be less than 5 seconds or greater than 31 days.`)
                        );
                    } else {
                        if (isNaN(winners)) {
                            message.channel.send(
                                new Discord.MessageEmbed()
                                    .setColor(ee.color)
                                    .setDescription(`The **second** argument must be a number.`)
                            );
                        } else {
                            if (winners < 1 || winners > 10) {
                                message.channel.send(
                                    new Discord.MessageEmbed()
                                        .setColor(ee.color)
                                        .setDescription(`The **second** argument cannot be less than 1 or greater than 10 winners.`)
                                );
                            } else {
                                let requirements = [];
                                if (rolevar !== "none") {
                                    let role = message.guild.roles.cache.get(rolevar);
                                    if (!role) {
                                        message.channel.send(
                                            new Discord.MessageEmbed()
                                                .setColor(ee.color)
                                                .setDescription(`Could not get the role id on the **fourth** argument.`)
                                        );
                                        return;
                                    } else {
                                        requirements.push(`\`🚧\` ・ Role required: <@&${role.id}>`);
                                    }
                                };
                                message.delete();
                                let embed = new Discord.MessageEmbed()
                                    .setTitle(prize[0])
                                    .setColor(ee.color)
                                    .setDescription(`React 📮 to join the giveaway.\n\n\`🧭\` ・ Time: **${ms(time, {long:true})}**\n\`👑\` ・ Winners: **${winners}**\n\`🎒\` ・ Hosted By: ${message.author}`)
                                    .addField("Requirements", (await requirements).length == 0 ? "None!" : requirements.join("\n") + (!prize[1] ? "" : "\n" + prize.join(" | ").slice(prize[0].length + 3)))
                                    .setFooter("There could have been up to " + winners + " winners.", client.user.displayAvatarURL())
                                    .setTimestamp()
                                message.channel.send(embed).then(msg => {
                                    msg.react("📮");
                                    //let giveaway = message.guild.roles.cache.find(x => x.name === 'Giveaway');
                               // message.channel.send(`${giveaway}`).then(x => x.delete({timeout: 2000}))
                               let filter = async (reaction, user) => {
                                if (user.id !== client.user.id) {
                                    if (reaction.emoji.name == "📮") {
                                        let userreacts = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
                                        if (rolevar !== "none") {
                                            let role = message.guild.roles.cache.get(rolevar);
                                            if (role) {
                                                if (!message.guild.members.cache.get(user.id).roles.cache.has(role.id)) {
                                                    for (let reaction of userreacts.values()) {
                                                        await reaction.users.remove(user.id);
                                                    }
                                                }
                                            }
                                        }
                                    };
                                };
                            };
                            msg.awaitReactions(filter, { 
                                max: null, 
                                time: time 
                            }).then(async collected => {
                            }).catch(err => {});
                            setTimeout(
                                async function() {
                                    // Reroll breaks before of:
                                    
                                    let msg2 = await message.channel.messages.fetch(msg.id);
                                    if (await msg2) {
                                        if (msg2.embeds[0].description == "Giveaway is over.") return;
                                        let react = await msg2.reactions.cache.get("📮").users ? (await msg2.reactions.cache.get("📮").users.fetch()).array().filter(user => user.id !== client.user.id) : [];
                                        if (react.length == 0) {
                                            await msg2.edit(
                                                new Discord.MessageEmbed()
                                                    .setTitle(prize[0])
                                                    .setDescription(`Giveaway is over.`)
                                                    .setColor(ee.color)
                                                    .addField("Winners", "No winners.")
                                                    .addField("Requirements", (await requirements).length == 0 ? "None!" : requirements.join("\n"))
                                                    .setFooter("There could have been up to " + winners + " winners.")
                                            )
                                            let embeee = new Discord.MessageEmbed()
                                            .setColor(ee.color)
                                            .setTitle("Pee Pad | Giveaway System")
                                            .setDescription(`The giveaway for **${prize[0]}** has ended. Below are our winners!` + (users.length == 0 ? " No winners." : "\n・ " + users.join("\n・ ")))
                                            .setFooter(ee.footertext, ee.footericon)
                                            .setTimestamp()
                                            message.channel.send(embeee)     
                                            //message.channel.send("<:go:823783068577169438> **The giveaway has ended.** Our winners are: No winners.")
                                        } else {
                                            let users = [];
                                            for (var i = 0, len = winners; i < len; i++) {
                                                let random = Math.floor(Math.random() * react.length);
                                                if (react.length == 0) {
                                                    i == winners;
                                                } else {
                                                    let id = react[random].id;
                                                    if (users.includes(id)) {
                                                        i--
                                                    } else {
                                                        let pass = true;
                                                        if (!message.guild.members.cache.get(id)) pass = false;
                                                        if (rolevar !== "none") {
                                                            let role = message.guild.roles.cache.get(rolevar);
                                                            if (role) {
                                                                if (!message.guild.members.cache.get(id).roles.cache.has(role.id)) {
                                                                    pass = false
                                                                }
                                                            }
                                                        }
                                                        if (pass == true) {
                                                            users.push("<@" + id + ">");
                                                        } else {
                                                            i--;
                                                        }
                                                        delete react[random];
                                                        react = react.filter(function (el) {
                                                            return el != null;
                                                        });
                                                    }   
                                                }
                                            };
                                            await msg2.edit(
                                                new Discord.MessageEmbed()
                                                    .setTitle(prize[0])
                                                    .setDescription(`Giveaway is over.`)
                                                    .setColor(ee.color)
                                                    .addField("Winners", users.length !== 0 ? users.join("\n") : "No winners.")
                                                    .addField("Requirements", (await requirements).length == 0 ? "None!" : requirements.join("\n"))
                                                    .setFooter("There could have been up to " + winners + " winners.")
                                                    .setTimestamp()
                                            )
                                            let embee = new Discord.MessageEmbed()
                                            .setColor(ee.color)
                                            .setTitle("Pee Pad | Giveaway System")
                                            .setDescription(`The giveaway for **${prize[0]}** has ended. Below are our winners!` + (users.length == 0 ? " No winners." : "\n・ " + users.join("\n・ ")))
                                            .setFooter(ee.footertext, ee.footericon)
                                            .setTimestamp()
                                            message.channel.send(embee)                                            }
                                    }
                                }
                            , time);
                        }).catch(err => {
                        });
                    };
                };
            };
        };
    } else {
        message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Pee Pad | Giveaway System')
                .setColor(ee.wrongcolor)
                .setDescription(`Incorrect usage. Please use \`.create <time> <winners> <server id or "none"> <role id or "none"> <message count number or "none"> <prize>\` instead.`)
                .setFooter(ee.footertext, ee.footericon)
                .setTimestamp()
        );
    };
} else {
    message.channel.send(
        new Discord.MessageEmbed()
            .setTitle('Pee Pad | Giveaway System')
            .setColor(ee.wrongcolor)
            .setDescription(`In order to use this command, you must run the command \`.create <time> <winners> <server id or "none"> <role id or "none"> <message count number or "none"> <prize>\`.`)
            .setFooter(ee.footertext, ee.footericon)
            .setTimestamp()
    );
};
    }
}