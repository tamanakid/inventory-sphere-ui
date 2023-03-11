



/**
 * 
 * @param {*} props
 * * @param {string | number[]} ids
 * * @param {((string | number)[]) => void} setIds
 * * @param {Option[]} options // Option has at least an "id" and "name" fields
 * * @param {undefined | (opt: Option) => ReactNode} customOptionText
 * @returns 
 */

function SelectorMultiple(props) {

    function onSelectOption(selectedId) {
        const index = props.ids.indexOf(selectedId);
        if (selectedId == -1)
            props.setIds([])
        else if (index !== -1)
            props.setIds(props.ids.filter(id => id !== selectedId));
        else
            props.setIds([ ...props.ids, selectedId ]);
    }

    return (
        <select multiple value={props.ids} onChange={(event) => onSelectOption(event.target.value)}>
            <option value={-1}>Clear</option>
            {props.options.map(opt => (
                <option key={opt.id} value={opt.id} title={props.customOptionText?.(opt) ?? opt.name}>
                    {props.customOptionText?.(opt) ?? `(${opt.id}) ${opt.name}`}
                </option>
            ))}
        </select>
    );
}

export default SelectorMultiple;