import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';
import { setTokens } from '../../utils/local-storage';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';



const endpoint = '/auth/token/';


function Login(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    const userOptions = [
        { id: 1, role: 'Inventory Manager', name: 'Jonathan Moss [All About Sports - Inventory Manager]', email: 'jonathan.moss@allaboutsports.com', password: '2TTCBSduDESEUaj' },
        { id: 2, role: 'Storage Manager', name: 'Sean Dyche [All About Sports - Storage Manager]', email: 'sean.dyche@allaboutsports.com', password: '2TTCBSduDESEUaj' },
        { id: 3, role: 'Storage Employee', name: 'Seamus Coleman [All About Sports - Storage Employee]', email: 'seamus.coleman@allaboutsports.com', password: 'password' },
        // { id: 3, name: 'David Wallace [Dunder Mifflin - IM]', email: 'david.wallace@dundermifflin.com', password: 'F3hxGadB5ZFrNP4' },
        // { id: 4, name: 'Darryl Philbin [Dunder Mifflin - SM]', email: 'darryl.philbin@dundermifflin.com', password: 'F3hxGadB5ZFrNP4' },
    ]

    const [selectedUserId, setSelectedUserId] = useState(-1);
    useEffect(() => {
        const selectedUser = userOptions.find(user => user.id == selectedUserId) ?? {};
        setEmail(selectedUser.email ?? '');
        setPassword(selectedUser.password ?? '');
        setRole(selectedUser.role);
    }, [selectedUserId])

    // Form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'POST',
            body: { email, password }
        };

        setRequest(request);
        setResponse({ status: 'loading' });
        const response = await sendRequest(request);

        setResponse({ ...response, status: 'success' });
        if (response.body?.['status_code'] === 200) {
            const date = new Date().toLocaleString('en-GB');
            const accessTokenData = { token: response.body.data.access, date };
            const refreshTokenData = { token: response.body.data.refresh, date, email, role };

            props.setTokens({ accessTokenData, refreshTokenData });
            setTokens({ accessTokenData, refreshTokenData });
        }
    }

    return (
        <Layout
            form={(<div>
                <div className="form__title">Login</div>
                <div className="form__field">
                    <label>Select a User</label>
                    <Selector id={selectedUserId} setId={setSelectedUserId} options={userOptions} />
                </div>
                <br />
                <div className="form__field">
                    <label>Email</label>
                    <input value={email} onInput={(event) => setEmail(event.target.value)} />
                </div>
                <div className="form__field">
                    <label>Password</label>
                    <input value={password} onInput={(event) => setPassword(event.target.value)} />
                </div>
                <button onClick={executeRequest}>Execute</button>
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default Login;