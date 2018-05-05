import './../Polygonmap/Polygonmap';
import points from './data/bikeparking-moscow.geojson';
import hexagonGrid from '../Polygonmap/utils/hexagonGrid';

ymaps.ready(() => {
    const el = document.getElementById('map');
    const myMap = new ymaps.Map(el, {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl', 'typeSelector']
    });

    const R = 20;

    const zoom = myMap.getZoom();

    const rect = el.getBoundingClientRect();
    const center = myMap.getGlobalPixelCenter();

    const offsetLeft = center[0] - (rect.width / 2);
    const offsetTop = center[1] - (rect.height / 2);

    const polygons = hexagonGrid(myMap, zoom, R, offsetLeft, offsetTop, rect.width, rect.height);

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        const polygonmap = new Polygonmap({polygons, points});
        polygonmap.setMap(myMap);
    });
});
