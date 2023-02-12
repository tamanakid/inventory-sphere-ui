import { useState } from 'react';
import Layout from '../../components/Layout';
import { sendRequest } from '../../endpoints/send-request';



const endpoint = '/locations/tree/';


function LocationsGetTree(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [isAllLocations, setIsAllLocations] = useState(false);

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'GET',
            queryParams: { 'all_locations': isAllLocations },
            accessToken: props.tokens.accessTokenData.token
        };

        setRequest(request);
        setResponse({ status: 'loading' });
        const response = await sendRequest(request);

        setResponse({ ...response });
    }

    return (
        <Layout
            form={(<div>
                <div className="form__title">Location Levels - Get Tree</div>
                <div className="form__field">
                    <label>Show All Locations</label>
                    <input type="checkbox" checked={isAllLocations} onChange={(event) => setIsAllLocations(event.target.checked)} />
                </div>
                <button onClick={executeRequest}>Execute</button>
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default LocationsGetTree;