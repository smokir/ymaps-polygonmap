const defaultOnMouseLeave = (objectManager, e, prevObjectId, options) => {
    const objId = e.get('objectId');

    if (prevObjectId !== objId) {
        objectManager.objects.setObjectOptions(objId, {
            fillOpacity: options.get('initialOpacity'),
            strokeWidth: options.get('initialStrokeWidth')
        });
    }
};

export default defaultOnMouseLeave;
