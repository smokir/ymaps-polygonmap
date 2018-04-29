import './../Polygonmap/Polygonmap';

ymaps.ready(() => {
    // eslint-disable-next-line no-unused-vars
    const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
    });

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        const data = [[37.782551, -122.445368], [37.782745, -122.444586]];
        const polygonmap = new Polygonmap(data);

        polygonmap.setMap(myMap);
    });
});
