import { useState } from 'react';
import Layout from '../../components/Layout';
import { sendRequest } from '../../endpoints/send-request';
import { setTokens } from '../../utils/local-storage';



const endpoint = '/auth/token/';


function Login(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [email, setEmail] = useState('david.wallace@dundermifflin.com');
    const [password, setPassword] = useState('F3hxGadB5ZFrNP4');

    async function buildRequest() {
        const requestBody = { email, password };

        setRequest(requestBody);
        setResponse({ status: 'loading' });

        const response = await sendRequest({
            endpoint,
            method: 'POST',
            body: requestBody
        });

        setResponse({ ...response, status: 'success' });
        if (response.body?.['status_code'] === 200) {
            const date = new Date().toLocaleString('en-GB');
            const accessTokenData = { token: response.body.data.access, date };
            const refreshTokenData = { token: response.body.data.refresh, date };

            props.setTokens({ accessTokenData, refreshTokenData });
            setTokens({ accessTokenData, refreshTokenData });
        }
    }

    return (
        <Layout
            form={(<div>
                <div>
                    Login
                </div>
                <div>
                    <label>Email</label>
                    <input value={email} onInput={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input value={password} onInput={(event) => setPassword(event.target.value)} />
                </div>
                <button onClick={buildRequest}>Execute</button>
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default Login;