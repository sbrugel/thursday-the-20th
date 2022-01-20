import DiscordJS, { Intents, MessageEmbed, TextChannel } from 'discord.js'
import cron from 'cron'
import 'dotenv/config'

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.login(process.env.TOKEN)

client.on('ready', async () => {
    console.log('Ready!');
    main();
    let job = new cron.CronJob('00 00 00 * * *', main);
    job.start();
})

function main() {
    const d = new Date();
    if (d.getDay() === 4 && d.getDate() === 20) {
        const chan = client.channels.cache.get(process.env.CHANNEL_ID as string) as TextChannel
        const embed = new MessageEmbed()
            .setTitle(`Today is Thursday the 20th!`)
            .setImage('https://i.kym-cdn.com/entries/icons/original/000/022/767/7gC3Knz.jpg')
        chan.send({ embeds: [embed]  });
    }
}

