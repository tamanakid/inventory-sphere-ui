import { useState, useEffect, useReducer } from 'react';
import { sendRequest } from '../endpoints/send-request';


export default (attributes, setIsLoading, accessToken) => {
    const reducer = (options, action) => {
        return {
            ...options,
            [action.id]: action.options
        };
    }
    const [options, setOptions] = useReducer(reducer, Object.fromEntries(attributes.map(attr => [attr.id, []])));

    useEffect(() => {
        setIsLoading(true);
        Promise.all(
            attributes.map(attr => getOptions(attr.id))
        ).then(() => {
            setIsLoading(false);
        })
    }, [attributes]);

    async function getOptions(attrId) {
        const response = await sendRequest({
            endpoint: `/attribute_values/?attribute=${attrId}`,
            method: 'GET',
            accessToken,
        });

        if (response.body?.['status_code'] === 200) {
            const options = response.body.data.results;
            setOptions({ id: attrId, options });
        }
        return response;
    }

    return options;
}