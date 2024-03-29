const { 
    MessageActionRow,
    MessageSelectMenu,
    MessageButton,
    MessageEmbed,
    Collector,
    Discord,
    MessageAttachment
 } = require('discord.js');
 const os = require("os");
 const si = require("systeminformation");
 const process = require('process');
 const Clienta = require('../../index')
module.exports = {
    name: 'info',
    description: '查詢系統使用量',
    run: async (client, interaction, options) => {
        await interaction.deferReply().catch(e => { });
        function round(num) {
            var m = Number((Math.abs(num) * 100).toPrecision(15));
            return Math.round(m) / 100 * Math.sign(num);
        }
        
        function format(seconds){
            function pad(s){
              return (s < 10 ? '0' : '') + s;
            }
            var hours = Math.floor(seconds / (60*60));
            var minutes = Math.floor(seconds % (60*60) / 60);
            var seconds = Math.floor(seconds % 60);
            return pad(hours) + '小時' + pad(minutes) + '分' + pad(seconds) + "秒";
          }
          var uptime = process.uptime();
          const cpu = await si.cpu()
          const totalRam = Math.round(os.totalmem() / 1024 / 1024);
          const usedRam = Math.round((os.totalmem() -os.freemem()) / 1024 / 1024);
          let guildQueue = client.player.queues
        const obj = Object.fromEntries(guildQueue);
        const size = Object.keys(obj).length;
        const osaa = require("os-utils");
        osaa.cpuUsage((v) => {
        const embed = new MessageEmbed()
        .setTitle("<:Discord_Bot:986319391660593172> 目前系統使用量:")
        .addField("<:cpu:986062422383161424> CPU型號:\n", `\`${cpu.brand}\``)
        .addField("<:cpu:987630931932229632> CPU使用量:\n", `\`${Math.round(round(v) * 100)}\`%`, true)
        .addField("<:rammemory:986062763598155797> RAM使用量:",`\`${usedRam}\\${totalRam}\` MB`, true)
        .addField("<:chronometer:986065703369080884> 運行時間:", `\`${format(uptime)}\``,true)
        .addField("<:server:986064124209418251> 總伺服器:",`\`${Clienta.guilds.cache.size}\``,true)
        .addField(`<a:loader:982197182906134558> 播放數:`  , `\`${size}\` 播放音樂中`,true)
        .addField(`<:ping:982939700857802762> API延遲:`  , `\`${Math.round(client.ws.ping)}\` ms`,true)
        .setColor(interaction.guild.me.displayHexColor)
        .setFooter(
            `來自${interaction.user.tag}的查詢`,
            interaction.user.displayAvatarURL({
                dynamic: true
            })
        );
        interaction.followUp({embeds: [embed]})
        })
        return
    }
}