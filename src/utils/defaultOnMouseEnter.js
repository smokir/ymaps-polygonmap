const defaultOnMouseEnter = (objectManager, e, prevObjectId, options) => {
    const objId = e.get('objectId');

    if (prevObjectId !== objId) {
        objectManager.objects.setObjectOptions(objId, {
            fillOpacity: options.get('hoverOpacity'),
            strokeWidth: options.get('hoverStrokeWidth')
        });
    }
};

export default defaultOnMouseEnter;
