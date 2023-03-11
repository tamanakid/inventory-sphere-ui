import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import useGetOptions from '../../utils/useGetOptions';



function ProductsGetInstance(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [instanceId, setInstanceId] = useState(-1);

    // Set endpoint URL with id param
    const [endpoint, setEndpoint] = useState('/products/');
    useEffect(() => {
        setEndpoint(`/products/${instanceId}`);
    }, [instanceId]);

    // At component start: load existing Attributes and Categories
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['products'], setIsLoading, props.tokens.accessTokenData.token);

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
                <div className="form__title">Products - Get Instance</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div className="form__field">
                        <label>Instance</label>
                        <Selector id={instanceId} setId={setInstanceId} options={options['products']} />
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

export default ProductsGetInstance;