const hour = (hour) => {
    const date = new Date(hour * 1000);
    const timeStr = date.toLocaleTimeString().split(':');
    const short = `${timeStr[0]}:${timeStr[1]}`
    return short;
    }
export {hour};