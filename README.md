<img src="https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg" width="100%">

# ich_iel Roboter

Bot für den ich_iel Discordserver, jetzt mit 200% mehr Insidern, die sonst sowieso keiner kapiert.

## Zu Server hinzufügen

https://discordapp.com/api/oauth2/authorize?client_id=405408491969314826&permissions=68608&scope=bot

## Selber laufen lassen (manuell)

```
git clone https://github.com/TheLastZombie/ich_iel
cd ich_iel
```

Jetzt in `ich_iel.js` die Umgebungsvariablen `PREFIX` (gewünschter Prefix), `TOKEN` (Discord-Bot-Token), `GLOT_ID` (ID eines glot.io-Pastes) und `GLOT_TK` (glot.io-API-Token) einsetzen.

```
npm install
npm start
```

## Selber laufen lassen (dotenv)

```
git clone https://github.com/TheLastZombie/ich_iel
cd ich_iel
npm install
npm install dotenv
```

Jetzt  eine Datei namens `.env` mit folgendem Inhalt erstellen und die Werte entsprechend einsetzen:

> PREFIX=  
> TOKEN=  
> GLOT_ID=  
> GLOT_TK=

```
node -r dotenv/config ich_iel.js
```

## Selber laufen lassen (heroku)

```
git clone https://github.com/TheLastZombie/ich_iel
cd ich_iel
npm install
```

Jetzt eine Datei namens `.env` mit folgendem Inhalt erstellen und die Werte entsprechend einsetzen:

> PREFIX=  
> TOKEN=  
> GLOT_ID=  
> GLOT_TK=

```
heroku local
```
