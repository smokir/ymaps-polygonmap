/* eslint-disable no-invalid-this */

import './../Polygonmap/Polygonmap';
import points from './data/bikeparking-moscow.geojson';
import pointsPyaterochka from './data/pyaterochka-moscow.geojson';
import pointsHotels from './data/hotels-moscow.geojson';
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
        let polygonmap = new Polygonmap({polygons, points}, {
            colorScheme: ['#ff0000', '#008000', '#0000ff'],
            colorRanges: [150, 50, 10],
            strokeWidth: 1.5,
            colorOpacity: 0.8
        });
        polygonmap.setMap(myMap);

        const presets = document.querySelectorAll('.presets__item');

        presets.forEach((element, i) => {
            element.addEventListener('click', function () {
                if (this.classList.contains('active')) return;
                presets.forEach((el) => {
                    el.classList.remove('active');
                });

                this.classList.add('active');
                polygonmap.destroy();
                switch (i) {
                    case 0:
                        polygonmap = new Polygonmap({polygons, points}, {
                            colorScheme: ['#ff0000', '#008000', '#0000ff'],
                            colorRanges: [150, 50, 10],
                            strokeWidth: 1.5,
                            colorOpacity: 0.8
                        });
                        break;
                    case 1:
                        polygonmap = new Polygonmap({polygons, points: pointsPyaterochka}, {
                            colorScheme: 'summer',
                            strokeWidth: 1.5,
                            colorOpacity: 0.8
                        });
                        break;
                    case 2:
                        polygonmap = new Polygonmap({polygons, points: pointsHotels}, {
                            colorScheme: [
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
                            ]
                        });
                        break;
                }

                polygonmap.setMap(myMap);
            });
        });
    });
});
