import { useState, useEffect } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';



const endpoint = '/attributes/';


function AttributesGetList(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(100);
    const [name, setName] = useState('');

    async function executeRequest() {
        const queryParams = { page, size };
        if (name) queryParams.name = name;

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
                <div className="form__title">Attributes - Get List</div>
                <div>Query Params:</div>
                <div className="form__field">
                    <label>Page Number</label>
                    <input value={page} onInput={(event) => setPage(event.target.value)} />
                </div>
                <div className="form__field">
                    <label>Page Size (Default: 100)</label>
                    <input value={size} onInput={(event) => setSize(event.target.value)} />
                </div>
                <div className="form__field">
                    <label>Name</label>
                    <input value={name} onInput={(event) => setName(event.target.value)} />
                </div>
                <button onClick={executeRequest}>Execute</button>
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default AttributesGetList;