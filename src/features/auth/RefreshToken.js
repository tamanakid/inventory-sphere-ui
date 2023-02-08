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

    async function buildRequest() {
        console.log('buildRequest');
        const refreshToken = props.tokens.refreshTokenData?.token;
        if (!refreshToken) return;

        const requestBody = { refresh: refreshToken };
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
            const refreshTokenData = { token: response.body.data.refresh, date };

            props.setTokens({ ...props.tokens, refreshTokenData });
            setTokens({ refreshTokenData });
        }
    }

    return (
        <Layout
            form={(<div>
                <div>
                    Refresh Token
                </div>
                <button disabled={isExecuteDisabled} onClick={buildRequest}>Execute</button>
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default RefreshToken;