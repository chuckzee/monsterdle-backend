let monsters = require('../data/monster_data.json');
const axios = require('axios');
const sharp = require('sharp');

let cache = {
    date: null,
    imageData: null,
};

function clearCache() {
  cache.date = null;
  cache.imageData = null;
}

// Calculate the number of ms until midnight
const now = new Date();
const night = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() + 1, // the next day
  0, 0, 0 // midnight
);
const msUntilMidnight = night.getTime() - now.getTime();

// Clear cache at next midnight and every 24 hours after that
setTimeout(() => {
  clearCache();
  setInterval(clearCache, 24 * 60 * 60 * 1000);
}, msUntilMidnight);

async function getImageData(url) {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in 'yyyy-mm-dd' format
  
    if (cache.date === today) {
      // If the cache is up-to-date, return the cached image data
      console.log("cache hit");
      return cache.imageData;
    } else {
      // If the cache is not up-to-date, fetch the image
      const response = await axios.get(url, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');
      const base64Image = imageBuffer.toString('base64');
    
      // Update the cache
      cache.date = today;
      cache.imageData = base64Image;
  
      return base64Image;
    }
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
                "challenge": monster.cr,
            };
            break;
        case 3:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "size": monster.size,
                "challenge": monster.cr,
                "ac": monster.ac,
                "hp": monster.hp,
            };
            break;
        case 4:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "size": monster.size,
                "challenge": monster.cr,
                "alignment": monster.alignment,
                "ac": monster.ac,
                "hp": monster.hp,
                "source": monster.source,
            };
            break;
        case 5:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "size": monster.size,
                "challenge": monster.cr,
                "alignment": monster.alignment,
                "ac": monster.ac,
                "hp": monster.hp,
                "movement": monster.movement,
                "legendary": monster.legendary,
                "source": monster.source,
            };
            break;
        case 6:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "size": monster.size,
                "type": monster.type,
                "challenge": monster.cr,
                "alignment": monster.alignment,
                "ac": monster.ac,
                "hp": monster.hp,
                "movement": monster.movement,
                "legendary": monster.legendary,
                "source": monster.source,
            };
            break;
        default:
            response = {
                "image": `data:image/jpeg;base64,${monsterImage}`,
                "name": monster.name,
                "size": monster.size,
                "type": monster.type,
                "challenge": monster.cr,
                "alignment": monster.alignment,
                "ac": monster.ac,
                "hp": monster.hp,
                "movement": monster.movement,
                "legendary": monster.legendary,
                "source": monster.source,
            };
            break;
    }

    return response;
}

module.exports = returnMonsterData;
