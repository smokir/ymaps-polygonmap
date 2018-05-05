import './../Polygonmap/Polygonmap';
import points from './data/bikeparking-moscow.geojson';
import RangeMapper from '../Polygonmap/utils/rangeMapper';
import hexagonGrid from '../Polygonmap/utils/hexagonGrid';

ymaps.ready(() => {
    const el = document.getElementById('map');
    const myMap = new ymaps.Map(el, {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl', 'typeSelector']
    });

    const R = 20;

    const map = new ymaps.Map(el, {
        center: [55.76, 37.64],
        zoom: 10
    });

    const zoom = map.getZoom();

    const rect = el.getBoundingClientRect();
    const center = map.getGlobalPixelCenter();

    const offsetLeft = center[0] - (rect.width / 2);
    const offsetTop = center[1] - (rect.height / 2);

    const polygons = hexagonGrid(map, zoom, R, offsetLeft, offsetTop, rect.width, rect.height);

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        const polygonmap = new Polygonmap({polygons, points});
        const rangeMapper = new RangeMapper(10, polygonmap.getData().pointsCountMaximum);

        polygonmap.options.set('mapper', (feature) => {
            const pointsCount = feature.properties.pointsCount;

            feature.options = {fillColor: rangeMapper.getColor(pointsCount)};

            return feature;
        });

        polygonmap.setMap(myMap);
    });
});
