const defaultOnMouseLeave = (objectManager, e, prevObjectId) => {
    const objId = e.get('objectId');

    if (prevObjectId !== objId) {
        objectManager.objects.setObjectOptions(objId, {
            fillOpacity: 1,
            strokeWidth: 1
        });
    }
};

export default defaultOnMouseLeave;
