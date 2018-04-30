const convertCoordinates = (arr) => {
    if (arr.length === 2 && typeof arr[0] === 'number' && typeof arr[1] === 'number') {
        return arr.reverse();
    } else if (arr.length > 0 && arr[0] instanceof Array) {
        return arr.map(convertCoordinates);
    } else {
        return arr;
    }
};

export default convertCoordinates;
