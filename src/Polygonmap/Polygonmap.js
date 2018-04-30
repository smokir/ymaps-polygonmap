import convertCoordinates from './utils/convertCoordinates';
import convertMultiPolygonToPolygon from './utils/convertMultiPolygonToPolygon';

ymaps.modules.define('Polygonmap', [
    'option.Manager',
    'Monitor',
    'Layer'
], (provide, OptionManager) => {
    class Polygonmap {
        constructor(points, polygons, options) {
            this._data = {
                points: points && points.type === 'FeatureCollection' ?
                    points.features : points,
                polygons: polygons && polygons.type === 'FeatureCollection' ?
                    polygons.features : polygons
            };
            this.options = new OptionManager(options);
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

        _render() {
            this.polygons = this._data.polygons.map((feature) => {
                const geoObject = new ymaps.GeoObject(
                    convertMultiPolygonToPolygon(feature, convertCoordinates)
                );

                this._map.geoObjects.add(geoObject);

                return geoObject;
            }, []);
        }
    }

    provide(Polygonmap);
});
