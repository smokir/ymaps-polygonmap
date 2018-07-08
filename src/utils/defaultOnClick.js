/**
 * Default handler for Click event. Creates balloon, opens it with custom content.
 * Changes options for view of object.
 *
 * @param {Object} e Event object.
 * @this Polygonmap
 */
const defaultOnClick = function (e) {
    const objId = e.get('objectId');
    const object = this.objectManager.objects.getById(objId);
    const balloonContent = this.options.get('balloonContent');

    this.balloon.setData({
        content: balloonContent(object)
    });
    this.balloon.open(e.get('coords'));

    const fillColor = this.options.get('fillColorActive');
    const options = {
        fillOpacity: this.options.get('fillOpacityActive'),
        strokeColor: this.options.get('strokeColorActive'),
        strokeWidth: this.options.get('strokeWidthActive')
    };

    if (fillColor) {
        options.fillColor = fillColor;
    }

    this.objectManager.objects.setObjectOptions(objId, options);

    const onClose = () => {
        if (this._prevObjectId) {
            const object = this.objectManager.objects.getById(this._prevObjectId);
            const fillColor = object.properties.fillColor;

            this.objectManager.objects.setObjectOptions(this._prevObjectId, {
                fillColor,
                fillOpacity: this.options.get('fillOpacity'),
                strokeColor: this.options.get('strokeColor'),
                strokeWidth: this.options.get('strokeWidth')
            });
        }
    };

    onClose();
    this._prevObjectId = objId;

    this.balloon.events.add('close', () => {
        onClose();
        this._prevObjectId = null;
    });
};

export default defaultOnClick;
