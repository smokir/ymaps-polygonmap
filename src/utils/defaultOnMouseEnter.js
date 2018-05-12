const defaultOnMouseEnter = (objectManager, e) => {
    const objId = e.get('objectId');
    objectManager.objects.setObjectOptions(objId, {
        fillOpacity: 0.5,
        strokeWidth: 2
    });
};

export default defaultOnMouseEnter;
