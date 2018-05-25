import Colormap from 'colormap';

/**
 * Polygon colorize.
 * Needed for coloring polygons as you need.
 */
class Colorize {
    /**
     * @param {number} maxPointsCount Max points.
     * @param {object} options Setting for generate colormap.
     * @param {string|array} options.colorScheme Sheme of colormap or array of custom colors (from dark to light).
     * @param {number|array} options.colorRanges Count of ranges to automaticly generate or custom array
     * of ranges (from dark to light).
     */
    constructor(maxPointsCount, options) {
        if (typeof maxPointsCount !== 'number') {
            throw new Error('Wrong "maxPointsCount" value');
        }

        this._maxPointsCount = maxPointsCount;

        if (typeof options.colorRanges === 'object') {
            this._ranges = options.colorRanges;
            this._rangesCount = this._ranges.length;
        } else {
            this._rangesCount = options.colorRanges;
            this._ranges = this._createRangesArray();
        }

        this._colors = typeof options.colorScheme === 'object' ? options.colorScheme : Colormap({
            colormap: options.colorScheme,
            nshades: this._rangesCount
        });

        if (this._colors.length !== this._rangesCount) {
            throw new Error('The length of the colorScheme array and ranges must be equal');
        }
    }

    /**
     * Create array for ranges depending on rangesCount.
     * @returns {Array.<*>} Return array of ranges.
     * @private
     */
    _createRangesArray() {
        const arr = [];
        for (let i = 1; i < this._rangesCount; i++) {
            arr.push(i * Math.floor(this._maxPointsCount / this._rangesCount, 10));
        }

        arr.push(this._maxPointsCount + 1);

        return arr.reverse();
    }

    /**
     * @returns {Array} Return generated array of colors.
     */
    getColorMap() {
        return this._colors;
    }

    /**
     * @returns {Array} Return generated array of ranges.
     */
    getColorRanges() {
        return this._ranges;
    }

    /**
     * Return color depending on count of points inside polygon
     * @param {number} pointsCount=0 Count of point inside polygon.
     * @returns {string} Return color.
     */
    getColor(pointsCount = 0) {
        let color = this._colors[this._rangesCount - 1];

        for (let i = 0; i < this._rangesCount; i++) {
            if (pointsCount <= this._ranges[i] && pointsCount > this._ranges[i + 1]) {
                color = this._colors[i];
                break;
            }
        }

        return color;
    }
}

export default Colorize;
