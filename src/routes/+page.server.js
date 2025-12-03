import { getData } from "$lib/helpers/ajaxhelper.js";
import { PUBLIC_API_URL } from "$env/static/public";

/**
 * Function to load appointments
 * @returns 
 */
export const load = async () => {
    // fetch appointments urls
    const appUrls = await getData(`${PUBLIC_API_URL}/events/`);
    const appUrlsData = appUrls.data;

    console.log(appUrls);
    
    // // setup the promises
    // const promises = appUrlsData.map((url) => getData(`${PUBLIC_API_URL}${url}`));

    // // fetch all appointments
    // try {
    //     const appointments = await Promise.all(promises);
    //     console.log(appointments);
    //     return { appointments };
    // } catch (error) {
    //     console.log('🐮', error);
    //     return { error };
    // }
    const events = appUrls;
    return { events }
};