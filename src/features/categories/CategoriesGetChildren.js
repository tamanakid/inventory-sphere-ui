import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import useGetOptions from '../../utils/useGetOptions';



function CategoriesGetChildren(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [instanceId, setInstanceId] = useState(-1);

    // Set endpoint URL with id param
    const [endpoint, setEndpoint] = useState('/categories/');
    useEffect(() => {
        setEndpoint(`/categories/${instanceId}/children/`);
    }, [instanceId]);

    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['categories'], setIsLoading, props.tokens.accessTokenData.token);

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
                <div className="form__title">Categories - Get Children</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div className="form__field">
                        <label>Instance</label>
                        <Selector id={instanceId} setId={setInstanceId} options={options['categories']} />
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

export default CategoriesGetChildren;