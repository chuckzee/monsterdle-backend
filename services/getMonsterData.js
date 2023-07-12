let monsters = require('../data/monster_data.json');
const axios = require('axios');
const sharp = require('sharp');

async function getImageData(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  const imageBuffer = Buffer.from(response.data, 'binary');
  return imageBuffer.toString('base64');
}

async function returnMonsterData(monsterId, tipNumber) {
    let monster = monsters.monsters[monsterId];
    console.log(monsters.monsters[monsterId]);
    let response = {};
    const monsterImage = await getImageData(monster.image);

    switch(tipNumber) {
        case 0:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
            };
            break;
        case 1:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "size": monster.size,
            };
            break;
        case 2:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "size": monster.size,
                "challenge": monster.challenge,
            };
            break;
        case 3:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "size": monster.size,
                "challenge": monster.challenge,
                "alignment": monster.alignment,
            };
            break;
        case 4:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "size": monster.size,
                "challenge": monster.challenge,
                "alignment": monster.alignment,
                "ac": monster.ac,
                "speed": monster.speed,
            };
            break;
        case 5:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "size": monster.size,
                "challenge": monster.challenge,
                "alignment": monster.alignment,
                "ac": monster.ac,
                "speed": monster.speed,
                "str": monster.str,
                "dex": monster.dex,
                "con": monster.con,
                "int": monster.int,
                "wis": monster.wis,
                "cha": monster.cha,
                "senses": monster.senses,
                "languages": monster.languages,
            };
            break;
        case 6:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "size": monster.size,
                "challenge": monster.challenge,
                "alignment": monster.alignment,
                "ac": monster.ac,
                "speed": monster.speed,
                "str": monster.str,
                "dex": monster.dex,
                "con": monster.con,
                "int": monster.int,
                "wis": monster.wis,
                "cha": monster.cha,
                "senses": monster.senses,
                "languages": monster.languages,
                "source": monster.source,
                "additional": monster.additional,
            };
            break;
        default:
            response = {
                "name": monster.name,
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "size": monster.size,
                "challenge": monster.challenge,
                "alignment": monster.alignment,
                "ac": monster.ac,
                "speed": monster.speed,
                "str": monster.str,
                "dex": monster.dex,
                "con": monster.con,
                "int": monster.int,
                "wis": monster.wis,
                "cha": monster.cha,
                "senses": monster.senses,
                "languages": monster.languages,
                "source": monster.source,
                "additional": monster.additional,
            };
            break;
    }

    return response;
}

module.exports = returnMonsterData;
