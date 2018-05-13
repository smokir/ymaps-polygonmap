import './Polygonmap';
import hexagonGrid from './utils/hexagonGrid';
import squareGrid from './utils/squareGrid';
import get from 'lodash/get';

ymaps.modules.define('Gridmap', ['Polygonmap', 'util.bounds'], (provide, Polygonmap, bounds) => {
    function getRequiredOption(options, path) {
        const value = get(options, path);
        if (!value) {
            throw new Error(`options.${path} is required parameter`);
        }
        return value;
    }
    class Gridmap {
        /**
         * @typedef {Object} GridBounds
         * @property {number[]} leftBotom geographical coordinate of the left bottom point.
         * @property {number[]} rigthTop geographical coordinate of the right top point.
         */

        /**
         * @typedef {Object} GridOptions
         * @property {string} type type of grid
         * @property {GridBounds=} bounds bounds for grid
         * @property {HexagonGripParams|SquareGripParams} params params of grid
         */

        /**
         * @typedef {Object} HexagonGripParams
         * @property {number} bigRadius length of the big radius of a hexagon in pixels
         */

        /**
         * @typedef {Object} SquareGripParams
         * @property {number} sideLenght length of a side of square in pixels
         */
        /**
         *
         * @param {Object} [options] options
         * @param {Array<IGeoObject>} [options.points] Array of points to visualize
         * @param {number} [options.zoom] zoom which will be used for the grid calculation
         * @param {IMap} [options.map] map
         * @param {GridOptions} [options.grid] options which will be used in a grid calculation
         */
        constructor(options) {
            const map = getRequiredOption(options, 'map');
            const points = getRequiredOption(options, 'points');
            const zoom = getRequiredOption(options, 'zoom');
            const projection = map.options.get('projection');

            let leftBottom;
            let rightTop;

            if (get(options, 'grid.bounds')) {
                leftBottom = getRequiredOption(options, 'grid.bounds.leftBottom');
                rightTop = getRequiredOption(options, 'grid.bounds.rightTop');
            } else {
                const coords = points.features.map(({geometry: {coordinates}}) => (coordinates));
                [leftBottom, rightTop] = bounds.fromPoints(coords, projection);
            }

            const [left, bottom] = projection.toGlobalPixels(leftBottom, zoom);
            const [right, top] = projection.toGlobalPixels(rightTop, zoom);
            const width = right - left;
            const height = bottom - top;
            const gripType = getRequiredOption(options, 'grid.type');

            let polygons;

            switch (gripType) {
                case 'hexagon': {
                    const bigRadius = getRequiredOption(options, 'grid.params.bigRadius');
                    polygons = hexagonGrid(projection, zoom, bigRadius, left, top, width, height);
                    break;
                }
                case 'square': {
                    const sideWidth = getRequiredOption(options, 'grid.params.sideLength');
                    polygons = squareGrid(projection, zoom, sideWidth, left, top, width, height);
                    break;
                }
                default: {
                    throw new Error(`Unsupported grid's type ${gripType}`);
                }
            }

            const polygonmap = new Polygonmap({polygons, points});
            polygonmap.setMap(map);
        }
    }

    provide(Gridmap);
});
