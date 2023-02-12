import { useState, useEffect } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';



const endpoint = '/categories/';


function CategoriesGetList(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(100);
    const [name, setName] = useState('');
    const [attributes, setAttributes] = useState(-1);

    const [attributeOptions, setAttributeOptions] = useState([]);
    // At component start: load existing Attributes
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getAttributeOptions();
    }, []);

    async function getAttributeOptions() {
        setIsLoading(true);
        const response = await sendRequest({
            endpoint: '/attributes/',
            method: 'GET',
            accessToken: props.tokens.accessTokenData.token
        });
        if (response.body?.['status_code'] === 200) {
            setAttributeOptions(response.body.data.results);
        }
        setIsLoading(false);
    }


    async function executeRequest() {
        const queryParams = { page, size };
        if (name) queryParams.name = name;
        if (attributes != -1) queryParams.attributes = attributes;

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
                <div className="form__title">Categories - Get List</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
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
                    <div className="form__field">
                        <label>Attributes</label>
                        <Selector
                            id={attributes} setId={setAttributes} options={attributeOptions}
                        />
                    </div>
                    <button onClick={executeRequest}>Execute</button>
                </>}
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default CategoriesGetList;