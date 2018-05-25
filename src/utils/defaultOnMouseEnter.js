/**
 * Default handler for mouseEnter event.
 *
 * @param {Object} e Event object.
 * @this Polygonmap
 */
const defaultOnMouseEnter = function (e) {
    const objId = e.get('objectId');

    if (this._prevObjectId !== objId) {
        this.objectManager.objects.setObjectOptions(objId, {
            fillOpacity: this.options.get('fillOpacityHover'),
            strokeWidth: this.options.get('strokeWidthHover')
        });
    }
};

export default defaultOnMouseEnter;
