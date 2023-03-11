import { useEffect, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';


const endpoint = '/attributes/';

function AttributesCreate(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [name, setName] = useState('');
    const [isValueAbbrevRequired, setIsValueAbbrevRequired] = useState(false);

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'POST',
            body: { name, 'is_value_abbrev_required': isValueAbbrevRequired },
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
                <div className="form__title">Attributes - Create</div>
                    <div>Request Body:</div>
                    <div className="form__field">
                        <label>Name</label>
                        <input value={name} onInput={(event) => setName(event.target.value)} />
                    </div>
                    <div className="form__field">
                        <label>Is Abbreviation Required</label>
                        <input type="checkbox" checked={isValueAbbrevRequired} onChange={(event) => setIsValueAbbrevRequired(event.target.checked)} />
                    </div>
                    <button onClick={executeRequest}>Execute</button>
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default AttributesCreate;