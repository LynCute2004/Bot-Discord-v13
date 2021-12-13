const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const { token } = require('../../config.json')

module.exports = {
    name: 'youtube_dev',
    category: 'Giải_trí_cùng_nhau',

    run: async (client, message, args) => {
        const channel = message.member.voice.channel

        if (!channel) return message.channel.send(
            new MessageEmbed()
                .setDescription("Vui lòng kết nối kênh thoại !")
                .setColor("#ff0000")
        )

        fetch(`https://discord.com/api/v9/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "880218832743055411",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if (!invite.code) return message.channel.send(
                new MessageEmbed()
                    .setDescription("I was unable to start a yt together session.")
                    .setColor("#ff0000")
            )

            const ytembed = new MessageEmbed()
                .setColor('GREEN')
                .setTitle(`🚩 Youtube Together Dev:`)
                .setDescription(`\nDùng **Youtube Together Dev** giúp bạn có thể xem Youtube cùng bạn bè trong 🔊 Kênh thoại. Click vào *Tham gia Youtube Together Dev* để tham gia.\n[\n**Tham gia Youtube Together Dev**](https://discord.gg/${invite.code})`)
                .setFooter(`⚠️ Youtube Together Dev chỉ hoạt động trên desktop.`)
            message.channel.send({ embeds: [ytembed] })
        })
    }
}