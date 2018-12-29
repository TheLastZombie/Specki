<img src="https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg" width="100%">

# ich_iel Roboter

Bot for the German ich_iel Discord server, now with 200% more inside jokes!

It is home to many original commands so awesome that [another Discord bot](https://github.com/M3IY0U/Meiyounaise) copies them.

Below, you can find everything you usually need to get started. For advanced documentation, visit the [wiki](../../wiki)!

## Inviting to your Server

<details><summary>Invite (Neccessary)</summary>
<p>

https://discordapp.com/oauth2/authorize?client_id=405408491969314826&permissions=70372416&scope=bot

</p>
</details>

<details><summary>Invite (Future-Proof)</summary>
<p>

https://discordapp.com/oauth2/authorize?client_id=405408491969314826&permissions=8&scope=bot

</p>
</details>

<details><summary>Support</summary>
<p>

https://discord.gg/VmPbt3B

</p>
</details>

## Running on your Machine

<details><summary>Manually</summary>
<p>

```
git clone https://github.com/TheLastZombie/ich_iel
cd ich_iel
npm install
```

In `ich_iel.js`, replace the enviroment variables `PREFIX` (desired prefix), `TOKEN` (Discord bot token), `GLOT_ID` (glot.io paste ID), `GLOT_TK` (glot.io API token), `OMDB_TK` (omdbapi.com API token) and `YNDX_TK` (Yandex API token).

```
npm start
```

</p>
</details>

<details><summary>dotenv</summary>
<p>

```
git clone https://github.com/TheLastZombie/ich_iel
cd ich_iel
npm install
```

In `.env`, replace the enviroment variables `PREFIX` (desired prefix), `TOKEN` (Discord bot token), `GLOT_ID` (glot.io paste ID), `GLOT_TK` (glot.io API token), `OMDB_TK` (omdbapi.com API token) and `YNDX_TK` (Yandex API token).

```
node -r dotenv/config ich_iel.js
```

</p>
</details>

<details><summary>Heroku</summary>
<p>

```
git clone https://github.com/TheLastZombie/ich_iel
cd ich_iel
npm install
```

In `.env`, replace the enviroment variables `PREFIX` (desired prefix), `TOKEN` (Discord bot token), `GLOT_ID` (glot.io paste ID), `GLOT_TK` (glot.io API token), `OMDB_TK` (omdbapi.com API token) and `YNDX_TK` (Yandex API token).

```
heroku local
```

</p>
</details>
