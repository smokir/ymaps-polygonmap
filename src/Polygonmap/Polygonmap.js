import normalizeFeature from './utils/normalizeFeature';
import defaultMapper from './utils/defaultMapper';
import inside from './utils/inside';
import Colorize from './utils/colorize/index';
import OptionsManager from './utils/optionsManager/index';

ymaps.modules.define('Polygonmap', [
    'meta',
    'option.Manager',
    'ObjectManager'
], (provide, meta, OptionManager, ObjectManager) => {
    class Polygonmap {
        constructor(data, options) {
            const defaultOptions = {
                mapper: defaultMapper,
                color: {
                    rangesCount: 10,
                    colormap: 'cdom',
                    format: 'rgbaString',
                    alpha: 0.7
                }
            };

            this.options = new OptionsManager(defaultOptions, options);

            const mapper = this.options.get('mapper');
            this.options.set('mapper', mapper.bind(this));
            this.setData(data);
        }

        getData() {
            return this._data || null;
        }

        setData(data) {
            this._data = data;

            if (data) {
                this._data = {
                    points: {type: 'FeatureCollection', features: []},
                    polygons: {type: 'FeatureCollection', features: []}
                };
                this._prepare(data);
            }

            return this;
        }

        getMap() {
            return this._map;
        }

        setMap(map) {
            if (this._map !== map) {
                this._map = map;

                if (map && this._data) {
                    this._render();
                }
            }

            return this;
        }

        destroy() {
            this.setData(null);
            this.setMap(null);
        }

        _prepare(data) {
            const polygonFeatures = data.polygons.features;
            let pointFeatures = data.points.features;
            let pointsCountMaximum = 0;

            if (
                data.polygons.type === 'FeatureCollection' &&
                data.points.type === 'FeatureCollection'
            ) {
                for (let i = 0; i < polygonFeatures.length; i++) {
                    const restPointFeatures = [];
                    const polygonFeature = normalizeFeature(polygonFeatures[i], meta, {id: i});

                    let pointsCount = 0;

                    for (let j = 0; j < pointFeatures.length; j++) {
                        let pointFeature;

                        if (i === 0) {
                            pointFeature = normalizeFeature(pointFeatures[j], meta, {id: j});
                            this._data.points.features.push(pointFeature);
                        } else {
                            pointFeature = pointFeatures[j];
                        }

                        if (inside(polygonFeature.geometry, pointFeature.geometry)) {
                            pointsCount++;
                        } else {
                            restPointFeatures.push(pointFeature);
                        }
                    }

                    pointFeatures = restPointFeatures;

                    if (pointsCount > pointsCountMaximum) {
                        pointsCountMaximum = pointsCount;
                    }

                    polygonFeature.properties = polygonFeature.properties || {};
                    polygonFeature.properties.pointsCount = pointsCount;

                    this._data.polygons.features.push(polygonFeature);
                }
            }

            this.pointsCountMaximum = pointsCountMaximum;
        }

        _render() {
            const mapper = this.options.get('mapper');

            this.colorize = new Colorize(this.pointsCountMaximum, this.options.get('color'));

            this._data.polygons.features = this._data.polygons.features.map(mapper);

            this.polygons = new ObjectManager();
            this.polygons.add(this._data.polygons);

            this._map.geoObjects.add(this.polygons);
        }
    }

    provide(Polygonmap);
});
