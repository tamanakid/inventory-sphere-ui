import { useState, useEffect } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import useGetOptions from '../../utils/useGetOptions';



const endpoint = '/stock_items/';


function StockItemsGetList(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(100);
    const [product, setProduct] = useState(-1);
    const [sku, setSku] = useState(-1);
    const [location, setLocation] = useState(-1);

    // At component start: load existing Attributes and Categories
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['products', 'product_skus', 'locations'], setIsLoading, props.tokens.accessTokenData.token);


    async function executeRequest() {
        const queryParams = { page, size };
        if (product != -1) queryParams.product = product;
        if (sku != -1) queryParams.sku = sku;
        if (location != -1) queryParams.location = location;

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
                <div className="form__title">Stock Items - Get List</div>
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
                        <label>Product</label>
                        <Selector id={product} setId={setProduct} options={options['products']}/>
                    </div>
                    <div className="form__field">
                        <label>Product SKU</label>
                        <Selector id={sku} setId={setSku} options={options['product_skus']}
                            customOptionText={(opt) => `(${opt.id}) ${opt.description}`} />
                    </div>
                    <div className="form__field">
                        <label>Location</label>
                        <Selector id={location} setId={setLocation} options={options['locations']}/>
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

export default StockItemsGetList;