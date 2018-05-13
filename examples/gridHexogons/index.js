import '../../src/Gridmap';
import data from '../data/data-latlong.geojson';

ymaps.ready(() => {
    ymaps.modules.require(['Gridmap'], (Gridmap) => {
        const hexagonMap = new ymaps.Map(
            document.getElementById('hexagonMap'),
            {
                center: [55.76, 37.64],
                zoom: 10,
                controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
            });

        // eslint-disable-next-line no-unused-vars
        const hexagonGridmap = new Gridmap({
            map: hexagonMap,
            points: data,
            zoom: 10,
            grid: {
                type: 'hexagon',
                params: {
                    bigRadius: 20
                },
                bounds: {
                    leftBottom: [55.53709262753493, 37.23818169628907],
                    rightTop: [55.97311385727207, 37.988359308593736]
                }
            }
        });
    });
});
