import { useState } from 'react';
import Layout from '../../components/Layout';
import { sendRequest } from '../../endpoints/send-request';
import { setTokens } from '../../utils/local-storage';



const endpoint = '/location_levels/';


function LocationLevelsGetList(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);

    async function executeRequest() {
        const queryParams = { page, size };

        setRequest(null);
        setResponse({ status: 'loading' });

        const response = await sendRequest({
            endpoint,
            method: 'GET',
            queryParams,
            accessToken: props.tokens.accessTokenData.token
        });

        setResponse({ ...response });
    }

    return (
        <Layout
            form={(<div>
                <div className="form__title">Location Levels - Get List</div>
                <div className="form__field">
                    <label>Page Number</label>
                    <input value={page} onInput={(event) => setPage(event.target.value)} />
                </div>
                <div className="form__field">
                    <label>Page Size (Default: 5)</label>
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

export default LocationLevelsGetList;