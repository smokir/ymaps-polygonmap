/* eslint-disable */
const MultiGeocoder = require('multi-geocoder');
const osmosis = require('osmosis');
let fs = require('fs');

// Получаем доступ к сервису геокодирования.
const geocoder = new MultiGeocoder({
    coordorder: 'latlong',
    lang: 'ru-RU'
});

const parse = new Promise((resolve, reject) => {
    const result = [];
    osmosis
        .get('http://www.vsemagazy.ru/pyaterochka/moskva.html')
        //.find('.tbl-shops td a')
        //.follow('@href')
        .find('.tbl-shops th')
        .set('location')
        .find('.tbl-shops td a')
        .set('adress')
        //.log(console.log)   // включить логи
        .data((listing) => {
            result.push(listing);
            //console.log(listing);
        })
        .done(() => {
            resolve(result);
        });
});

parse.then((data) => {
    //console.log(data);

    let result = [];

    data.forEach((el) => {
        result.push(`${el.location}, ${el.adress}`);
    });

    result = result.slice(0, 50);

    geocoder.geocode(result, {
        lang: 'en-US'
    })
        .then((res) => {
            //console.log(res);
            fs.writeFile('src/examples/data/piaterochka-m.geojson', JSON.stringify(res), () => {
                console.log('done');
            });
        });
});
