



/**
 * 
 * @param {*} props
 * * @param {string | number} id
 * * @param {(string | number) => void} setId
 * * @param {Option[]} options // Option has at least an "id" and "name" fields
 * * @param {undefined | (opt: Option) => ReactNode} customOptionText
 * @returns 
 */

function Selector(props) {
    return (
        <select value={props.id} onChange={(event) => props.setId(event.target.value)}>
            <option value={-1}>Select an Option</option>
            {props.options.map(opt => (
                <option key={opt.id} value={opt.id} title={opt.name}>
                    {props.customOptionText?.(opt) ?? `(${opt.id}) ${opt.name}`}
                </option>
            ))}
        </select>
    );
}

export default Selector;