/* eslint-disable no-invalid-this */
import '../../src/Polygonmap';
import points from '../data/bikeparking-moscow.geojson';
import pointsPyaterochka from '../data/pyaterochka-moscow.geojson';
import pointsHotels from '../data/hotels-moscow.geojson';
import polygons from '../data/moscow-mo.geojson';

pointsPyaterochka.features.forEach((element) => {
    element.geometry.coordinates = element.geometry.coordinates.reverse();
});

const arr = [100, 200, 300, 400, 500, 600, 700];
let weightPoints = {};
weightPoints.features = pointsPyaterochka.features.map((el) => {
    let rand = Math.floor(Math.random() * arr.length);
    el.properties.weight = arr[rand];

    return el;
});

weightPoints.type = 'FeatureCollection';

const customBaloonContent = (object) => {
    return `
        <div>
            <h3>Данные об объекте</h3>
            <div>Веса точек: ${object.properties.pointsWeight}</div>
            <div>Цвет ${object.options.fillColor}<span style="background: ${object.options.fillColor}; width: 20px; height: 20px;"></div>
            <div>Opacity ${object.options.fillOpacity}<span style="background: ${object.options.fillOpacity}; width: 20px; height: 20px;"></div>
        </div>
    `;
};


ymaps.ready(() => {
    // eslint-disable-next-line no-unused-vars
    const myMap = new ymaps.Map('map', {
        center: [37.64, 55.76],
        zoom: 10,
        controls: ['zoomControl', 'typeSelector']
    });
    const defaultSettings = {
        strokeWidth: 1.5,
        strokeColor: '#666',
        colorOpacity: 0.6
    }
    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        //Demo with preset of colorize and preset stroke
        let polygonmap = new Polygonmap({polygons, points }, defaultSettings);
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
                        polygonmap = new Polygonmap({polygons, points}, defaultSettings);
                        break;
                    case 1:
                        polygonmap = new Polygonmap({polygons, points: pointsPyaterochka}, {
                            colorScheme: 'summer',
                            strokeWidth: 1,
                            strokeColor: '#666',
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
                            ],
                            colorOpacity: 0.8,
                            strokeWidth: 1,
                            strokeColor: '#666'
                        });
                        break;
                    case 3:
                        polygonmap = new Polygonmap({ polygons, points: weightPoints }, {
                            colorBy: 'weight',
                            colorByWeightType: 'middle',
                            colorScheme: 'cdom',
                            strokeWidth: 1,
                            strokeColor: '#666',
                            colorOpacity: 0.8,
                            balloonContent: customBaloonContent
                        });
                        break;
                    case 4:
                        polygonmap = new Polygonmap({ polygons, points: weightPoints }, {
                            colorBy: 'weight',
                            colorScheme: 'freesurface-blue',
                            colorByWeightType: 'maximum',
                            strokeWidth: 1,
                            strokeColor: '#666',
                            colorOpacity: 0.6,
                            balloonContent: customBaloonContent
                        });
                        break;
                }

                polygonmap.setMap(myMap);
            });
        });
    });
});
