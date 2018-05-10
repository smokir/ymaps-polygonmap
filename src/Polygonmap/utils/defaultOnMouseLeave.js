const defaultOnMouseLeave = (objectManager, e) => {
    const objId = e.get('objectId');
    objectManager.objects.setObjectOptions(objId, {
        fillOpacity: 1,
        strokeWidth: 1
    });
};

export default defaultOnMouseLeave;
