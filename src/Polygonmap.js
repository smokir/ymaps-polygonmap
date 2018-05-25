import normalizeFeature from './utils/normalizeFeature';
import defaultMapper from './utils/defaultMapper';
import defaultFilter from './utils/defaultFilter';
import defaultOnMouseEnter from './utils/defaultOnMouseEnter';
import defaultOnMouseLeave from './utils/defaultOnMouseLeave';
import defaultBalloonContent from './utils/defaultBalloonContent';
import defaultOnClick from './utils/defaultOnClick';
import inside from './utils/inside';
import Colorize from './utils/colorize';
import colorLegend from './utils/colorLegend';

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
    /**
     * @param {Object} [data] Polygons and points.
     * @param {Object} data.polygons GeoJSON FeatureCollections.
     * @param {Object} data.points GeoJSON FeatureCollections.
     * @param {Object} [options] Options for customization.
     * @param {function} options.mapper Function of iterative transformation of features.
     * @param {string} [options.colorBy=points] Calculate the color by points | weight.
     * @param {string} [options.colorByWeightProp=weight] Prop name in data object, for weight value.
     * If colorBy is "weight".
     * @param {string} [options.colorByWeightType=middle] Type of calculate color by weight. Can be middle | maximum
     * @param {number|array} [options.colorRanges=3] Count of ranges or array of custom ranges.
     * @param {string|array} [options.colorScheme=["rgb(255, 90, 76)", "rgb(224, 194, 91)", "rgb(108, 206, 92)"]]
     * Preset for colorize or array of custom colors.
     * @param {number} [options.colorOpacity=1] Opacity of polygon.
     * @param {string} [options.colorEmptyPolygon=rgba(255, 255, 255, 0)] Color of polygon where points count equal 0.
     * @param {string} [options.strokeColor=#fff] Color of polygon stroke.
     * @param {number} [options.strokeWidth=2] Width of polygon stroke.
     * @param {boolean} [options.showLegend=true] Flag to show color legend.
     * @param {function} options.legendTemplate Receives object {color: value} returns html legend template.
     * @param {object} [options.legendPosition={top: 10, right: 10}] Position of legend,
     * you can only change the top or bottom and right or left.
     * @param {function} [options.filter=undefined] Function for custom filter polygons with points.
     * @param {boolean} [options.filterEmptyPolygons=false] Flag for show polygon with count of points equal 0.
     * @param {function} options.onMouseEnter Handler for mouseEnter event.
     * @param {function} options.onMouseLeave Handler for mouseLeave event.
     * @param {function} options.onClick Handler for click event.
     * @param {function} options.balloonContent Function for render content of baloon. Recieves object with
     * properties of polygon.
     * @param {number} [options.opacityHover=0.9] Number of opacity on polygon hover.
     * @param {number} [options.strokeWidthHover=2] Number of stroke width on polygon hover.
     * @param {number} [options.opacityActive=1] Number of opacity on polygon active.
     * @param {number} [options.strokeWidthActive=3] Number of stroke width on polygon active.
     * @param {boolean} [options.interactivity=true] Flag for enable interactivity.
     *
     * @alias module:Polygonmap
     */
    class Polygonmap {
        constructor(data, options) {
            const defaultOptions = new OptionManager({
                mapper: defaultMapper,
                colorBy: 'points',
                colorByWeightProp: 'weight',
                colorByWeightType: 'middle',
                colorRanges: 3,
                colorScheme: ['rgb(255, 90, 76)', 'rgb(224, 194, 91)', 'rgb(108, 206, 92)'],
                colorOpacity: 1,
                colorEmptyPolygon: 'rgba(255, 255, 255, 0)',
                strokeColor: '#fff',
                strokeWidth: 2,
                showLegend: true,
                legendTemplate: colorLegend.defaultTemplate,
                legendPosition: {
                    top: 10,
                    right: 10
                },
                // Since the default filter for empty polygons is disabled by default,
                // this option will be undefined.
                filter: undefined,
                filterEmptyPolygons: false,
                onMouseEnter: defaultOnMouseEnter,
                onMouseLeave: defaultOnMouseLeave,
                onClick: defaultOnClick,
                balloonContent: defaultBalloonContent,
                opacityHover: 0.9,
                strokeWidthHover: 2,
                opacityActive: 1,
                strokeWidthActive: 3,
                interactivity: true
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
         * @param {Object} data.polygons GeoJSON FeatureCollections.
         * @param {Object} data.points GeoJSON FeatureCollections.
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
         * @returns {Polygonmap} Self-reference.
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
            this._legendControl.setParent(null);
            this.balloon.close();
            this.setMap(null);
        }

        /**
         * Prepare for render Polygonmap.
         *
         * @private
         * @param {Object} data Polygons and points.
         * @param {Object} data.polygons GeoJSON FeatureCollections.
         * @param {Object} data.points GeoJSON FeatureCollections.
         * @returns {undefined}
         */
        _prepare(data) {
            const polygonFeatures = data.polygons.features;

            const colorBy = this.options.get('colorBy');
            const colorByWeightType = this.options.get('colorByWeightType');
            const colorByWeightProp = this.options.get('colorByWeightProp');

            let pointFeatures = data.points.features;
            let pointsCountMinimum = 0;
            let pointsCountMaximum = 0;
            let pointsWeightMaximum = 0;

            if (
                data.polygons.type === 'FeatureCollection' &&
                data.points.type === 'FeatureCollection'
            ) {
                for (let i = 0; i < polygonFeatures.length; i++) {
                    const restPointFeatures = [];
                    const polygonFeature = normalizeFeature(polygonFeatures[i], meta, {id: i});

                    let pointsCount = 0;
                    let pointsWeight = 0;

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
                            pointsWeight += pointFeature.properties[colorByWeightProp];
                        } else {
                            restPointFeatures.push(pointFeature);
                        }
                    }

                    pointFeatures = restPointFeatures;

                    if (pointsCount < pointsCountMinimum) {
                        pointsCountMinimum = pointsCount;
                    }

                    if (pointsCount > pointsCountMaximum) {
                        pointsCountMaximum = pointsCount;
                    }

                    polygonFeature.properties = polygonFeature.properties || {};
                    polygonFeature.properties.pointsCount = pointsCount;

                    if (colorBy === 'weight') {
                        if (colorByWeightType === 'middle') {
                            pointsWeight = pointsWeight === 0 && pointsCount === 0 ? 0 : pointsWeight / pointsCount;

                            if (pointsWeight > pointsWeightMaximum) {
                                pointsWeightMaximum = pointsWeight / pointsCount;
                            }
                        } else {
                            if (pointsWeight > pointsWeightMaximum) {
                                pointsWeightMaximum = pointsWeight;
                            }
                        }

                        polygonFeature.properties.pointsWeight = pointsWeight;
                    }

                    this._data.polygons.features.push(polygonFeature);
                }
            }

            this.pointsCountMinimum = pointsCountMinimum;
            this.pointsCountMaximum = pointsCountMaximum;

            if (colorBy === 'weight') {
                this.pointsWeightMaximum = pointsWeightMaximum;
            }
        }

        /**
         * Render ObjectManager.
         *
         * @private
         */
        _render() {
            if (this.options.get('interactivity')) {
                this._initInteractivity();
            }

            this._map.geoObjects.add(this.objectManager);
            colorLegend.init(this);
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
            const onMouseEnter = this.options.get('onMouseEnter');
            const onMouseLeave = this.options.get('onMouseLeave');
            const onClick = this.options.get('onClick');

            this.options.set('mapper', mapper.bind(this));

            if (filterEmptyPolygons) {
                this.options.set('filter', defaultFilter.bind(this));
            }

            this.options.set('onMouseEnter', onMouseEnter.bind(this));
            this.options.set('onMouseLeave', onMouseLeave.bind(this));
            this.options.set('onClick', onClick.bind(this));
        }

        /**
         * Init ObjectManager.
         *
         * @private
         */
        _initObjectManager() {
            const mapper = this.options.get('mapper');
            const filter = this.options.get('filter');
            const colorByWeight = this.options.get('colorBy') === 'weight';

            this.colorize = new Colorize(colorByWeight ? this.pointsWeightMaximum : this.pointsCountMaximum, {
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

        /**
         * Init interactivity.
         *
         * @private
         */
        _initInteractivity() {
            this._prevObjectId = null;
            this.balloon = new ymaps.Balloon(this._map);
            const onMouseEnter = this.options.get('onMouseEnter');
            const onMouseLeave = this.options.get('onMouseLeave');
            const onClick = this.options.get('onClick');

            this.objectManager.events.add('mouseenter', onMouseEnter);

            this.objectManager.events.add('mouseleave', onMouseLeave);

            this.balloon.options.setParent(this._map.options);

            this.objectManager.events.add('click', onClick);
        }
    }

    provide(Polygonmap);
});
