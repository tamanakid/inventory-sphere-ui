import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import SelectorMultiple from '../../components/SelectorMultiple';
import useGetOptions from '../../utils/useGetOptions';
import useGetAttributeValueOptions from '../../utils/useGetAttributeValueOptions';


const endpoint = '/attribute_values/delete/';


function AttributeValuesDelete(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [selectedIds, setSelectedIds] = useState([]);
    const [attribute, setAttribute] = useState(-1);

    // At component start: load options
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['attributes'], setIsLoading, props.tokens.accessTokenData.token);

    // Special scenario: when retrieving all attributes related to the SKU, this is populated
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const attributeValueOptions = useGetAttributeValueOptions(selectedAttributes, setIsLoading, props.tokens.accessTokenData.token);
    useEffect(() => {
        setSelectedAttributes(options['attributes'].filter(a => a.id == attribute));
    }, [attribute]);

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'POST',
            body: { ids: selectedIds },
            accessToken: props.tokens.accessTokenData.token
        };

        setRequest(request);
        setResponse({ status: 'loading' });
        const response = await sendRequest(request);

        setResponse({ ...response });
    }

    useEffect(() => {
        console.log(selectedIds);
    }, [selectedIds])

    return (
        <Layout
            form={(<div>
                <div className="form__title">Attribute Valuess - Delete</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div>Request Body:</div>
                    <div className="form__field">
                        <label>Attributes</label>
                        <Selector id={attribute} setId={setAttribute} options={options['attributes']} />
                    </div>
                    <div className="form__field">
                        <label>Attribute Values</label>
                        <SelectorMultiple ids={selectedIds} setIds={setSelectedIds} options={attributeValueOptions[attribute] ?? []} />
                    </div>
                    <button disabled={isLoading} onClick={executeRequest}>Execute</button>
                </>}
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default AttributeValuesDelete;