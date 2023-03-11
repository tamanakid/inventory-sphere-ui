import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import SelectorMultiple from '../../components/SelectorMultiple';
import useGetOptions from '../../utils/useGetOptions';



function CategoriesUpdate(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [instanceId, setInstanceId] = useState(-1);
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState(-1);
    const [attributesRequired, setAttributesRequired] = useState([]);
    const [attributesNotRequired, setAttributesNotRequired] = useState([]);

    // Cool effect: when selecting instance, fetch category info and fill all fields
    useEffect(() => {
        if (instanceId != -1)
            getCategoryDetails();
    }, [instanceId]);

    async function getCategoryDetails() {
        const response = await sendRequest({
            endpoint: `/categories/${instanceId}`,
            method: 'GET',
            accessToken: props.tokens.accessTokenData.token
        });
        if (response.body?.['status_code'] === 200) {
            const instanceData = response.body.data;
            setName(instanceData.name ?? '');
            setParentId(instanceData.parent ?? -1);
            setAttributesRequired(instanceData.attributes.filter(a => a['is_attribute_required']).map(a => a.id));
            setAttributesNotRequired(instanceData.attributes.filter(a => !a['is_attribute_required']).map(a => a.id));
        }
    }

    // At component start: load existing Attributes and Categories
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['categories', 'attributes'], setIsLoading, props.tokens.accessTokenData.token);

    // Set endpoint URL with id param
    const [endpoint, setEndpoint] = useState('/categories/');
    useEffect(() => {
        setEndpoint(`/categories/${instanceId}`);
    }, [instanceId]);

    async function executeRequest() {
        const parent = parentId == -1 ? null : parentId;
        const request = {
            endpoint,
            method: 'PUT',
            body: { name, parent, 'attribute_ids_required': attributesRequired, 'attribute_ids_not_required': attributesNotRequired, },
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
                <div className="form__title">Categories - Update</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div className="form__field">
                        <label>Instance</label>
                        <Selector id={instanceId} setId={setInstanceId} options={options['categories'] ?? []} />
                    </div>
                    <div>Request Body:</div>
                    <div className="form__field">
                        <label>Name</label>
                        <input value={name} onInput={(event) => setName(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Parent Category</label>
                        <Selector id={parentId} setId={setParentId} options={options['categories'] ?? []} />
                    </div>
                    <div className="form__field">
                        <label>Attributes (Required)</label>
                        <SelectorMultiple
                            ids={attributesRequired} setIds={setAttributesRequired} options={options['attributes'] ?? []}
                        />
                    </div>
                    <div className="form__field">
                        <label>Attributes (Not Required)</label>
                        <SelectorMultiple
                            ids={attributesNotRequired} setIds={setAttributesNotRequired} options={options['attributes'] ?? []}
                        />
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

export default CategoriesUpdate;