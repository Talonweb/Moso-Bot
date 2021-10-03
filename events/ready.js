const Discord = require("discord.js");
const http = require('http');
const express = require('express');
const { MessageEmbed } = require('discord.js');
const app = express();
const Nuggies = require('nuggies');
const { MongoClient } = require('mongodb');
module.exports.run = async (client, message) => {

  //Nuggies.giveaways.startAgain(client);
    game(client);
    client.setInterval(() => {
      game(client);
    }, 9000);
    function game(client) {
      let games = [
        //[ `☕ ${client.guilds.cache.size} guilds`, "WATCHING" ],
        [ `${client.users.cache.size} Members`, "WATCHING" ],
        //[ `We gaming bois`, "GAME" ],

        //[ "💕 𝙖𝙩𝙧𝙞𝙪𝙢", "LISTENING"],
       // [ "❓ stuck? Use >help for more information", "PLAYING"],
        //[ "💕 Supported and Loved!", "WATCHING" ],
        [ "twitch.tv/mosleytw", "WATCHING" ],
        [ "tiktok.com/mosleytw", "WATCHING" ],
      ];
    
      let array = games[Math.floor(Math.random() * games.length)];
      client.user.setActivity(`${array[0]}`, { type: array[1] }).catch(() => {});
    }
  }
