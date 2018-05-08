import extend from 'extend';

/**
 * Options manager
 */
export default class OptionsManager {
    /**
     *
     * @param {object} defaultOptions - Default options
     * @param {object} userOptions - Custom user options
     */
    constructor(defaultOptions, userOptions) {
        const assign = extend(true, {}, defaultOptions, userOptions);

        //todo у меня версия node - 6, тесты валятся без полифила. оставить или грохнуть?
        if (!Object.entries) {
            Object.entries = function (obj) {
                const ownProps = Object.keys(obj);
                let i = ownProps.length;
                const resArray = new Array(i);

                while (i--)
                    resArray[i] = [ownProps[i], obj[ownProps[i]]];
                return resArray;
            };
        }

        this._options = new Map(Object.entries(assign));
    }

    /**
     * Get option
     * @param {string} value - name of option
     * @returns value of option
     */
    get(value) {
        return this._options.get(value);
    }

    /**
     * Set option
     * @param {string|object} key - name of new option or object with options
     * @param {string|object|array} value - value of new option
     */
    set(key, value) {
        if (typeof key === 'object') {
            //todo важно ли нам глубокое копирование объектов?
            for (const value in key) {
                this._options.set(value, key[value]);
            }
        } else {
            this._options.set(key, value);
        }
    }

    /**
     * Get all options
     * @returns {Map}
     */
    get options() {
        return this._options;
    }
}
