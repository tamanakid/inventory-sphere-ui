import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import SelectorMultiple from '../../components/SelectorMultiple';
import useGetOptions from '../../utils/useGetOptions';


const endpoint = '/products/delete/';


function ProductsDelete(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [selectedIds, setSelectedIds] = useState([]);

    // At component start: load options
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['products'], setIsLoading, props.tokens.accessTokenData.token);

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
                <div className="form__title">Products - Delete</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div>Request Body:</div>
                    <div className="form__field">
                        <label>Products</label>
                        <SelectorMultiple ids={selectedIds} setIds={setSelectedIds} options={options['products']} />
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

export default ProductsDelete;