import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import SelectorMultiple from '../../components/SelectorMultiple';
import useGetOptions from '../../utils/useGetOptions';
import useGetAttributeValueOptions from '../../utils/useGetAttributeValueOptions';



const endpoint = '/users/';

function UsersCreate(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    // At component start: load existing Attributes and Categories
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['locations'], setIsLoading, props.tokens.accessTokenData.token);

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'POST',
            body: { email, password, 'first_name': firstName, 'last_name': lastName, 'location_ids': locations, role },
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
                <div className="form__title">Users - Create</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div>Request Body:</div>
                    <div className="form__field">
                        <label>Email</label>
                        <input value={email} onInput={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Password</label>
                        <input value={password} onInput={(event) => setPassword(event.target.value)} />
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

export default UsersCreate;