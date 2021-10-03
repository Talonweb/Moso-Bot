const { MessageEmbed } = require(`discord.js`);
const ee = require(`../../botconfig/embed.json`);
const emoji = require(`../../botconfig/emojis.json`);
const config = require('../../botconfig/config.json');
//const config = require('../../botconfig/config.json');
const { readdirSync } = require("fs");

module.exports = {
    name: 'help',
    category: `🌴 User`,
    aliases : [''],
    description: `Shows all available bot commands.`,
    run: async (client, message, args) => {

  if (!args[0]) {
    let categories = [];

    readdirSync("./commands/").forEach((dir) => {
      const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
        file.endsWith(".js")
      );

      const cmds = commands.map((command) => {
        let file = require(`../../commands/${dir}/${command}`);

        if (!file.name) return "No command name.";

        let name = file.name.replace(".js", "");

        return `\`${name}\``;
      });

      let data = new Object();

      data = {
        name: dir.toUpperCase(), inline: true,
        value: cmds.length === 0 ? "In progress." : cmds.join(", "),
      };

      categories.push(data);
    });

    const embed = new MessageEmbed()
      .setTitle(`PeePad's full list of commands!`)
      .addFields(categories)
      .setDescription(`You may get the full detail of each command by typing \`.help <command>\`.`)
      .setFooter(ee.footertext, ee.footericon)
      .setTimestamp()
      .setColor(ee.color);
    return message.channel.send(embed);
  } else {
    const command =
      client.commands.get(args[0].toLowerCase()) ||
      client.commands.find(
        (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
      );

    if (!command) {
      const embed = new MessageEmbed()
        .setTitle(`Invalid command! Use \`${config.prefix}help\` for all of my commands!`)
        .setFooter(ee.footertext, ee.footericon)
        .setColor(ee.color);
      return message.channel.send(embed);
    }

    const embed = new MessageEmbed()
      .setTitle("PeePad | Command Details")
      .addField("PREFIX:", `\`${config.prefix}\``, true)
      .addField(
        "COMMAND:",
        command.name ? `\`${command.name}\`` : "No name for this command."
      , true)
      .addField(
        "ALIASES:",
        command.aliases
          ? `\`${command.aliases.join("` `")}\``
          : "No aliases for this command."
      , true)
      .addField(
        "USAGE:",
        command.usage
          ? `\`${config.prefix}${command.name} ${command.usage}\``
          : `\`${config.prefix}${command.name}\``
      , true)
      .addField(
        "DESCRIPTION:",
        command.description
          ? command.description
          : "\`No description for this command.\`"
      , true)
      .setFooter(ee.footertext, ee.footericon)
      .setTimestamp()
      .setColor(ee.color);
    return message.channel.send(embed);
  }
},
    }