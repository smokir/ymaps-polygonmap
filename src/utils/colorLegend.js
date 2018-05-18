/**
 * init colorLegend
 * @param {object} polygonmap instance of polygonemap
 */
const init = (polygonmap) => {
    const show = polygonmap.options.get('showLegend');

    if (!show) return;

    const template = polygonmap.options.get('legendTemplate');
    const map = polygonmap.getMap();
    const colorScheme = polygonmap.colorize.getColorMap();
    const colorRanges = polygonmap.colorize.getColorRanges();

    const colors = colorScheme.map((el, i) => {
        return {
            name: el,
            value: colorRanges[i]
        };
    });

    const CustomControlClass = function (options) {
        CustomControlClass.superclass.constructor.call(this, options);
    };

    ymaps.util.augment(CustomControlClass, ymaps.collection.Item, {
        onAddToMap(map) {
            CustomControlClass.superclass.onAddToMap.call(this, map);
            this.getParent().getChildElement(this).then(this._onGetChildElement, this);
        },
        _onGetChildElement(parentDomContainer) {
            const legend = document.createElement('div');
            legend.className = 'ymaps-color-legend';
            legend.innerHTML = template(colors.reverse());

            parentDomContainer.appendChild(legend);
        }
    });

    const customControl = new CustomControlClass();
    map.controls.add(customControl, {
        float: 'none',
        position: polygonmap.options.get('legendPosition')
    });
};

/**
 * function for generate html template of legend
 * @param {Object} colors object of colors and values
 * @returns {string} rendered html template
 */
const defaultTemplate = (colors) => {
    /* eslint-disable max-len */
    return `
        <div class="legend">
            ${colors.map((color, i) => `
                <div class="legend__color" style="background: ${color.name}; width: ${100 / colors.length}%">
                    <div class="legend__tooltip">
                        <span class="legend__tooltip__inner">
                            ${colors[i - 1] ? `${colors[i - 1].value} - ${color.value}` : `0 - ${color.value}`}
                        </span>
                    </div>
                </div>
            `).join('\n')}
        </div>
    `;
};

export default {init, defaultTemplate};
