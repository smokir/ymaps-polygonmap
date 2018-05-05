import Colormap from 'colormap';

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
        }).reverse();

        this._ranges = this._createRangesArray();
    }

    _createRangesArray() {
        const arr = [];

        for (let i = 0; i < parseInt(this._maxPointsCount / this._rangesCount, 10); i++) {
            arr.push(i * this._rangesCount);
        }

        arr.push(this._maxPointsCount + 1);

        return arr;
    }

    getColorMap() {
        return this._colors;
    }

    getColor(pointsCount) {
        let color = this._colors[0];

        for (let i = 0; i <= this._ranges.length; i++) {
            if (pointsCount >= this._ranges[i] && pointsCount < this._ranges[i + 1]) {
                color = this._colors[i];
            }
        }

        return color;
    }
}

export default Colorize;
