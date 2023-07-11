var axios = require('axios');
let birds = require('../data/bird_data.json');

// Filter out invalid bird entries
birds.birds = birds.birds.filter(bird => bird.valid !== "false");

function getBirdData(birdIndex) {
    // url encode the bird name 
    let clementsBirdName = birds.birds[birdIndex].name;
    let birdName = encodeURIComponent(clementsBirdName);

    let requestOne = axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${birdName}?redirect=true`);
    
    let requestTwo = requestOne.then(response => {
        let canonicalTitle = encodeURIComponent(response.data.titles.canonical);
        return axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=${canonicalTitle}&formatversion=2&rvprop=content&rvslots=*`);
    });

    return axios.all([requestOne, requestTwo])
    .then(axios.spread((...responses) => {
        let additionalWikiData = responses[1].data.query.pages[0].revisions[0].slots.main.content;

        return {
            wikipedia_data: responses[0].data,
            additional_wiki_data: additionalWikiData,
            clementsBirdName: clementsBirdName
        };
    }))
    .catch(errors => {
        // react on errors.
        console.log(errors);
    });
}

module.exports = getBirdData;
