import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { sendRequest } from '../../endpoints/send-request';



function CategoriesGetInstance(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [instanceId, setInstanceId] = useState('');

    // Set endpoint URL with id param
    const [endpoint, setEndpoint] = useState('/categories/');
    useEffect(() => {
        setEndpoint(`/categories/${instanceId}`);
    }, [instanceId]);

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'GET',
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
                <div className="form__title">Categories - Get Instance</div>
                <div className="form__field">
                    <label>Instance ID</label>
                    <input value={instanceId} onInput={(event) => setInstanceId(event.target.value)} />
                </div>
                <button onClick={executeRequest}>Execute</button>
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default CategoriesGetInstance;