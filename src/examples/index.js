/* eslint-disable */

import './../Polygonmap/Polygonmap';
import points from './data/pyaterochka-moscow.geojson';
import pointss from './data/bikeparking-moscow.geojson';
//import pointsP from './data/piaterochka-m.geojson';
import polygons from './data/moscow-mo.geojson';

ymaps.ready(() => {
    // eslint-disable-next-line no-unused-vars
    const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl', 'typeSelector']
    });

    console.log(points);

    points.features.forEach(el => {
        console.log(el.geometry.coordinates);
        //el.geometry.coordinates = el.geometry.coordinates.reverse(); //раскоментируй чтобы реверснуть
        console.log(el.geometry.coordinates);

        const myPlacemark = new ymaps.Placemark(el.geometry.coordinates, {
            balloonContentHeader: "Балун метки",
            balloonContentBody: `${el.properties.name}<br>${el.properties.description}`,
            hintContent: `${el.properties.name}`
        });

        myMap.geoObjects.add(myPlacemark);
    });

    //console.log(points);

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        //console.log(points);
        const polygonmap = new Polygonmap({polygons, points});

        polygonmap.setMap(myMap);
    });
});
