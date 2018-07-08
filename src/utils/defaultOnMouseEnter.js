/**
 * Default handler for mouseEnter event.
 *
 * @param {Object} e Event object.
 * @this Polygonmap
 */
const defaultOnMouseEnter = function (e) {
    const objId = e.get('objectId');

    if (this._prevObjectId !== objId) {
        const fillColor = this.options.get('fillColorHover');
        const options = {
            fillOpacity: this.options.get('fillOpacityHover'),
            strokeColor: this.options.get('strokeColorHover'),
            strokeWidth: this.options.get('strokeWidthHover')
        };

        if (fillColor) {
            options.fillColor = fillColor;
        }

        this.objectManager.objects.setObjectOptions(objId, options);
    }
};

export default defaultOnMouseEnter;
