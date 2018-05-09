import contains from 'robust-point-in-polygon';

const inside = (polygon, point) => {
    const pointCoord = point.coordinates;
    const polygonsCoord = polygon.coordinates;
    const polygonCoord = polygonsCoord[0];

    let result = contains(polygonCoord, pointCoord) !== 1;

    if (result) {
        for (let k = 1; k < polygonsCoord.length && result; k++) {
            const holeCoord = polygonsCoord[k];
            const isInsideHole = contains(holeCoord, pointCoord) !== 1;

            if (isInsideHole) {
                result = !isInsideHole;
            }
        }
    } else {
        for (let k = 1; k < polygonsCoord.length && !result; k++) {
            const polygonCoord = polygonsCoord[k];
            const isInsidePolygon = contains(polygonCoord, pointCoord) !== 1;

            if (isInsidePolygon) {
                result = isInsidePolygon;
            }
        }
    }

    return result;
};

export default inside;
