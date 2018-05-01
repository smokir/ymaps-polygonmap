import normalizeFeature from './utils/normalizeFeature';

ymaps.modules.define('Polygonmap', [
    'meta',
    'option.Manager',
    'ObjectManager'
], (provide, meta, OptionManager, ObjectManager) => {
    class Polygonmap {
        constructor(data, options) {
            if (data) {
                this.setData(data);
            }

            this.options = new OptionManager(options);
        }

        setData(data) {
            this._data = {
                points: this._normalize(data[0]),
                polygons: this._normalize(data[1])
            };

            return this;
        }

        setMap(map) {
            if (this._map !== map) {
                this._map = map;

                if (map) {
                    this._render();
                }
            }

            return this;
        }

        _normalize(data) {
            if (data.type === 'FeatureCollection') {
                const features = data.features
                    .map((feature, id) => normalizeFeature(feature, {id}, meta));

                return Object.assign({}, data, {features});
            } else if (data.type === 'Feature') {
                const features = [normalizeFeature(data, {id: 0}, meta)];

                return {type: 'FeatureCollection', features};
            }
        }

        _render() {
            this.polygons = new ObjectManager();
            this.polygons.add(this._data.polygons);

            this._map.geoObjects.add(this.polygons);
        }
    }

    provide(Polygonmap);
});
