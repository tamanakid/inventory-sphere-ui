import { useState, useEffect, useReducer } from 'react';
import { sendRequest } from '../endpoints/send-request';


export default (optionFeatures, setIsLoading, accessToken) => {
    const reducer = (options, action) => {
        return {
            ...options,
            [action.feature]: action.featureOptions
        };
    }
    const [options, setOptions] = useReducer(reducer, Object.fromEntries(optionFeatures.map(feat => [feat, []])));

    useEffect(() => {
        setIsLoading(true);
        Promise.all(
            optionFeatures.map(feature => getOptions(feature))
        ).then(() => {
            setIsLoading(false);
        })
    }, []);

    async function getOptions(feature) {
        const endpoint = (feature == 'locations') ? `/${feature}/?all=true` : `/${feature}/`;

        const response = await sendRequest({
            endpoint,
            method: 'GET',
            accessToken,
        });

        if (response.body?.['status_code'] === 200) {
            const featureOptions = response.body.data.results;
            setOptions({ feature, featureOptions });
        }
        return response;
    }

    return options;
}