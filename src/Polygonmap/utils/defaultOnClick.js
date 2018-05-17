const defaultOnClick = (objectManager, e, prevObjectId, balloon, options) => {
    const objId = e.get('objectId');
    const object = objectManager.objects.getById(objId);
    const balloonContent = options.get('balloonContent');

    balloon.setData({
        content: balloonContent(object)
    });

    balloon.open(e.get('coords'));

    if (prevObjectId) {
        objectManager.objects.setObjectOptions(prevObjectId, {
            fillOpacity: options.get('initialOpacity'),
            strokeWidth: options.get('initialStrokeWidth')
        });
    }

    objectManager.objects.setObjectOptions(objId, {
        fillOpacity: options.get('activeOpacity'),
        strokeWidth: options.get('activeStrokeWidth')
    });
};

export default defaultOnClick;
