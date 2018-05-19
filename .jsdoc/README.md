# Yandex Maps API Polygonmap Module

Yandex.Maps API module for data visualization.

**Polygonmap** is a graphical representation of some spatial data, where depending on the number of entered points polygons are painted in different colors.
`Polygonmap` class allows to construct and display such representations over geographical maps.

## Loading

1. Put module source code ([polygonmap.min.js](https://github.com/yandex-shri-fx-team/ymaps-polygonmap/blob/master/umd/polygonmap.min.js)) on your CDN.

2. Load both [Yandex Maps JS API 2.1](http://api.yandex.com/maps/doc/jsapi/) and module source code by adding following code into &lt;head&gt; section of your page:

   ```html
   <script src="http://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
   <!-- Change my.cdn.tld to your CDN host name -->
   <script src="http://my.cdn.tld/polygonmap.min.js" type="text/javascript"></script>
   ```

   If you use [GeoJSON](http://geojson.org) data:

   ```html
   <script src="http://api-maps.yandex.ru/2.1/?lang=ru_RU&coordOrder=longlat" type="text/javascript"></script>
   <!-- Change my.cdn.tld to your CDN host name -->
   <script src="http://my.cdn.tld/polygonmap.min.js" type="text/javascript"></script>
   ```

   If you use [npm](https://www.npmjs.com):

   ```html
   <script src="http://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
   ```

   ```bash
   npm i --save git+https://github.com/yandex-shri-fx-team/ymaps-polygonmap.git
   ```

   ```js
   require('ymaps-polygonmap');

   // Or with babel
   import 'ymaps-polygonmap';
   ```

3. Get access to module functions by using [ymaps.modules.require](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/modules.require.xml) method:

   ```js
   ymaps.modules.require(['Polygonmap'], function (Polygonmap) {
        var polygonmap = new Polygonmap();
   });
   ```

{{>main}}

## Examples

### Displaying polygonmap over geographical map

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

### Updating polygonmap data

```js
ymaps.modules.require(['Polygonmap'], function (Polygonmap) {
    const data = {polygons: dataPolygons, points: dataPoints};
    const polygonmap = new Polygonmap(data);

    polygonmap.setMap(myMap);

    const data = {polygons: newDataPolygons, points: newDataPoints};

    polygonmap.setData(newData);
});
```

### Changing polygonmap representation options

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
```

## Demo

- https://yandex-shri-fx-team.github.io/ymaps-polygonmap
