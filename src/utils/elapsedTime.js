/* eslint-disable new-cap */
const ten = (date) => {
    if (date < 10) {
        return `0${date}`;
    }
};

export const elapsedTimeCalculation = (time) => {
    const date = new Date();
    const diff = date - time;
    if (diff > 3.154e10) {
        return `${ten(time.getDate())}.${ten(time.getMonth())}.${ten(
            time.FullYear()
        )}`;
    } else if (diff > 2.628e9) {
        return `${ten(time.getDate())} ${time.toLocaleString("en-EN", {
            month: "short"
        })}`;
    } else if (diff > 8.64e7) {
        return `${ten(time.getDate())} дней назад`;
    } else if (diff > 3.6e6) {
        return `${Math.floor(diff / 3.6e6)} часов назад`;
    } else if (diff > 1.8e6) {
        return `30 минут назад`;
    } else if (diff > 60000 && diff < 1.8e6) {
        return `${Math.floor(diff / 60000)} минут назад`;
    } else if (diff > 1000) {
        return `${Math.floor(diff / 1000)} секунд назад`;
    } else {
        return "сейчас";
    }
};
