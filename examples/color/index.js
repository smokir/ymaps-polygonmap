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
    const pointsWeight = object.properties.pointsWeight;
    const fillColor = object.options.fillColor;
    const fillOpacity = object.options.fillOpacity;

    return `
        <div>
            <h3>Данные об объекте</h3>
            <div>Веса точек: ${pointsWeight}</div>
            <div>Цвет ${fillColor}</div>
            <div>Opacity ${fillOpacity}</div>
        </div>
    `
}

const template = (colors) => {
    return `
        <div class="legend">
            ${colors.map((color, i) => `
                <div class="legend__color" style="background: ${color.name}; width: ${100 / colors.length}%">
                    <div class="legend__tooltip">
                        <span class="legend__tooltip__inner">
                            ${
                                colors[i - 1] ?
                                    `${colors[i - 1].value} - ${color.value}`
                                    :
                                    `0 - ${color.value}`
                            }
                        </span>
                    </div>
                </div>
            `).join('\n')}
        </div>
    `;
};


ymaps.ready(() => {
    // eslint-disable-next-line no-unused-vars
    var myMap = new ymaps.Map("map", {
        center: [37.64, 55.76],
        zoom: 10,
        controls: ['zoomControl']
    });

    const defaultSettings = {
        strokeWidth: 1.5,
        fillOpacity: 0.6,
        showLegend: true
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
                            colorScheme: [
                                '#e6ee9c',
                                '#dce775',
                                '#aed581',
                                '#7cb342',
                                '#33691e'
                            ],
                            colorRanges: 5,
                            strokeWidth: 1,
                            fillOpacity: 0.8
                        });
                        break;
                    case 2:
                        polygonmap = new Polygonmap({polygons, points: pointsHotels}, {
                            colorScheme: [
                                '#f3e5f5',
                                '#e1bee7',
                                '#ce93d8',
                                '#ba68c8',
                                '#ab47bc',
                                '#9c27b0',
                                '#8e24aa',
                                '#7b1fa2',
                                '#6a1b9a',
                                '#4a148c'
                            ],
                            colorRanges: 10,
                            fillOpacity: 0.8,
                            strokeWidth: 1
                        });
                        break;
                    case 3:
                        polygonmap = new Polygonmap({ polygons, points: weightPoints }, {
                            fillBy: 'weight',
                            fillByWeightType: 'middle',
                            colorScheme: 'cdom',
                            colorRanges: 10,
                            strokeWidth: 1,
                            fillOpacity: 0.8,
                            balloonContent: customBaloonContent
                        });
                        break;
                    case 4:
                        polygonmap = new Polygonmap({ polygons, points: weightPoints }, {
                            fillBy: 'weight',
                            colorScheme: 'freesurface-blue',
                            colorRanges: 15,
                            fillByWeightType: 'maximum',
                            strokeWidth: 1,
                            fillOpacity: 0.6,
                            balloonContent: customBaloonContent
                        });
                        break;
                }

                polygonmap.setMap(myMap);
            });
        });
    });
});
