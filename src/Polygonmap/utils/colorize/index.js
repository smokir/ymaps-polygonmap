import Colormap from 'colormap';

/**
 * Polygon colorize.
 * Needed for coloring polygons as you need
 */
class Colorize {
    /**
     * @param {number} maxPointsCount max points
     * @param {object} options setting for generate colormap
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
     * @returns {Array.<*>} return array of ranges
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
     * @returns {Array} Return generated array of colors
     */
    getColorMap() {
        return this._colors;
    }

    /**
     * Return color depending on count of points inside polygon
     * @param {number} pointsCount - count of point inside polygon
     * @returns {string} return color
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
