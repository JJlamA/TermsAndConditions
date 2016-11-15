var Discord = require("discord.js");
var bot = new Discord.Client();

bot.on("guildMemberAdd", (member) => {
    var guild = member.guild;
    guild.channels.get(guild.id).sendMessage(member.user.username + " is waiting in #doormat!") //Change #doormat to your channel name
});


bot.on("guildMemberUpdate", (oldMember, newMember) => {
    if(oldMember.roles.size != newMember.roles.size) {
    	var guild = oldMember.guild;
        let newRoles = newMember.roles.has(guild.roles.find(role => role.name == "Accepted Terms" )) && !oldMember.roles.has(bot.roles.find( role => role.name == "Role name here" )) // gets the new role(s)
        console.log("Please welcome " + oldMember.user.username + " to the server!");
    }
});

// bot.on("guildMemberRemove", (guild, member) => {
//     guild.channels.get(guild.id).sendMessage("Goodbye," + member + "... You will be missed!") //This didn't work ;-;
// });

bot.on("message", msg => {
    var guild = msg.channel.guild;
    if (guild) {
	    var member = guild.member(msg.author);
	    if (msg.channel.id == (guild.channels.find(channel => channel.name == "doormat")).id) { //This can be changed to fit the channel you want
	    	if (msg.content.toLowerCase().startsWith("accepted rules")) {
		        if (member.roles.exists("name", "Accepted Terms")) {
		        	msg.delete()
		            member.sendMessage("You already accepted the terms and conditions!")
		            return;
		        }
		        else {
		        	member.addRole(guild.roles.find(role => role.name == "Accepted Terms" ).id);
		        	bot.channels.get(guild.channels.find(channel => channel.name == "general" ).id).sendMessage("Hey, @everyone! "member + " has just accepted the terms and conditions!"); //Same here
		        	member.sendMessage("Thank you for accepting the terms and conditions! Be sure to follow the rules and be respectful!")
		        	msg.delete()
		        }
		    }
		    else {
		    	msg.delete()
		    }	
	    }
	}    
});

bot.on('ready', () => {
  console.log('Terms and Conditions Bot ready for action!');
  bot.user.setGame("Made by JJlamA");
});

bot.login("Token here, dummy!");
