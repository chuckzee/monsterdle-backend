let monsters = require('../data/monster_data.json');

function returnMonsterData(monsterId, tipNumber) {
    let monster = monsters.monsters[monsterId];
    console.log(monsters.monsters[monsterId]);
    let response = {};

    switch(tipNumber) {
        case 0:
            response = {
                "image": monster.image,
            };
            break;
        case 1:
            response = {
                "image": monster.image,
                "size": monster.size,
            };
            break;
        case 2:
            response = {
                "image": monster.image,
                "size": monster.size,
                "challenge": monster.challenge,
            };
            break;
        case 3:
            response = {
                "image": monster.image,
                "size": monster.size,
                "challenge": monster.challenge,
                "alignment": monster.alignment,
            };
            break;
        case 4:
            response = {
                "image": monster.image,
                "size": monster.size,
                "challenge": monster.challenge,
                "alignment": monster.alignment,
                "ac": monster.ac,
                "speed": monster.speed,
            };
            break;
        case 5:
            response = {
                "image": monster.image,
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
                "image": monster.image,
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
        case 7:
            response = monster;
            break;
        default:
            response = {};
    }

    return response;
}

module.exports = returnMonsterData;
