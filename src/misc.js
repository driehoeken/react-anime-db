export const formatAnimeFormat = (format) => {
    if (format === "OVA" || format === "ONA") {
        return format;
    } else if (format === "TV") {
        return "TV Show";
    } else if (format === "TV_SHORT") {
        return "TV Short";
    } else {
        return capitalizeOnlyFirst(format);
    }
};
export const formatAnimeStatus = (status) => {
    let result = status.replace("_", " ");
    return capitalizeOnlyFirst(result);
};
export const capitalizeOnlyFirst = (string) => {
    let result = string;
    result = result.toLowerCase();
    result = result[0].toUpperCase() + result.slice(1);
    return result;
};
export const minsToHoursAndMins = (duration) => {
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;
    let outcome = "";

    if (hours === 1) {
        outcome += `1 hour`;
    } else if (hours > 1) {
        outcome += `${hours} hours`;
    }

    if (hours !== 0 && minutes !== 0) {
        outcome += ", ";
    }
    if (minutes === 1) {
        outcome += `1 minute`;
    } else if (minutes > 1) {
        outcome += `${minutes} minutes`;
    }
    return outcome;
};
export const secsToHoursAndMins = (time) => {
    //just things with plural etc

    const days = Math.floor(time / 86400);
    const hours = Math.floor((time - days * 86400) / 3600);

    if (days === 0 && hours === 0) {
        return 0;
    }

    let outcome = "";
    if (days === 1) {
        outcome += `${days} day `;
    } else if (days > 1) {
        outcome += `${days} days `;
    }

    //if both hours and minutes are not zero it will add and in order for better readability

    if (days !== 0 && hours !== 0) {
        outcome += "and ";
    }

    if (hours === 1) {
        outcome += `${hours} hour`;
    } else if (hours > 1) {
        outcome += `${hours} hours`;
    }

    return outcome;
};
export const setEpAiringMessage = (episode, leftTime) => {
    if (leftTime !== 0) {
        return `${episode} episode airing in ${leftTime}`;
    } else {
        return `${episode} episode airing in less than hour`;
    }
};
