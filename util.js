const util = {};

util.fetchData = async (url, callback) => {
    const resp = await fetch(url);
    const data = await resp.json();
    if(callback) callback(data);
    else return data;
};

