/**
 * defaultBalloonContent
 * @param {Object} object Stores in itself info about polygon and points inside.
 * @returns {string} Template of baloon.
 */
const defaultBalloonContent = (object) => {
    return `<div>
            <h3>Данные об объекте</h3>
            <div>Количество точек: ${object.properties.pointsCount}</div>
    </div>`;
};

export default defaultBalloonContent;
