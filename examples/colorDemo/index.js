/* eslint-disable no-invalid-this */
import '../../src';
import points from '../data/bikeparking-moscow.geojson';
import polygons from '../data/moscow-mo.geojson';

ymaps.ready(() => {
    var myMap = new ymaps.Map("map", {
        center: [37.64, 55.76],
        zoom: 10,
        controls: []
    });

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        let polygonmap = new Polygonmap({polygons, points }, {
            colorScheme: 'summer',
            colorRanges: 10,
            fillOpacity: 0.7,
            strokeColor: '#666',
            strokeWidth: 1,
            legendPosition: {
                top: 20,
                left: 20
            }
        });
        polygonmap.setMap(myMap);
    });
});
