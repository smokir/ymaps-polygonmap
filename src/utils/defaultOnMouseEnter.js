const defaultOnMouseEnter = (objectManager, e, prevObjectId) => {
    const objId = e.get('objectId');

    if (prevObjectId !== objId) {
        objectManager.objects.setObjectOptions(objId, {
            fillOpacity: 0.9,
            strokeWidth: 2
        });
    }
};

export default defaultOnMouseEnter;
