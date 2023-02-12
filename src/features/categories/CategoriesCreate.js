import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import SelectorMultiple from '../../components/SelectorMultiple';



const endpoint = '/categories/';


function CategoriesCreate(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [name, setName] = useState('');
    const [parentId, setParentId] = useState(-1);
    const [attributesRequired, setAttributesRequired] = useState([]);
    const [attributesNotRequired, setAttributesNotRequired] = useState([]);

    const [attributeOptions, setAttributeOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    // At component start: load existing Attributes
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            getAttributeOptions(),
            getCategoryOptions()
        ]).then(() => {
            setIsLoading(false);
        });
    }, []);

    async function getAttributeOptions() {
        const response = await sendRequest({
            endpoint: '/attributes/',
            method: 'GET',
            accessToken: props.tokens.accessTokenData.token
        });
        if (response.body?.['status_code'] === 200) {
            setAttributeOptions(response.body.data.results);
        }
    }

    async function getCategoryOptions() {
        const response = await sendRequest({
            endpoint: '/categories/',
            method: 'GET',
            accessToken: props.tokens.accessTokenData.token
        });
        if (response.body?.['status_code'] === 200) {
            setCategoryOptions(response.body.data.results);
        }
    }

    async function executeRequest() {
        const parent = parentId == -1 ? null : parentId;
        const request = {
            endpoint,
            method: 'POST',
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
                <div className="form__title">Categories - Create</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div>Request Body:</div>
                    <div className="form__field">
                        <label>Name</label>
                        <input value={name} onInput={(event) => setName(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Parent Category</label>
                        <Selector id={parentId} setId={setParentId} options={categoryOptions} />
                    </div>
                    <div className="form__field">
                        <label>Attributes (Required)</label>
                        <SelectorMultiple
                            ids={attributesRequired} setIds={setAttributesRequired} options={attributeOptions}
                        />
                    </div>
                    <div className="form__field">
                        <label>Attributes (Not Required)</label>
                        <SelectorMultiple
                            ids={attributesNotRequired} setIds={setAttributesNotRequired} options={attributeOptions}
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

export default CategoriesCreate;