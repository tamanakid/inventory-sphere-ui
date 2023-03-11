import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import SelectorMultiple from '../../components/SelectorMultiple';
import useGetOptions from '../../utils/useGetOptions';
import useGetAttributeValueOptions from '../../utils/useGetAttributeValueOptions';



function UsersUpdate(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [instanceId, setInstanceId] = useState(-1);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState(-1);
    const [locations, setLocations] = useState([]);
    
    const roleOptions = [
        { id: 'IM', name: 'Inventory Manager' },
        { id: 'SM', name: 'Storage Manager' },
        { id: 'SE', name: 'Storage Employee' },
        { id: 'DE', name: 'Data Employee' },
    ]

    // Cool effect: when selecting instance, fetch category info and fill all fields
    useEffect(() => {
        if (instanceId != -1)
            getUserDetails();
    }, [instanceId]);

    async function getUserDetails() {
        const response = await sendRequest({
            endpoint: `/users/${instanceId}`,
            method: 'GET',
            accessToken: props.tokens.accessTokenData.token
        });
        if (response.body?.['status_code'] === 200) {
            const instanceData = response.body.data;
            setEmail(instanceData.email ?? '');
            setFirstName(instanceData['first_name'] ?? '');
            setLastName(instanceData['last_name'] ?? '');
            setRole(instanceData.role ?? -1);
            setLocations(instanceData.locations?.map(l => l.id) ?? []);
        }
    }

    // At component start: load existing Attributes and Categories
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['locations', 'users'], setIsLoading, props.tokens.accessTokenData.token);

    // Special scenario: when retrieving all attributes related to the SKU, this is populated
    const [relatedAttributes, setRelatedAttributes] = useState([]);
    const attributeValueOptions = useGetAttributeValueOptions(relatedAttributes, setIsLoading, props.tokens.accessTokenData.token);

    // Set endpoint URL with id param
    const [endpoint, setEndpoint] = useState('/users/');
    useEffect(() => {
        setEndpoint(`/users/${instanceId}`);
    }, [instanceId]);

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'PUT',
            body: { email, 'first_name': firstName, 'last_name': lastName, 'location_ids': locations, role },
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
                <div className="form__title">Users - Update</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div className="form__field">
                        <label>Instance</label>
                        <Selector id={instanceId} setId={setInstanceId} options={options['users'] ?? []} 
                            customOptionText={(opt) => `(${opt.id}) ${opt.email}`}
                        />
                    </div>
                    <div>Request Body:</div>
                    <div className="form__field">
                        <label>Email</label>
                        <input value={email} onInput={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>First Name</label>
                        <input value={firstName} onInput={(event) => setFirstName(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Last Name</label>
                        <input value={lastName} onInput={(event) => setLastName(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Locations</label>
                        <SelectorMultiple ids={locations} setIds={setLocations} options={options['locations'].filter(l => l['is_root_storage_level']) ?? []} />
                    </div>
                    <div className="form__field">
                        <label>Role</label>
                        <Selector id={role} setId={setRole} options={roleOptions} />
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

export default UsersUpdate;