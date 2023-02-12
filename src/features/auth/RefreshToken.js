import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { sendRequest } from '../../endpoints/send-request';
import { getTokens, setTokens } from '../../utils/local-storage';



const endpoint = '/auth/refresh/';


function RefreshToken(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    const [isExecuteDisabled, setIsExecuteDisabled] = useState(!props.tokens.refreshTokenData?.token);
    console.log('isExecuteDisabled', isExecuteDisabled)
    useEffect(() => {
        console.log('useEffect');
        setIsExecuteDisabled(!props.tokens.refreshTokenData?.token);
    }, [props.tokens.refreshTokenData]);

    async function executeRequest() {
        const refreshToken = props.tokens.refreshTokenData?.token;
        if (!refreshToken) return;

        const request = {
            endpoint,
            method: 'POST',
            body: { refresh: refreshToken }
        };

        setRequest(request);
        setResponse({ status: 'loading' });
        const response = await sendRequest(request);

        setResponse({ ...response, status: 'success' });
        if (response.body?.['status_code'] === 200) {
            const date = new Date().toLocaleString('en-GB');
            const accessTokenData = { token: response.body.data.access, date };

            props.setTokens({ ...props.tokens, accessTokenData });
            setTokens({ accessTokenData });
        }
    }

    return (
        <Layout
            form={(<div>
                <div className="form__title">Refresh Access Token</div>
                <button disabled={isExecuteDisabled} onClick={executeRequest}>Execute</button>
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default RefreshToken;