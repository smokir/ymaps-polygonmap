import './../Polygonmap/Polygonmap';

ymaps.ready(() => {
    // eslint-disable-next-line no-unused-vars
    const myMap = new ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 9,
        controls: ['zoomControl', 'typeSelector']
    });

    ymaps.modules.require(['Polygonmap'], (Polygonmap) => {
        const data = [];
        const polygonmap = new Polygonmap(data);

        polygonmap.setMap(myMap);
    });
});
