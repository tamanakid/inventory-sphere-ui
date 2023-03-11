import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import SelectorMultiple from '../../components/SelectorMultiple';
import useGetOptions from '../../utils/useGetOptions';
import useGetAttributeValueOptions from '../../utils/useGetAttributeValueOptions';



function ProductSKUsUpdate(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [instanceId, setInstanceId] = useState(-1);
    const [description, setDescription] = useState('');
    const [product, setProduct] = useState(-1);
    const [attributeValues, setAttributeValues] = useState([]);

    // Cool effect: when selecting instance, fetch category info and fill all fields
    useEffect(() => {
        if (instanceId != -1)
            getCategoryDetails();
    }, [instanceId]);

    async function getCategoryDetails() {
        const response = await sendRequest({
            endpoint: `/product_skus/${instanceId}`,
            method: 'GET',
            accessToken: props.tokens.accessTokenData.token
        });
        if (response.body?.['status_code'] === 200) {
            const instanceData = response.body.data;
            setDescription(instanceData.description ?? '');
            setProduct(instanceData.product?.id ?? -1);
            setRelatedAttributes(instanceData.attributes ?? []);
            setAttributeValues(instanceData.attribute_values.map(a => a.id));
        }
    }

    // At component start: load existing Attributes and Categories
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['products', 'product_skus'], setIsLoading, props.tokens.accessTokenData.token);

    // Special scenario: when retrieving all attributes related to the SKU, this is populated
    const [relatedAttributes, setRelatedAttributes] = useState([]);
    const attributeValueOptions = useGetAttributeValueOptions(relatedAttributes, setIsLoading, props.tokens.accessTokenData.token);

    // Set endpoint URL with id param
    const [endpoint, setEndpoint] = useState('/product_skus/');
    useEffect(() => {
        setEndpoint(`/product_skus/${instanceId}`);
    }, [instanceId]);

    async function executeRequest() {
        const parent = product == -1 ? null : product;
        const request = {
            endpoint,
            method: 'PUT',
            body: { description, product, 'attribute_value_ids': attributeValues },
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
                <div className="form__title">Products - Update</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div className="form__field">
                        <label>Instance</label>
                        <Selector id={instanceId} setId={setInstanceId} options={options['product_skus'] ?? []} 
                            customOptionText={(opt) => `(${opt.id}) ${opt.description}`}
                        />
                    </div>
                    <div>Request Body:</div>
                    <div className="form__field">
                        <label>Description</label>
                        <input value={description} onInput={(event) => setDescription(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Product</label>
                        <Selector id={product} setId={setProduct} options={options['products'] ?? []} />
                    </div>

                    {relatedAttributes.map(attr => {
                        console.log('rendering attribute:', attr);
                        console.log(attributeValueOptions);
                        return (
                            <div className="form__field" key={attr.id}>
                                <label>
                                    <div>Attribute Values for {attr.name} ({attr.id})</div>
                                    <div>{attr.is_attribute_required ? 'Required' : 'Not Required'}</div>
                                </label>
                                <SelectorMultiple
                                    ids={attributeValues} setIds={setAttributeValues} options={attributeValueOptions[attr.id] ?? []}
                                />
                            </div>
                        );
                    })}

                    <button disabled={isLoading} onClick={executeRequest}>Execute</button>
                </>}
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default ProductSKUsUpdate;