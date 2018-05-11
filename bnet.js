const bnet = {};

bnet.urlRender = img => `https://render-us.worldofwarcraft.com/character/${img}`;
bnet.urlChar = (realm,name,fields) => `https://us.api.battle.net/wow/character/${realm}/${name}?locale=en_US&apikey=${account.apiKey}&fields=${fields}`;
bnet.urlData = dataType => `https://us.api.battle.net/wow/data/character/${dataType}?locale=en_US&apikey=${account.apiKey}`;

util.fetchData(bnet.urlData('classes'), result => bnet.classes = result.classes);
util.fetchData(bnet.urlData('races'), result => bnet.races = result.races);

bnet.fieldsAll = 'achievements,feed,guild,hunterPets,items,mounts,pets,professions,progression,quests,reputation,statistics,stats,talents,titles,audit';
bnet.fieldsProf = 'guild,items,professions';

bnet.getCharacters = async (realmCharacters, fields) => {
    const characters = [];
    const promises = [];
    realmCharacters.forEach(realm => {
        realm.characters.forEach(character => {
            promises.push((async url => {
                const dataObj = await util.fetchData(url);
                dataObj.classObj = bnet.classes.find(c => c.id == dataObj.class);
                dataObj.raceObj  = bnet.races.find(r => r.id == dataObj.race);
                dataObj.imageSrc = bnet.urlRender(dataObj.thumbnail);
                dataObj.selected = false;
                characters.push(dataObj);
            })(bnet.urlChar(realm.name,character,fields)));
        });
    });
    await Promise.all(promises);
    return characters;
};
