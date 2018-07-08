/**
 * Default handler for mouseLeave event.
 *
 * @param {Object} e Event object.
 * @this Polygonmap
 */
const defaultOnMouseLeave = function (e) {
    const objId = e.get('objectId');
    const object = this.objectManager.objects.getById(objId);
    const fillColor = object.properties.fillColor;

    if (this._prevObjectId !== objId) {
        this.objectManager.objects.setObjectOptions(objId, {
            fillColor,
            fillOpacity: this.options.get('fillOpacity'),
            strokeColor: this.options.get('strokeColor'),
            strokeWidth: this.options.get('strokeWidth')
        });
    }
};

export default defaultOnMouseLeave;
