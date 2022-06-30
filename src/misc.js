export const formatAnimeFormat = (format) => {
    if (format === "OVA" || format === "ONA") {
        return format;
    } else if (format === "TV") {
        return "TV Show";
    } else if (format === "TV_SHORT") {
        return "TV Short";
    } else {
        let result = format;
        result = result.toLowerCase();
        result = result[0].toUpperCase() + result.slice(1);
        return result;
    }
};
export const capitalizeFirst = (string) => {
    let result = string;
    result = result.toLowerCase();
    result = result[0].toUpperCase() + result.slice(1);
    return result;
};
