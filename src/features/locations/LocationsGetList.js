import { useState } from 'react';
import Layout from '../../components/Layout';
import { sendRequest } from '../../endpoints/send-request';



const endpoint = '/locations/';


function LocationsGetList(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(100);
    const [all, setAll] = useState(false);

    async function executeRequest() {
        const queryParams = { page, size };
        if (all) queryParams.all = true;

        const request = {
            endpoint,
            method: 'GET',
            queryParams,
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
                <div className="form__title">Locations - Get List</div>
                <div className="form__field">
                    <label>Page Number</label>
                    <input value={page} onInput={(event) => setPage(event.target.value)} />
                </div>
                <div className="form__field">
                    <label>Page Size (Default: 100)</label>
                    <input value={size} onInput={(event) => setSize(event.target.value)} />
                </div>
                <div className="form__field">
                    <label>All Locations</label>
                    <input type="checkbox" checked={all} onChange={(event) => setAll(event.target.checked)} />
                </div>
                <button onClick={executeRequest}>Execute</button>
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default LocationsGetList;