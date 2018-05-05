function sin(angle) {
    return Math.sin(Math.PI * angle / 180);
}

function cos(angle) {
    return Math.cos(Math.PI * angle / 180);
}

function hexagonGrid(map, zoom, R, offsetLeft, offsetTop, width, height) {
    const SIN_OF_SIXTY = sin(60);
    const colWidth = 1.5 * R;
    const rowHeight = 1.5 * R;
    const cols = Math.floor((width + (R / 2)) / colWidth) + 1;
    const rows = Math.floor(height / rowHeight);

    const result = {type: 'FeatureCollection', features: []};
    const projection = map.options.get('projection');

    let id = 0;
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
            const horizontalShift = (c % 2 === 0) ? 0 : -1 * SIN_OF_SIXTY;
            const x = c * 1.5;
            const y = r * (2 * SIN_OF_SIXTY) + horizontalShift;
            const hexagon = [
                [cos(0) + x, sin(0) + y],
                [cos(60) + x, sin(60) + y],
                [cos(120) + x, sin(120) + y],
                [cos(180) + x, sin(180) + y],
                [cos(240) + x, sin(240) + y],
                [cos(300) + x, sin(300) + y],
                [cos(0) + x, sin(0) + y]
            ];
            const hexagonGlobals = hexagon
                .map((point) => {
                    return projection.fromGlobalPixels([offsetLeft + (point[0] * R), offsetTop + (point[1] * R)], zoom);
                })
                .map((coords) => {
                    return [coords[1], coords[0]];
                });

            result.features.push({
                type: 'Feature',
                id: 'hxg' + id++,
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        hexagonGlobals
                    ]
                },
                properties: {}
            });
        }
    }
    return result;
}

export default hexagonGrid;
