import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import SelectorMultiple from '../../components/SelectorMultiple';



function LocationsUpdate(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [instanceId, setInstanceId] = useState(-1);
    const [name, setName] = useState('');
    const [isRootStorageLevel, setIsRootStorageLevel] = useState(false);
    const [parentId, setParentId] = useState(-1);

    const [locationLevelOptions, setLocationLevelOptions] = useState([]);

    // Cool effect: when selecting instance, automatically select parent
    useEffect(() => {
        const instanceSelected = locationLevelOptions.find(opt => opt.id == instanceId);
        if (instanceSelected)
            setParentId(instanceSelected.parent ?? -1);
    }, [instanceId]);

    // At component start: load existing LocationLevel parents
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        getLocationLevelOptions();
    }, []);

    async function getLocationLevelOptions() {
        setIsLoading(true);
        const response = await sendRequest({
            endpoint: '/location_levels/',
            method: 'GET',
            accessToken: props.tokens.accessTokenData.token
        });
        if (response.body?.['status_code'] === 200) {
            setLocationLevelOptions(response.body.data.results);
        }
        setIsLoading(false);
    }

    // Set endpoint URL with id param
    const [endpoint, setEndpoint] = useState('/location_levels/');
    useEffect(() => {
        setEndpoint(`/location_levels/${instanceId}`);
    }, [instanceId]);

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'PUT',
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
                <div className="form__title">Location Levels - Update</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div className="form__field">
                        <label>Instance</label>
                        <Selector
                            id={instanceId} setId={setInstanceId} options={locationLevelOptions}
                            customOptionText={(opt) => <>{opt.name} ({opt.id}) {opt.is_root_storage_level ? '[RS]' : ''}</>}
                        />
                    </div>
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
                        <Selector
                            id={parentId} setId={setParentId} options={locationLevelOptions}
                            customOptionText={(opt) => <>{opt.name} ({opt.id}) {opt.is_root_storage_level ? '[RS]' : ''}</>}
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

export default LocationsUpdate;