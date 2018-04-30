import './../Polygonmap/Polygonmap';
import dataPolygons from './data/moscow-mo.geojson';

ymaps.ready(() => {
    // eslint-disable-next-line no-unused-vars
    const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 11,
        controls: ['zoomControl', 'typeSelector']
    });

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        const polygonmap = new Polygonmap(null, dataPolygons);

        polygonmap.setMap(myMap);
    });
});
