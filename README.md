<img src="https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg" width="100%">

# ich_iel Roboter

Bot für den ich_iel Discordserver, jetzt mit 200% mehr Insidern, die sonst sowieso keiner kapiert.

## Zu Server hinzufügen

<details><summary>Invite</summary>
<p>

https://discordapp.com/oauth2/authorize?client_id=405408491969314826&permissions=67226688&scope=bot

</p>
</details>

<details><summary>Support</summary>
<p>

https://discord.gg/VmPbt3B

</p>
</details>

## Selber laufen lassen

<details><summary>Manuell</summary>
<p>

```
git clone https://github.com/TheLastZombie/ich_iel
cd ich_iel
npm install
```

Jetzt in `ich_iel.js` die Umgebungsvariablen `PREFIX` (gewünschter Prefix), `TOKEN` (Discord-Bot-Token), `GLOT_ID` (ID eines glot.io-Pastes) und `GLOT_TK` (glot.io-API-Token) einsetzen.

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

Jetzt in `.env` die Umgebungsvariablen `PREFIX` (gewünschter Prefix), `TOKEN` (Discord-Bot-Token), `GLOT_ID` (ID eines glot.io-Pastes) und `GLOT_TK` (glot.io-API-Token) einsetzen.

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

Jetzt in `.env` die Umgebungsvariablen `PREFIX` (gewünschter Prefix), `TOKEN` (Discord-Bot-Token), `GLOT_ID` (ID eines glot.io-Pastes) und `GLOT_TK` (glot.io-API-Token) einsetzen.

```
heroku local
```

</p>
</details>
