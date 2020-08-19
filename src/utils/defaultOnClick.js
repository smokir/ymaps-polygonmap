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

    const options = {
        fillOpacity: object.options.fillOpacityActive || this.options.get('fillOpacityActive'),
        strokeColor: object.options.strokeColorActive || this.options.get('strokeColorActive'),
        strokeWidth: object.options.strokeWidthActive || this.options.get('strokeWidthActive')
    };

    const fillColor = object.options.fillColorActive || this.options.get('fillColorActive');
    if (fillColor) {
        options.fillColor = fillColor;
    }

    this.objectManager.objects.setObjectOptions(objId, options);

    const onClose = () => {
        if (this._prevObjectId) {
            const object = this.objectManager.objects.getById(this._prevObjectId);

            if (object) {
                this.objectManager.objects.setObjectOptions(this._prevObjectId, {
                    fillColor: object.options.fillColorDefault,
                    fillOpacity: object.options.fillOpacityDefault,
                    strokeColor: object.options.strokeColorDefault,
                    strokeWidth: object.options.strokeWidthDefault
                });
            }
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
