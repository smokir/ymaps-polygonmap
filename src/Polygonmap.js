import normalizeFeature from './utils/normalizeFeature';
import defaultMapper from './utils/defaultMapper';
import defaultFilter from './utils/defaultFilter';
import defaultOnMouseEnter from './utils/defaultOnMouseEnter';
import defaultOnMouseLeave from './utils/defaultOnMouseLeave';
import defaultBalloonContent from './utils/defaultBalloonContent';
import inside from './utils/inside';
import Colorize from './utils/colorize';

/**
 * Polygonmap module.
 *
 * @module Polygonmap
 * @requires option.Manager
 * @requires ObjectManager
 */
ymaps.modules.define('Polygonmap', [
    'meta',
    'option.Manager',
    'ObjectManager'
], (provide, meta, OptionManager, ObjectManager) => {
    class Polygonmap {
        /**
         * @param {Object} [data] Polygons and points.
         *  {Object} data.polygons GeoJSON FeatureCollections.
         *  {Object} data.points GeoJSON FeatureCollections.
         * @param {Object} [options] Options for customization.
         * @param {number|array} options.colorRanges count of ranges or array of custom ranges
         * @param {string|array} options.colorScheme preset for colorize or array of custom colors
         * @param {number} options.colorOpacity opacity of polygon
         * @param {string} options.strokeColor color for polygon stroke
         * @param {number} options.strokeWidth width for polygon stroke
         */
        constructor(data, options) {
            const defaultOptions = new OptionManager({
                mapper: defaultMapper,
                colorRanges: 10,
                colorScheme: 'cdom',
                colorOpacity: 1,
                strokeColor: '#222',
                strokeWidth: 2,
                // Since the default filter for empty polygons is disabled by default,
                // this option will be undefined.
                filter: undefined,
                filterEmptyPolygons: false,
                color: {
                    rangesCount: 10,
                    colormap: 'cdom',
                    format: 'rgbaString',
                    alpha: 0.7
                },
                onMouseEnter: defaultOnMouseEnter,
                onMouseLeave: defaultOnMouseLeave,
                balloonContent: defaultBalloonContent
            });

            this._initOptions(options, defaultOptions);
            this.setData(data);
        }

        /**
         * Get the data, polygons and points.
         *
         * @public
         * @returns {Object} Polygons and points.
         */
        getData() {
            return this._data || null;
        }

        /**
         * Set the data, polygons and points.
         *
         * @public
         * @param {Object} data Polygons and points.
         *  {Object} data.polygons GeoJSON FeatureCollections.
         *  {Object} data.points GeoJSON FeatureCollections.
         * @returns {Polygonmap} Self-reference.
         */
        setData(data) {
            this._data = data;

            if (data) {
                this._data = {
                    points: {type: 'FeatureCollection', features: []},
                    polygons: {type: 'FeatureCollection', features: []}
                };
                this._prepare(data);
                this._initObjectManager();
            }

            return this;
        }

        /**
         * Get the Map instance.
         *
         * @public
         * @returns {Map} Reference to Map instance.
         */
        getMap() {
            return this._map;
        }

        /**
         * Set Map instance to render Polygonmap object.
         *
         * @public
         * @param {Map} map Map instance.
         * @returns {Heatmap} Self-reference.
         */
        setMap(map) {
            if (this._map !== map) {
                this._map = map;

                if (map && this._data) {
                    this._render();
                }
            }

            return this;
        }

        /**
         * Destructs Polygonmap instance.
         *
         * @public
         */
        destroy() {
            this.setData(null);
            this.objectManager.removeAll();
            this.setMap(null);
        }

        /**
         * Prepare for render Polygonmap.
         *
         * @private
         * @param {Object} data Polygons and points.
         *  {Object} data.polygons GeoJSON FeatureCollections.
         *  {Object} data.points GeoJSON FeatureCollections.
         * @returns {undefined}
         */
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

        /**
         * Render ObjectManager.
         *
         * @private
         */
        _render() {
            this._initInteractivity();
            this._map.geoObjects.add(this.objectManager);
        }

        /**
         * Init Options.
         *
         * @param {Object} options Options.
         * @param {Object} defaultOptions Default options.
         * @private
         */
        _initOptions(options, defaultOptions) {
            this.options = new OptionManager(options, defaultOptions);

            const mapper = this.options.get('mapper');
            const filterEmptyPolygons = this.options.get('filterEmptyPolygons');

            this.options.set('mapper', mapper.bind(this));

            if (filterEmptyPolygons) {
                this.options.set('filter', defaultFilter.bind(this));
            }
        }

        /**
         * Init ObjectManager.
         *
         * @private
         */
        _initObjectManager() {
            const mapper = this.options.get('mapper');
            const filter = this.options.get('filter');

            this.colorize = new Colorize(this.pointsCountMaximum, {
                colorScheme: this.options.get('colorScheme'),
                colorRanges: this.options.get('colorRanges')
            });

            if (mapper && filter) {
                const reducer = (acc, feature) => {
                    if (filter(feature)) {
                        acc.push(mapper(feature));
                    }

                    return acc;
                };
                this._data.polygons.features = this._data.polygons.features.reduce(reducer, []);
            } else if (mapper && !filter) {
                this._data.polygons.features = this._data.polygons.features.map(mapper);
            } else if (!mapper && filter) {
                this._data.polygons.features = this._data.polygons.features.filter(filter);
            }

            this.objectManager = new ObjectManager();
            this.objectManager.add(this._data.polygons);
        }

        _initInteractivity() {
            const balloon = new ymaps.Balloon(this._map);
            const onMouseEnter = this.options.get('onMouseEnter');
            const onMouseLeave = this.options.get('onMouseLeave');

            this.objectManager.events.add('mouseenter', (e) => {
                onMouseEnter(this.objectManager, e);
            });

            this.objectManager.events.add('mouseleave', (e) => {
                onMouseLeave(this.objectManager, e);
            });

            balloon.options.setParent(this._map.options);

            this.objectManager.events.add('click', (e) => {
                const objId = e.get('objectId');
                const object = this.objectManager.objects.getById(objId);
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
