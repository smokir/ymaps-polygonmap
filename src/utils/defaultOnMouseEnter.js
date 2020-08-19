/**
 * Default handler for mouseEnter event.
 *
 * @param {Object} e Event object.
 * @this Polygonmap
 */
const defaultOnMouseEnter = function (e) {
    const objId = e.get('objectId');

    if (this._prevObjectId !== objId) {
        const object = this.objectManager.objects.getById(objId);

        const options = {
            fillOpacity: object.options.fillOpacityHover || this.options.get('fillOpacityHover'),
            strokeColor: object.options.strokeColorHover || this.options.get('strokeColorHover'),
            strokeWidth: object.options.strokeWidthHover || this.options.get('strokeWidthHover')
        };

        const fillColor = object.options.fillColorHover || this.options.get('fillColorHover');
        if (fillColor) {
            options.fillColor = fillColor;
        }

        this.objectManager.objects.setObjectOptions(objId, options);
    }
};

export default defaultOnMouseEnter;
