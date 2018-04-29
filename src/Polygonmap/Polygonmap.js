import identity from './utils/identity';

ymaps.modules.define('Polygonmap', [
    'option.Manager',
    'Monitor',
    'Layer'
], (provide, OptionManager) => {
    class Polygonmap {
        construcotor(data, options) {
            this._data = data.map(identity);
            this.options = new OptionManager(options);
        }

        setMap(map) {
            this._map = map;
        }
    }

    provide(Polygonmap);
});
