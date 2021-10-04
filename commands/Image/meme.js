const {MessageEmbed} = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'meme',
    category: 'Image',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Vui lòng chờ...');
        
        let body = await fetch (`https://api.popcat.xyz/meme`)
        const data = await body.json()
        if (!data) return message.channel.send('Lỗi vui lòng thử lại sau');
            let memeEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setAuthor(`Meme`, message.guild.iconURL)
                .setDescription(data.title)
                .setURL(data.image)
                .setImage(data.image)
                .setTimestamp()
                .setFooter(`Bot: Duwc510_ by hongduccodedao`, client.user.displayAvatarURL)

        msg.edit({ content:'\u200b',embeds: [memeEmbed] });
    }
}