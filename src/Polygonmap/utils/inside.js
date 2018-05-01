import contains from 'robust-point-in-polygon';

const inside = (polygon, point) => {
    function isInside(polygonCoord, pointCoord) {
        return contains(polygonCoord, pointCoord) !== 1;
    }

    // TODO: Check format, is it GeoJSON
    const pointCoord = point.coordinates;
    const polygonsCoord = polygon.coordinates;
    const polygonCoord = polygonsCoord[0];

    let result = false;

    result = isInside(polygonCoord, pointCoord);

    if (result) {
        for (let k = 1; k < polygonsCoord.length && !result; k++) {
            const holeCoord = polygonsCoord[k];
            const isInsideHole = isInside(holeCoord, pointCoord);

            if (isInsideHole) {
                result = !isInsideHole;
            }
        }
    } else {
        for (let k = 1; k < polygonsCoord.length; k++) {
            const polygonCoord = polygonsCoord[k];
            const isInsidePolygon = isInside(polygonCoord, pointCoord);

            if (isInsidePolygon) {
                result = isInsidePolygon;
            }
        }
    }

    return result;
};

export default inside;
