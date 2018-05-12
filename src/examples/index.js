/* eslint-disable no-invalid-this */

import './../Polygonmap/Polygonmap';
import points from './data/bikeparking-moscow.geojson';
import pointsPyaterochka from './data/pyaterochka-moscow.geojson';
//import pointsHotels from './data/hotels-moscow.geojson';
import polygons from './data/moscow-mo.geojson';

pointsPyaterochka.features.forEach((element) => {
    element.geometry.coordinates = element.geometry.coordinates.reverse();
});

ymaps.ready(() => {
    // eslint-disable-next-line no-unused-vars
    const myMap = new ymaps.Map('map', {
        center: [37.64, 55.76],
        zoom: 10,
        controls: ['zoomControl', 'typeSelector']
    });

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        //Demo with preset of colorize and preset stroke
        const polygonmap = new Polygonmap({polygons, points}, {
            colorScheme: ['#ff0000', '#008000', '#0000ff'],
            colorRanges: [150, 50, 10],
            strokeWidth: 1.5,
            colorOpacity: 0.8
        });
        polygonmap.setMap(myMap);
    });

    const presets = document.querySelectorAll('.presets__item');

    presets.forEach((element) => {
        element.addEventListener('click', function () {
            if (this.classList.contains('active')) return;
            presets.forEach((el) => {
                el.classList.remove('active');
            });

            this.classList.add('active');
        });
    });

    // eslint-disable-next-line no-unused-vars
    /* const myMap2 = new ymaps.Map('map2', {
        center: [37.64, 55.76],
        zoom: 10,
        controls: ['zoomControl', 'typeSelector']
    });

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        //Demo colorize with different color scheme and custom stroke
        const polygonmap = new Polygonmap({polygons, points: pointsPyaterochka}, {
            color: {
                rangesCount: 10,
                colormap: 'summer',
                alpha: 0.7
            },
            strokeWidth: 2,
            strokeColor: '#009688'
        });
        polygonmap.setMap(myMap2);
    });

    // eslint-disable-next-line no-unused-vars
    const myMap3 = new ymaps.Map('map3', {
        center: [37.64, 55.76],
        zoom: 10,
        controls: ['zoomControl', 'typeSelector']
    });

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        //Demo custom palette and custom stroke
        const polygonmap = new Polygonmap({polygons, points: pointsHotels}, {
            color: {
                rangesCount: 10,
                colormap: [
                    '#4a148c',
                    '#6a1b9a',
                    '#7b1fa2',
                    '#8e24aa',
                    '#9c27b0',
                    '#ab47bc',
                    '#ba68c8',
                    '#ce93d8',
                    '#e1bee7',
                    '#f3e5f5'
                ],
                alpha: 0.7
            },
            strokeWidth: 2,
            strokeColor: '#4a148c'
        });
        polygonmap.setMap(myMap3);
    }); */
});
