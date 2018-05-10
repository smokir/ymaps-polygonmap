import './../Polygonmap/Polygonmap';
//import points from './data/bikeparking-moscow.geojson';
import pointsP from './data/piaterochka-m.geojson';
import polygons from './data/moscow-mo.geojson';

ymaps.ready(() => {
    // eslint-disable-next-line no-unused-vars
    const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl', 'typeSelector']
    });
    //console.log(pointsP.result);

    const points = pointsP.result;

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        const polygonmap = new Polygonmap({polygons, points});
        polygonmap.setMap(myMap);
    });
});
