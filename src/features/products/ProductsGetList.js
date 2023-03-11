import { useState, useEffect } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import useGetOptions from '../../utils/useGetOptions';



const endpoint = '/products/';


function ProductsGetList(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(100);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState(-1);

    // At component start: load existing Attributes and Categories
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['categories'], setIsLoading, props.tokens.accessTokenData.token);

    async function executeRequest() {
        const queryParams = { page, size };
        if (name) queryParams.name = name;
        if (brand) queryParams.brand = brand;
        if (category != -1) queryParams.category = category;

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
                <div className="form__title">Products - Get List</div>
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
                        <label>Name</label>
                        <input value={name} onInput={(event) => setName(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Brand</label>
                        <input value={brand} onInput={(event) => setBrand(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Category</label>
                        <Selector
                            id={category} setId={setCategory} options={options['categories']}
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

export default ProductsGetList;