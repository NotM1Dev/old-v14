const { DisTube } = require('distube');
const { EmbedBuilder } = require('discord.js');

const client = require('../index');
const player = new DisTube(client, {
    emitAddSongWhenCreatingQueue: false,
    emitNewSongOnly: true,
    leaveOnFinish: true,
    leaveOnStop: true
});

player.on('playSong', (queue, song) => {
    const uploader = song.uploader.url
        ? `[${song.uploader.name}](${song.uploader.url})`
        : song.uploader.name;

    queue.textChannel.send({
        embeds: [
            new EmbedBuilder()
                .setTitle(song.name).setURL(song.url)
                .setTimestamp()
                .setFooter({ text: 'Now playing' })
                .setColor('Green')
                .setThumbnail(song.thumbnail || null)
                .setAuthor({ name: song.user.username, iconURL: song.user.displayAvatarURL() })
                .addFields(
                    { name: 'Duration', value: song.formattedDuration.toString(), inline: true },
                    { name: 'Channel', value: queue.voiceChannel.toString(), inline: true },
                    { name: 'Uploader', value: uploader, inline: true }
                )
        ]
    });
});

player.on('addSong', (queue, song) => {
    queue.textChannel.send({
        embeds: [
            new EmbedBuilder()
                .setTitle(song.name).setURL(song.url)
                .setThumbnail(song.thumbnail || null)
                .setAuthor({ name: song.user.username, iconURL: song.user.displayAvatarURL() })
                .setColor('Blue')
                .setFooter({ text: 'Added to queue' }).setTimestamp()
        ]
    });
});

player.on('finish', (queue) => {
    queue.textChannel.send({
        embeds: [
            new EmbedBuilder()
                .setTitle('Queue finished')
                .setDescription('No more songs in queue.')
                .setColor('Red')
        ]
    });
});

player.on('error', (channel, error) => {
    if (channel) channel.send('An error occured!');
    else console.error(error);
});

module.exports = player;