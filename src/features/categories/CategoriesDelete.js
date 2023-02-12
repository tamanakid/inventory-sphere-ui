import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import SelectorMultiple from '../../components/SelectorMultiple';



const endpoint = '/categories/delete/';


function CategoriesDelete(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [selectedIds, setSelectedIds] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);

    // At component start: load existing LocationLevel parents
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getCategoryOptions();
    }, []);

    async function getCategoryOptions() {
        setIsLoading(true);
        const response = await sendRequest({
            endpoint: '/categories/',
            method: 'GET',
            accessToken: props.tokens.accessTokenData.token
        });
        if (response.body?.['status_code'] === 200) {
            setCategoryOptions(response.body.data.results);
        }
        setIsLoading(false);
    }

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
                <div className="form__title">Categories - Delete</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div>Request Body:</div>
                    <div className="form__field">
                        <label>Parent Location Level</label>
                        <SelectorMultiple ids={selectedIds} setIds={setSelectedIds} options={categoryOptions} />
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

export default CategoriesDelete;