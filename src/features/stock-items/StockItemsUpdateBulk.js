import React, { useReducer, useState } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import useGetOptions from '../../utils/useGetOptions';



const endpoint = '/stock_items/bulk_update/';


function StockItemsUpdateBulk(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    const reducer = (state, action) => {
        if (action.type == 'add') {
            return [
                ...state,
                { key: state.length + 1, sku: -1, locationFrom: -1, locationTo: -1, amount: '' }
            ];
        }
        else if (action.type == 'edit') {
            const newInstances = [...state];
            const instanceEditedIndex = state.findIndex(s => s.key == action.instance.key);
            newInstances.splice(instanceEditedIndex, 1, {
                ...action.instance
            });
            return newInstances;
        }
        else if (action.type == 'remove-last') {
            return state.slice(0, state.length - 2);
        }
    }
    const [bulkInstances, dispatchBulkInstances] = useReducer(reducer, []);

    // At component start: load existing Attributes and Categories
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['product_skus', 'locations'], setIsLoading, props.tokens.accessTokenData.token);

    async function executeRequest() {
        const request = {
            endpoint,
            method: 'POST',
            body: bulkInstances.map(({ sku, locationFrom, locationTo, amount }) => ({
                'sku': sku,
                'location_from': locationFrom,
                'location_to': locationTo,
                'amount': Number(amount),
            })),
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
                <div className="form__title">Stock Item - Bulk Update</div>
                {isLoading ? <div className="form__field">Loading...</div> : <>
                    <div>Request Body:</div>

                    <div className="form__field">
                        <label>&nbsp;</label>
                        <button onClick={() => dispatchBulkInstances({ type: 'add' })}>Add Bulk Instance</button>
                    </div>

                    {bulkInstances.map(instance => {
                        return (
                            <React.Fragment key={instance.key}>
                                <div className="form__field">
                                    <label>Product SKU</label>
                                    <Selector id={instance.sku} setId={(value) => dispatchBulkInstances({
                                        type: 'edit',
                                        instance: { ...instance, sku: value}
                                    })} options={options['product_skus']} customOptionText={(opt) => `(${opt.id}) ${opt.description}`}/>
                                </div>
                                <div className="form__field">
                                    <label>Location From</label>
                                    <Selector id={instance.locationFrom} setId={(value) => dispatchBulkInstances({
                                        type: 'edit',
                                        instance: { ...instance, locationFrom: value}
                                    })} options={options['locations']}/>
                                </div>
                                <div className="form__field">
                                    <label>Location To</label>
                                    <Selector id={instance.locationTo} setId={(value) => dispatchBulkInstances({
                                        type: 'edit',
                                        instance: { ...instance, locationTo: value}
                                    })} options={options['locations']}/>
                                </div>
                                <div className="form__field">
                                    <label>Amount</label>
                                    <input value={instance.amount} onInput={(event) => dispatchBulkInstances({
                                        type: 'edit',
                                        instance: { ...instance, amount: event.target.value }
                                    })} />
                                </div>
                            </React.Fragment>
                        );
                    })}

                    {bulkInstances.length ?
                        <div className="form__field">
                            <label>&nbsp;</label>
                            <button onClick={() => dispatchBulkInstances({ type: 'remove-last' })}>Remove Last Bulk Instance</button>
                        </div>
                    : ''}

                    <button disabled={isLoading} onClick={executeRequest}>Execute</button>
                </>}
            </div>)}
            tokens={props.tokens}
            request={request}
            response={response}
        />
    );
}

export default StockItemsUpdateBulk;