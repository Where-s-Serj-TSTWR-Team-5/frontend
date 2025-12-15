/**
     * This function fetches the data from the API
     * @param url
     */
export const getData = async (url, fetchFn = fetch) => {
    const response = await fetchFn(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }

    return await response.json();
};

/**
 * This function handles multiple request
 * @param urls
 */
export const getPromisesData = async (urls) => {
    try {
        const response = await Promise.all(urls);
        return response;
    } catch (error) {
        return error;
    }
};