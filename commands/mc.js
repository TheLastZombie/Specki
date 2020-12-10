if (args && args != '') {
  request('https://api.mojang.com/users/profiles/minecraft/' + args.join(' '), function (error, response, body) {
    if (error || !JSON.parse(body).id) {
      message.react('❎')
    } else {
      message.channel.send({
        embed: {
          title: 'Minecraft Avatar of ' + args.join(' '),
          description: '[Avatar](https://mc-heads.net/combo/' + JSON.parse(body).id + ')\n[Body + Overlay (2D)](https://visage.surgeplay.com/frontfull/' + JSON.parse(body).id + ')\n[Body + Overlay (3D 1)](https://crafatar.com/renders/body/' + JSON.parse(body).id + '?overlay)\n[Body + Overlay (3D 2)](https://visage.surgeplay.com/full/' + JSON.parse(body).id + ')\n[Body + Overlay (3D 3)](https://mc-heads.net/body/' + JSON.parse(body).id + ')\n[Body (3D)](https://crafatar.com/renders/body/' + JSON.parse(body).id + ')\n[Bust + Overlay (2D)](https://minotar.net/armor/bust/' + JSON.parse(body).id + ')\n[Bust (2D)](https://minotar.net/bust/' + JSON.parse(body).id + ')\n[Bust + Overlay (3D)](https://visage.surgeplay.com/bust/' + JSON.parse(body).id + ')\n[Cape](https://crafatar.com/capes/' + JSON.parse(body).id + ')\n[Front](https://visage.surgeplay.com/front/' + JSON.parse(body).id + ')\n[Head + Overlay (2D)](https://crafatar.com/avatars/' + JSON.parse(body).id + '?overlay)\n[Head (2D)](https://crafatar.com/avatars/' + JSON.parse(body).id + ')\n[Head + Overlay (3D 1)](https://visage.surgeplay.com/head/' + JSON.parse(body).id + ')\n[Head + Overlay (3D 2)](https://cravatar.eu/helmhead/' + JSON.parse(body).id + ')\n[Head + Overlay (3D 3)](https://crafatar.com/renders/head/' + JSON.parse(body).id + '?overlay)\n[Head + Overlay (3D 4)](https://mc-heads.net/head/' + JSON.parse(body).id + ')\n[Head (3D 1)](https://crafatar.com/renders/head/' + JSON.parse(body).id + ')\n[Head (3D 2)](https://minotar.net/cube/' + JSON.parse(body).id + ')\n[Head (3D 3)](https://cravatar.eu/head/' + JSON.parse(body).id + ')\n[Skin](https://crafatar.com/skins/' + JSON.parse(body).id + ')',
          thumbnail: {
            url: 'https://crafatar.com/renders/body/' + JSON.parse(body).id + '?overlay'
          },
          footer: {
            text: 'APIs provided by mc-heads.net, visage.surgeplay.com, crafatar.com, minotar.net and cravatar.eu.'
          }
        }
      })
    };
  })
} else {
  message.react('❎')
};
