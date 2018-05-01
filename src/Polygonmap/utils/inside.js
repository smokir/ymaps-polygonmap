import contains from 'robust-point-in-polygon';

const inside = (polygon, point) => {
    function isInside(polygonCoord, pointCoord) {
        return contains(polygonCoord, pointCoord) !== 1;
    }

    const pointCoord = point.coordinates;
    const polygonsCoord = polygon.coordinates;

    let result = false;

    for (let i = 0; i < polygonsCoord.length && !result; i++) {
        const polygonCoord = polygonsCoord[i];

        result = isInside(polygonCoord, pointCoord);

        if (result) {
            for (let k = 1; i < polygonCoord.length && !result; i++) {
                const holeCoord = polygonsCoord[k];

                result = !isInside(holeCoord, pointCoord);
            }

            if (result) {
                return result;
            }
        }
    }

    return result;
};

export default inside;
