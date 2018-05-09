import normalizeFeature from './utils/normalizeFeature';
import defaultMapper from './utils/defaultMapper';
import inside from './utils/inside';

ymaps.modules.define('Polygonmap', [
    'meta',
    'option.Manager',
    'ObjectManager'
], (provide, meta, OptionManager, ObjectManager) => {
    class Polygonmap {
        constructor(data, options) {
            const defaultOptions = new OptionManager({
                mapper: defaultMapper,
                onMouseEnter: function (objectManager, e) {
                    const objId = e.get('objectId');
                    objectManager.objects.setObjectOptions(objId, {
                        fillOpacity: 0.5,
                        strokeWidth: 2
                    });
                },
                onMouseLeave: function (objectManager, e) {
                    const objId = e.get('objectId');
                    objectManager.objects.setObjectOptions(objId, {
                        fillOpacity: 1,
                        strokeWidth: 1
                    });
                },
                balloonContent: function (object) {
                    return `<div>
                            <h3>Данные об объекте</h3>
                            <div>Количество точек: ${object.properties.pointsCount}</div>
                    </div>`;
                }
            });

            this.options = new OptionManager(options, defaultOptions);
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

            this._data.pointsCountMaximum = pointsCountMaximum;
        }

        _render() {
            const mapper = this.options.get('mapper');
            const pointsCountMaximum = this._data.pointsCountMaximum;

            this._data.polygons.features = this._data.polygons.features.map((feature, i) => {
                feature.properties.pointsCountMaximum = pointsCountMaximum;
                feature.properties.pointsCountAll = this._data.points.features.length;

                return mapper(feature, i);
            });

            this.polygons = new ObjectManager();
            this.polygons.add(this._data.polygons);

            this._initInteractivity(this.polygons);

            this._map.geoObjects.add(this.polygons);
        }

        _initInteractivity(objectManager) {
            const balloon = new ymaps.Balloon(this._map);

            objectManager.events.add('mouseenter', (e) => {
                const onMouseEnter = this.options.get('onMouseEnter');
                onMouseEnter(objectManager, e);
            });

            objectManager.events.add('mouseleave', (e) => {
                const onMouseLeave = this.options.get('onMouseLeave');
                onMouseLeave(objectManager, e);
            });

            balloon.options.setParent(this._map.options);

            objectManager.events.add('click', (e) => {
                const objId = e.get('objectId');
                const object = objectManager.objects.getById(objId);
                const balloonContent = this.options.get('balloonContent');

                balloon.setData({
                    content: balloonContent(object)
                });

                balloon.open(e.get('coords'));
            });
        }
    }

    provide(Polygonmap);
});
