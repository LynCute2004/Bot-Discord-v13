const { maxVol } = require('../../config.json')

module.exports = {
    name: 'volume',
    aliases: ['vol'],
    category: 'Nhạc',
    utilisation: `{prefix}volume [1-${maxVol}]`,
    voiceChannel: true,

    async run(client, message, args) {
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.channel.send(`Hiện không có nhạc nào đang phát ${message.author}... thử lại ? ❌`);

        const vol = parseInt(args[0]);

        if (!vol) return message.channel.send(`Âm lượng hiện tại: ${queue.volume} 🔊\n*Để thay đổi âm lượng vui lòng nhập một giá trị trong khoảng **1** đến **${maxVol}**.*`);

        if (queue.volume === vol) return message.channel.send(`Âm lượng bạn muốn thay đổi đã là âm lượng hiện tại ${message.author}... thử lại ? ❌`);

        if (vol < 0 || vol > maxVol) return message.channel.send(`Giá trị không đúng vui lòng nhập một giá trị trong khoảng **1** đến **${maxVol}** ${message.author}... thử lại ? ❌`);

        const success = queue.setVolume(vol);

        return message.reply(success ? `Âm lượng đã thay đổi: **${vol}**/**${maxVol}**% 🔊` : `Đã xảy ra lỗi ${message.author}... thử lại ? ❌`);
    }
}