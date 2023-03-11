import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import SelectorMultiple from '../../components/SelectorMultiple';
import useGetOptions from '../../utils/useGetOptions';



const endpoint = '/products/';

function ProductsCreate(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState(-1);
    const [attributesRequired, setAttributesRequired] = useState([]);
    const [attributesNotRequired, setAttributesNotRequired] = useState([]);

    // At component start: load existing Attributes and Categories
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['categories', 'attributes', 'products'], setIsLoading, props.tokens.accessTokenData.token);

    async function executeRequest() {
        const parent = category == -1 ? null : category;
        const request = {
            endpoint,
            method: 'POST',
            body: { name, brand, category, 'attribute_ids_required': attributesRequired, 'attribute_ids_not_required': attributesNotRequired, },
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
                <div className="form__title">Products - Create</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div>Request Body:</div>
                    <div className="form__field">
                        <label>Name</label>
                        <input value={name} onInput={(event) => setName(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Brand</label>
                        <input value={brand} onInput={(event) => setBrand(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Parent Category</label>
                        <Selector id={category} setId={setCategory} options={options['categories'] ?? []} />
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

export default ProductsCreate;