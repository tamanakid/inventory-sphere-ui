import { useState, useEffect } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import useGetOptions from '../../utils/useGetOptions';



const endpoint = '/product_skus/';


function ProductSKUsGetList(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(100);
    const [description, setDescription] = useState('');
    const [product, setProduct] = useState(-1);
    const [isValid, setIsValid] = useState(-1);
    const isValidOptions = [
        { id: true, name : 'True' },
        { id: false, name : 'False' },
    ]

    // At component start: load existing Attributes and Categories
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['products'], setIsLoading, props.tokens.accessTokenData.token);

    async function executeRequest() {
        const queryParams = { page, size };
        if (description) queryParams.name = description;
        if (product != -1) queryParams.product = product;
        if (isValid != -1) queryParams.is_valid = isValid;

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
                <div className="form__title">Product SKUs - Get List</div>
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
                        <label>Description</label>
                        <input value={description} onInput={(event) => setDescription(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Product</label>
                        <Selector
                            id={product} setId={setProduct} options={options['products']}
                        />
                    </div>
                    <div className="form__field">
                        <label>Is Valid</label>
                        <Selector
                            id={isValid} setId={setIsValid} options={isValidOptions}
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

export default ProductSKUsGetList;