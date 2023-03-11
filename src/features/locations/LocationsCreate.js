import React, { useState, useReducer } from 'react';
import { sendRequest } from '../../endpoints/send-request';

import Layout from '../../components/Layout';
import Selector from '../../components/Selector';
import useGetOptions from '../../utils/useGetOptions';


const endpoint = '/locations/';


function LocationsCreate(props) {
    const [request, setRequest] = useState('');
    const [response, setResponse] = useState({ status: 'none' });

    // Form fields
    const [name, setName] = useState('');
    const [level, setLevel] = useState(-1);
    const [parent, setParent] = useState(-1);

    // Custom: child structures
    const childStructureIndexTypes = [
        { id: 'AL', name: 'Alphabetically (A, B, C, ..Z, AA...)' },
        { id: 'RO', name: 'Roman Numeric (I, II, III...)' },
        { id: 'D1', name: 'Decimal from 1 (1, 2, 3...)' },
        { id: 'D0', name: 'Decimal from 0 (0, 1, 2, 3...)' },
    ]
    const reducer = (structures, action) => {
        if (action.type == 'add') {
            return [
                ...structures,
                { depth: structures.length + 1, name: '', indexType: 'AL', locationsCount: 1 }
            ];
        }
        else if (action.type == 'edit') {
            const newStructures = [...structures];
            const structureEditedIndex = structures.findIndex(s => s.depth == action.structure.depth);
            newStructures.splice(structureEditedIndex, 1, {
                ...action.structure
            });
            return newStructures;
        }
        else if (action.type == 'remove-last') {
            return structures.slice(0, structures.length - 2);
        }
    }
    const [childStructures, dispatchChildStructures] = useReducer(reducer, []);


    // At component start: load existing LocationLevel parents
    const [isLoading, setIsLoading] = useState(true);
    const options = useGetOptions(['location_levels', 'locations'], setIsLoading, props.tokens.accessTokenData.token);

    function addRecursiveChildStructure (nestedStructs) {
        const currentStruct = nestedStructs.splice(0, 1)[0];
        console.log(nestedStructs);
        console.log(currentStruct);
        const currentStructForReq = {
            'name': currentStruct.name,
            'index_type': currentStruct.indexType,
            'locations_count': Number(currentStruct.locationsCount)
        };
        if (nestedStructs.length) {
            currentStructForReq['child_structure'] = addRecursiveChildStructure([...nestedStructs]);
        }
        return currentStructForReq;
    }

    async function executeRequest() {
        const body = { name, parent, level };

        if (childStructures.length) {
            body['child_structure'] = addRecursiveChildStructure([...childStructures]);
        }

        const request = {
            endpoint,
            method: 'POST',
            body,
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
                        <label>Level</label>
                        <Selector id={level} setId={setLevel} options={options['location_levels']} />
                    </div>
                    <div className="form__field">
                        <label>Parent Location</label>
                        <Selector id={parent} setId={setParent} options={options['locations']} />
                    </div>

                    <div className="form__field">
                        <label>&nbsp;</label>
                        <button onClick={() => dispatchChildStructures({ type: 'add' })}>Add Child Structure</button>
                    </div>

                    {childStructures.map(cs => {
                        return (<React.Fragment key={cs.depth}>
                            <div className="form__field">
                                <label>Child Structure {cs.depth} Name</label>
                                <input value={cs.name} onInput={(event) => dispatchChildStructures({
                                    type: 'edit',
                                    structure: { ...cs, name: event.target.value}
                                })} />
                            </div>
                            <div className="form__field">
                                <label>Child Structure {cs.depth} Index Type</label>
                                <Selector id={cs.indexType} setId={(value) => dispatchChildStructures({
                                    type: 'edit',
                                    structure: { ...cs, indexType: value}
                                })} options={childStructureIndexTypes} />
                            </div>
                            <div className="form__field">
                                <label>Child Structure {cs.depth} Locations Count</label>
                                <input value={cs.locationsCount} onInput={(event) => dispatchChildStructures({
                                    type: 'edit',
                                    structure: { ...cs, locationsCount: event.target.value}
                                })} />
                            </div>
                        </React.Fragment>)
                    })}

                    {childStructures.length ?
                        <div className="form__field">
                            <label>&nbsp;</label>
                            <button onClick={() => dispatchChildStructures({ type: 'remove-last' })}>Remove Last Child Structure</button>
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

export default LocationsCreate;