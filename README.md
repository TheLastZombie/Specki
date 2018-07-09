<img src="https://forthebadge.com/images/badges/you-didnt-ask-for-this.svg" width="100%">

# ich_iel Roboter

Bot für den ich_iel Discordserver, jetzt mit 200% mehr Insidern, die sonst sowieso keiner kapiert.

## Zu Server hinzufügen

https://discordapp.com/api/oauth2/authorize?client_id=405408491969314826&permissions=68608&scope=bot

## Selber laufen lassen

```bash
git clone https://github.com/TheLastZombie/ich_iel
cd ich_iel
sed -i 's/process\.env\.PREFIX/"[PREFX]"/g' ich_iel.js # [PREFIX] mit dem gewünschten Prefix ersetzen
sed -i 's/process\.env\.TOKEN/"[TOKEN]"/g' ich_iel.js # [TOKEN] mit dem Discord-Bot-Token ersetzen
sed -i 's/process\.env\.GLOT_ID/"[GLOT_ID]"/g' ich_iel.js # [GLOT_ID] mit der ID eines glot.io-Pastes ersetzen
sed -i 's/process\.env\.GLOT_TK/"[GLOT_TK]"/g' ich_iel.js # [GLOT_TK] mit dem glot.io-API-Token ersetzen
npm install
npm start
```
