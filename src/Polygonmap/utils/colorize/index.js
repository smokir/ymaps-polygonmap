import Colormap from 'colormap';

/**
 * Polygon colorize.
 * Needed for coloring polygons as you need
 */
class Colorize {
    /**
     * @param {number} rangesCount count of ranges
     * @param {number} maxPointsCount max points
     * @param {string} colormap type of colormap
     * @param {string} format hex || rgbaString
     * @param {number|Array} alpha alpha chanel
     */
    constructor(maxPointsCount, options) {
        this._rangesCount = options.rangesCount;

        if (typeof maxPointsCount === 'number') {
            this._maxPointsCount = maxPointsCount;
        } else {
            throw new Error('Wrong "maxPointsCount" value');
        }

        this._colors = Colormap({
            colormap: options.colormap,
            nshades: this._rangesCount,
            format: options.format,
            alpha: options.alpha
        });
        this._ranges = this._createRangesArray();
    }

    /**
     * Create array for ranges depending on rangesCount
     * @returns {Array.<*>}
     * @private
     */
    _createRangesArray() {
        const arr = [];
        for (let i = 1; i < this._rangesCount; i++) {
            arr.push(i * parseInt(this._maxPointsCount / this._rangesCount, 10));
        }

        arr.push(this._maxPointsCount + 1);

        return arr.reverse();
    }

    /**
     * Return generated array of colors
     * @returns {Array}
     */
    getColorMap() {
        return this._colors;
    }

    /**
     * Return color depending on count of points inside polygon
     * @param pointsCount - count of point inside polygon
     * @returns {string}
     */
    getColor(pointsCount = 0) {
        let color = this._colors[this._rangesCount - 1];

        for (let i = 0; i < this._ranges.length; i++) {
            if (pointsCount <= this._ranges[i] && pointsCount > this._ranges[i + 1]) {
                color = this._colors[i];
            }
        }

        return color;
    }
}

export default Colorize;
