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
   npm i --save git+https://github.com/yandex-shri-fx-team/mapsapi-polygonmap.git
   ```

   ```js
   require('mapsapi-polygonmap');

   // Or with babel
   import 'mapsapi-polygonmap';
   ```

3. Get access to module functions by using [ymaps.modules.require](http://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/modules.require.xml) method:

   ```js
   ymaps.modules.require(['Polygonmap'], function (Polygonmap) {
        var polygonmap = new Polygonmap();
   });
   ```

{{>main}}

## Demo

- https://yandex-shri-fx-team.github.io/mapsapi-polygonmap/
