/**
 * Default handler for mouseLeave event.
 *
 * @param {Object} e Event object.
 * @this Polygonmap
 */
const defaultOnMouseLeave = function (e) {
    const objId = e.get('objectId');

    if (this._prevObjectId !== objId) {
        this.objectManager.objects.setObjectOptions(objId, {
            fillOpacity: this.options.get('fillOpacity'),
            strokeWidth: this.options.get('strokeWidth')
        });
    }
};

export default defaultOnMouseLeave;
