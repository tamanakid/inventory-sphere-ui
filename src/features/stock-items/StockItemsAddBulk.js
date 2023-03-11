import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import useGetOptions from '../../utils/useGetOptions';



const endpoint = '/stock_items/bulk_add/';

function StockItemsAddBulk(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [sku, setSku] = useState(-1);
    const [location, setLocation] = useState(-1);
    const [amount, setAmount] = useState('');

    // At component start: load existing Attributes and Categories
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['product_skus', 'locations'], setIsLoading, props.tokens.accessTokenData.token);

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'POST',
            body: [{ sku, location, amount }],
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
                <div className="form__title">Stock Item - Bulk Add</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div>Request Body:</div>
                    <div className="form__field">
                        <label>Product SKU</label>
                        <Selector id={sku} setId={setSku} options={options['product_skus']}
                            customOptionText={(opt) => `(${opt.id}) ${opt.description}`} />
                    </div>
                    <div className="form__field">
                        <label>Location</label>
                        <Selector id={location} setId={setLocation} options={options['locations']}/>
                    </div>
                    <div className="form__field">
                        <label>Amount</label>
                        <input value={amount} onInput={(event) => setAmount(event.target.value)} />
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

export default StockItemsAddBulk;