import './../Polygonmap/Polygonmap';
import points from './data/bikeparking-moscow.geojson';
import polygons from './data/moscow-mo.geojson';

ymaps.ready(() => {
    // eslint-disable-next-line no-unused-vars
    const myMap = new ymaps.Map('map', {
        center: [37.64, 55.76],
        zoom: 10,
        controls: ['zoomControl', 'typeSelector']
    });

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        const polygonmap = new Polygonmap({polygons, points}, {
            balloonContent(object) {
                return `<div>
                        <h3>Велопарковки Москвы</h3>
                        <div>${object.properties.NAME}</div>
                        <div>Количество парковок: <b>${object.properties.pointsCount}</b></div>
                </div>`;
            },
            interactivity: true
        });

        polygonmap.setMap(myMap);
    });
});
