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

    if (this._prevObjectId) {
        this.objectManager.objects.setObjectOptions(this._prevObjectId, {
            fillOpacity: this.options.get('fillOpacity'),
            strokeWidth: this.options.get('strokeWidth')
        });
    }

    this.objectManager.objects.setObjectOptions(objId, {
        fillOpacity: this.options.get('fillOpacityActive'),
        strokeWidth: this.options.get('strokeWidthActive')
    });

    this._prevObjectId = objId;

    this.balloon.events.add('close', () => {
        this.objectManager.objects.setObjectOptions(this._prevObjectId, {
            fillOpacity: this.options.get('fillOpacity'),
            strokeWidth: this.options.get('strokeWidth')
        });

        this._prevObjectId = null;
    });
};

export default defaultOnClick;
