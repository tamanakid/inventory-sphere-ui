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

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'GET',
            queryParams: { page, size },
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
                <button onClick={executeRequest}>Execute</button>
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default LocationsGetList;