import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import useGetOptions from '../../utils/useGetOptions';
import useGetAttributeValueOptions from '../../utils/useGetAttributeValueOptions';



function AttributeValuesGetInstance(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [instanceId, setInstanceId] = useState(-1);
    const [attributeId, setAttributeId] = useState(-1);
    const [attributeObj, setAttributeObj] = useState([]);
    useEffect(() => {
        setAttributeObj(attributeOptions.filter(opt => opt.id == attributeId))
    }, [attributeId]);


    // Set endpoint URL with id param
    const [endpoint, setEndpoint] = useState('/attribute_values/');
    useEffect(() => {
        setEndpoint(`/attribute_values/${instanceId}`);
    }, [instanceId]);

    // At component start: load existing list of entities
    const [isLoading, setIsLoading] = useState(true);
    const attributeOptions = useGetOptions(['attributes'], setIsLoading, props.tokens.accessTokenData.token)['attributes'];
    const attributeValueOptions = useGetAttributeValueOptions(attributeObj, setIsLoading, props.tokens.accessTokenData.token);

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
                <div className="form__title">Attribute Values - Get Instance</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div className="form__field">
                        <label>Attribute</label>
                        <Selector id={attributeId} setId={setAttributeId} options={attributeOptions} />
                    </div>
                    <div className="form__field">
                        <label>Attribute Value</label>
                        <Selector id={instanceId} setId={setInstanceId} options={attributeValueOptions[attributeId] ?? []} />
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

export default AttributeValuesGetInstance;