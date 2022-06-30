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
