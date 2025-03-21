const calculateBodyShape = (shoulderLine, waistLine, hipLine) => {
    const shoulderWidth = shoulderLine.right - shoulderLine.left;
    const waistWidth = waistLine.right - waistLine.left;
    const hipWidth = hipLine.right - hipLine.left;

    const measurements = {
        shoulderWidth,
        waistWidth,
        hipWidth,
        bodyShape: determineBodyShape(shoulderWidth, waistWidth, hipWidth),
    };

    return measurements;
};

const determineBodyShape = (shoulderWidth, waistWidth, hipWidth) => {
    if (waistWidth < shoulderWidth && waistWidth < hipWidth) {
        return 'Hourglass';
    } else if (shoulderWidth > waistWidth && hipWidth > waistWidth) {
        return 'Pear';
    } else if (shoulderWidth > hipWidth) {
        return 'Apple';
    } else {
        return 'Rectangle';
    }
};

export { calculateBodyShape };