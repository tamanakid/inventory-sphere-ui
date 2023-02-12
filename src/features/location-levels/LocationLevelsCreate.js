import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { sendRequest } from '../../endpoints/send-request';
import { setTokens } from '../../utils/local-storage';



const endpoint = '/location_levels/';


function LocationLevelsCreate(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [name, setName] = useState('');
    const [isRootStorageLevel, setIsRootStorageLevel] = useState(false);

    const [parentOptions, setParentOptions] = useState([]);
    const [parentId, setParentId] = useState(-1);

    // At component start: load existing LocationLevel parents
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getParentOptions();
    }, []);

    async function getParentOptions() {
        setIsLoading(true);
        const response = await sendRequest({
            endpoint: '/location_levels/',
            method: 'GET',
            accessToken: props.tokens.accessTokenData.token
        });
        if (response.body?.['status_code'] === 200) {
            setParentOptions(response.body.data.results);
        }
        setIsLoading(false);
    }

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'POST',
            body: { name, 'is_root_storage_level': isRootStorageLevel, parent: parentId },
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
                <div className="form__title">Location Levels - Create</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div className="form__field">
                        <label>Name</label>
                        <input value={name} onInput={(event) => setName(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Is Root Storage</label>
                        <input type="checkbox" checked={isRootStorageLevel} onChange={(event) => setIsRootStorageLevel(event.target.checked)} />
                    </div>
                    <div className="form__field">
                        <label>Parent Location Level</label>
                        <select value={parentId} onChange={(event) => setParentId(event.target.value)}>
                            <option value={-1} disabled>Select an Option</option>
                            {parentOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>{opt.name} {opt.is_root_storage_level ? '(Root Storage)' : ''}</option>
                            ))}
                        </select>
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

export default LocationLevelsCreate;