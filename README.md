# Yandex Maps API Polygonmap Module

Yandex.Maps API module for data visualization.

**Polygonmap** is a graphical representation of some spatial data, where depending on the number of entered points polygons are painted in different colors.
`Polygonmap` class allows to construct and display such representations over geographical maps.

## Loading

1. Put module source code ([polygonmap.min.js](https://github.com/yandex-shri-fx-team/mapsapi-polygonmap/blob/master/umd/polygonmap.min.js)) on your CDN.

2. Load both [Yandex Maps JS API 2.1](http://api.yandex.com/maps/doc/jsapi/) and module source code by adding following code into &lt;head&gt; section of your page:

   ```html
   <script src="http://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
   <!-- Change my.cdn.tld to your CDN host name -->
   <script src="http://my.cdn.tld/polygonmap.min.js" type="text/javascript"></script>
   ```

   If you use GeoJSON data:

   ```html
   <script src="http://api-maps.yandex.ru/2.1/?lang=ru_RU&coordOrder=longlat" type="text/javascript"></script>
   <!-- Change my.cdn.tld to your CDN host name -->
   <script src="http://my.cdn.tld/polygonmap.min.js" type="text/javascript"></script>
   ```

3. Get access to module functions by using [ymaps.modules.require](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/modules.require.xml) method:

   ```js
   ymaps.modules.require(['Polygonmap'], function (Polygonmap) {
        var polygonmap = new Polygonmap();
   });
   ```

## Constructor

| Parameter | Default value | Decription |
|-|-|-|
| data | - | Type: Object.<br> Data. |
| data.polygons | - | Type: Object.<br>Object described using of following formats:<ul><li>[GeoQueryResult](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult.xml) - result of [geoQuery](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geoQuery.xml) execution;</li><li>[GeoJSON](http://geojson.org) - a format for encoding a variety of geographic data structures.</li> |
| data.points | - | Type: Object.<br>Object described using of following formats:<ul><li>[GeoQueryResult](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult.xml) - result of [geoQuery](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geoQuery.xml) execution;</li><li>[GeoJSON](http://geojson.org) - a format for encoding a variety of geographic data structures.</li> |
| options | - | Type: Object.<br>Representation options. |
| options.mapper | `defaultMapper` | Type: Function.<br>Function for transformation of data object with type `Feature` for polygons. |

## Properties

| Name | Type | Description |
|-|-|-|
| options | [option.Manager](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.Manager.xml) | `Polygonmap` instance options manager. |

## Methods

| Name | Returns | Description |
|-|-|-|
| [getData](#getdata) | Object&nbsp;&#124;&nbsp;null | Returns reference to data provided to constructor or [setData](#setdata) method. |
| [setData](#setdata) | Polygonmap | Adds new data. If `Polygonmap` instance is already rendered, it will be re-rendered. |
| [getMap](#getmap) | Map&nbsp;&#124;&nbsp;null | Returns reference to [Map](http://api.yandex.com/maps/doc/jsapi/2.1/ref/reference/Map.xml) object. |
| [setMap](#setmap) | Polygonmap | Sets [Map](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Map.xml) instance to render polygonmap layer over it. |
| [destroy](#destroy) | - | Destroys `Polygonmap` instance. |

### getData

Returns: reference to data provided to constructor or [setData](#setdata) method.

### setData

Sets new data. If `Polygonmap` instance is already rendered, it will be re-rendered.

Returns: self-reference.

Parameters:

| Parameter | Default value | Description |
|-|-|-|
| data | - | Type: Object.<br> Data. |
| data.polygons | - | Type: Object.<br>Object described using of following formats:<ul><li>[GeoQueryResult](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult.xml) - result of [geoQuery](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geoQuery.xml) execution;</li><li>[GeoJSON](http://geojson.org) - a format for encoding a variety of geographic data structures.</li> |
| data.points | - | Type: Object.<br>Object described using of following formats:<ul><li>[GeoQueryResult](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoQueryResult.xml) - result of [geoQuery](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geoQuery.xml) execution;</li><li>[GeoJSON](http://geojson.org) - a format for encoding a variety of geographic data structures.</li> |

### getMap

Returns: reference to [Map](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Map.xml) object.

### setMap

Sets [Map](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Map.xml) instance to render `Polygonmap` object over it.

Returns: self-reference.

Parameters:

| Parameter | Default value | Description |
|-|-|-|
| map | - | Type: Map<br/>[Map](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Map.xml) instance to render `Polygonmap` object over it. |

### destroy

Destroys `Polygonmap` instance.

## Examples

* Displaying polygonmap over geographical map:

    ```js
    ymaps.modules.require(['Polygonmap'], function (Polygonmap) {
        const dataPolygons = {
                type: 'FeatureCollection',
                features: [{
                    id: 'id3',
                    type: 'Feature',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [
                            [37.782051, -122.445068]
                            [37.782051, -122.445568]
                            [37.782951, -122.445068]
                            [37.782951, -122.445568]
                        ]
                    }
                }]
            };
        const dataPoints = {
                type: 'FeatureCollection',
                features: [{
                    id: 'id1',
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [37.782551, -122.445368]
                    }
                }, {
                    id: 'id2',
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [37.782745, -122.444586]
                    }
                }]
            };
        const data = {polygons: dataPolygons, points: dataPoints};
        const polygonmap = new Polygonmap(data);

        polygonmap.setMap(myMap);
    });
    ```

* Updating polygonmap data:

    ```js
    ymaps.modules.require(['Polygonmap'], function (Polygonmap) {
        const data = {polygons: dataPolygons, points: dataPoints};
        const polygonmap = new Polygonmap(data);

        polygonmap.setMap(myMap);

        const data = {polygons: newDataPolygons, points: newDataPoints};

        polygonmap.setData(newData);
    });
    ```

* Changing polygonmap representation options.

    ```js
    ymaps.modules.require(['Polygonmap'], function (Polygonmap) {
        const data = {polygons: dataPolygons, points: dataPoints};
        const polygonmap = new Polygonmap(data);

        polygonmap.options.set('mapper', (feature) => {
            const {pointsCount, pointsCountMaximum} = feature.properties;
            const k = pointsCount / pointsCountMaximum;

            feature.options = {fillColor: `rgba(0, 0, 0, ${k})`};

            return feature;
        });
        polygonmap.setMap(myMap);
    });

* [Demo](https://yandex-shri-fx-team.github.io/mapsapi-polygonmap/)

## Development

```bash
npm i
npm run build
```

For development:

```bash
npm run dev
```

For linting:

```bash
npm run lint
```

For testing:

```bash
npmr test
```
