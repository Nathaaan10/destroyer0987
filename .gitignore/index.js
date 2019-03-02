const Discord = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('database.json');
const db = low(adapter);
const lcbot = new Discord.Client();

db.defaults({ histoires: [], xp: []}).write()
var prefix = "/";
lcbot.login("NDc2ODQ4NjM5MTA1MzAyNTYw.D1yVRQ.prHjNpn4ECCmRlFYyjUslDjUXF4");

lcbot.on('ready', () => {
    lcbot.user.setStatus('dnd', 'BY LEVIL')
    lcbot.user.setActivity("eu.lc-practice.com | /help", {type: "PLAYING"});
    var generalChannel = lcbot.channels.get("551094160015491083")
    generalChannel.send("```Reload..```") 
})

lcbot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "welcome").send(` **${member.user.username}** a rejoint le discord officiel, **LCPractice** ! :fire:`);
})

lcbot.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "welcome").send(` **${member.user.username}** a quitter le discord, **LCPractice**. :wave:`);
})

lcbot.on('guildMemberAdd', member => {
    var role = member.guild.roles.find("name", "Members");
    member.addRole(role)
})

lcbot.on('message', message => {
    if (message.content === "lcpractice"){
        message.reply(":arrow_right: lc-practice.fr :arrow_left: ")
    }

    if (message.content === prefix + "info"){
        var info_embed = new Discord.RichEmbed()
            .setColor("#fbfd12")
            .addField(":clipboard: Serveur:", "LCPractice")
            .addField(":mag_right: Ip:", "eu.lc-practice.com")
            .addField(":dagger: Version:", "1.7 / 1.8")
            .setFooter("Cool & Skill PvP")
        message.channel.sendEmbed(info_embed);

    }

    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .addField("en dev")
        message.channel.sendEmbed(help_embed);

    }

    if (message.content === prefix + "staff") {
        var staff_embed = new Discord.RichEmbed()
        .setColor("#12fddf")
        .setTitle(":arrow_right_hook:️ __STAFF (1/1)__ :leftwards_arrow_with_hook:")
        .addField("**ban** | unban | **kick** | say", "**mute** | unmute | **ann**")
        message.channel.send(staff_embed);

    }

    if (message.content.startsWith(prefix + "strawpolls")) {
        if(message.author.id == "340201669302157313"){
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ")
            var embed = new Discord.RichEmbed()
            .setTitle("Bonjour à tous !")
            .addField(thingToEcho, "Merci de **laisser vôtre réponse** grâce aux **réactions**.")
        message.guild.channels.find("name", "strawpolls").sendEmbed(embed)
        .then(function (message) {
            message.react("✅")
            message.react("❌")
        }).catch(function() {
        });
        }else{
            return message.reply("demande à Levil, t'as pas la perm fdp")
        }
    }
})

lcbot.on("message", message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);

    let args = message.content.split(" ").slice(1);

    if (command == "say") {
        message.delete()
        const embed = new Discord.RichEmbed()
        .setDescription(message.author.username + ": " + args.join(" "))
        .setColor("#ffffff")
        message.channel.send({embed})
    } else {

    if (command === "ann") {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            const embed = new Discord.RichEmbed()
            .setTitle("**__ANNONCE__**")
            .setColor("#ff0000")
            .setDescription(args.join(" "))
            .setTimestamp()
            message.channel.send({embed})
        } else {
        }
    }
}})

lcbot.on('message', message => {

    var msgauthor = message.author.id
 
    if(message.author.bot)return;
 
    if(!db.get("xp").find({user : msgauthor}).value()){
        db.get("xp").push({user : msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user : msgauthor}).find("xp").value();
        var userxp = Object.values(userxpdb)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 0.5}).write();
 
        if(message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setColor('#dc322f')
                .setTitle(`➧ ${message.author.username}`)
                .addField(`➧ ${xpfinal[1]} | :speaking_head:`, "➧ Speak = **XP**")
            message.channel.send({embed : xp_embed})
}}})

lcbot.on('message', message => {
    if (!message.guild) return;
  
    if (message.content.startsWith('/kick')) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.kick('Optional reason that will display in the audit logs').then(() => {
            message.reply(`vous avez kick ${user.tag} :punch:`);
          }).catch(err => {
            message.reply(`vous avez kick ${user.tag}`);
            console.error(err);
          });
        } else {
          message.reply('That user isn\'t in this guild!');
        }
      } else {
        message.reply('Vous devez mentionner un membre.');
      }
    }
  });
  
  lcbot.on('message', message => {
    if (!message.guild) return;
  
    if (message.content.startsWith('/ban')) {
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.ban({
            reason: 'They were bad!',
          }).then(() => {
            message.reply(`vous avez banni ${user.tag} :middle_finger:`);
          }).catch(err => {
            message.reply('');
            console.error(err);
          });
        } else {
          message.reply('That user isn\'t in this guild!');
        }
      } else {
        message.reply('Vous devez mentionner un membre.');
      }
    }
  });

lcbot.on('message', function(message) {
    if (message.content.includes('juif') || message.content.includes('minecraft') || message.content.includes('ntm')|| message.content.includes('kikoo')|| message.content.includes('Kikoo')|| message.content.includes('KIKOO')|| message.content.includes('ntr')) {
        message.delete()
        message.author.sendMessage('Parle bien fils de pute !ù*^!')
        message.channel.sendMessage("**!*$:^!**")
      }

})
