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

<a name="module_Polygonmap"></a>

## Polygonmap
Polygonmap module.

**Requires**: <code>module:option.Manager</code>, <code>module:ObjectManager</code>

* [Polygonmap](#module_Polygonmap)
    * [Polygonmap](#exp_module_Polygonmap--Polygonmap) ⏏
        * [new Polygonmap([data], [options])](#new_module_Polygonmap--Polygonmap_new)
        * [.getData()](#module_Polygonmap--Polygonmap+getData) ⇒ <code>Object</code>
        * [.setData(data)](#module_Polygonmap--Polygonmap+setData) ⇒ <code>Polygonmap</code>
        * [.getMap()](#module_Polygonmap--Polygonmap+getMap) ⇒ <code>Map</code>
        * [.setMap(map)](#module_Polygonmap--Polygonmap+setMap) ⇒ <code>Polygonmap</code>
        * [.destroy()](#module_Polygonmap--Polygonmap+destroy)

<a name="exp_module_Polygonmap--Polygonmap"></a>

### Polygonmap ⏏
**Kind**: Exported class
<a name="new_module_Polygonmap--Polygonmap_new"></a>

#### new Polygonmap([data], [options])

| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>Object</code> | Polygons and points. |
| data.polygons | <code>Object</code> | GeoJSON FeatureCollections. |
| data.points | <code>Object</code> | GeoJSON FeatureCollections. |
| [options] | <code>Object</code> | Options for customization. |
| options.colorRanges | <code>number</code> \| <code>array</code> | count of ranges or array of custom ranges |
| options.colorScheme | <code>string</code> \| <code>array</code> | preset for colorize or array of custom colors |
| options.colorOpacity | <code>number</code> | opacity of polygon |
| options.strokeColor | <code>string</code> | color for polygon stroke |
| options.strokeWidth | <code>number</code> | width for polygon stroke |

<a name="module_Polygonmap--Polygonmap+getData"></a>

#### polygonmap.getData() ⇒ <code>Object</code>
Get the data, polygons and points.

**Kind**: instance method of [<code>Polygonmap</code>](#exp_module_Polygonmap--Polygonmap)
**Returns**: <code>Object</code> - Polygons and points.
**Access**: public
<a name="module_Polygonmap--Polygonmap+setData"></a>

#### polygonmap.setData(data) ⇒ <code>Polygonmap</code>
Set the data, polygons and points.

**Kind**: instance method of [<code>Polygonmap</code>](#exp_module_Polygonmap--Polygonmap)
**Returns**: <code>Polygonmap</code> - Self-reference.
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Polygons and points. |
| data.polygons | <code>Object</code> | GeoJSON FeatureCollections. |
| data.points | <code>Object</code> | GeoJSON FeatureCollections. |

<a name="module_Polygonmap--Polygonmap+getMap"></a>

#### polygonmap.getMap() ⇒ <code>Map</code>
Get the Map instance.

**Kind**: instance method of [<code>Polygonmap</code>](#exp_module_Polygonmap--Polygonmap)
**Returns**: <code>Map</code> - Reference to Map instance.
**Access**: public
<a name="module_Polygonmap--Polygonmap+setMap"></a>

#### polygonmap.setMap(map) ⇒ <code>Polygonmap</code>
Set Map instance to render Polygonmap object.

**Kind**: instance method of [<code>Polygonmap</code>](#exp_module_Polygonmap--Polygonmap)
**Returns**: <code>Polygonmap</code> - Self-reference.
**Access**: public

| Param | Type | Description |
| --- | --- | --- |
| map | <code>Map</code> | Map instance. |

<a name="module_Polygonmap--Polygonmap+destroy"></a>

#### polygonmap.destroy()
Destructs Polygonmap instance.

**Kind**: instance method of [<code>Polygonmap</code>](#exp_module_Polygonmap--Polygonmap)
**Access**: public

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
