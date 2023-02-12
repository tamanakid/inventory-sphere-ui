import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import SelectorMultiple from '../../components/SelectorMultiple';



const endpoint = '/location_levels/delete/';


function LocationLevelsDelete(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [selectedIds, setSelectedIds] = useState([]);
    const [locationLevelOptions, setLocationLevelOptions] = useState([]);

    // At component start: load existing LocationLevel parents
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getLocationLevelOptions();
    }, []);

    async function getLocationLevelOptions() {
        setIsLoading(true);
        const response = await sendRequest({
            endpoint: '/location_levels/',
            method: 'GET',
            accessToken: props.tokens.accessTokenData.token
        });
        if (response.body?.['status_code'] === 200) {
            setLocationLevelOptions(response.body.data.results);
        }
        setIsLoading(false);
    }

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'POST',
            body: { ids: selectedIds },
            accessToken: props.tokens.accessTokenData.token
        };

        setRequest(request);
        setResponse({ status: 'loading' });
        const response = await sendRequest(request);

        setResponse({ ...response });
    }

    useEffect(() => {
        console.log(selectedIds);
    }, [selectedIds])

    return (
        <Layout
            form={(<div>
                <div className="form__title">Location Levels - Delete</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div className="form__field">
                        <label>Parent Location Level</label>
                        <SelectorMultiple
                            ids={selectedIds} setIds={setSelectedIds} options={locationLevelOptions}
                        />
                    </div>
                    <button disabled={isLoading} onClick={executeRequest}>Execute</button>
                </>}
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default LocationLevelsDelete;