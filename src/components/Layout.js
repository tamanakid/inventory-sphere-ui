
const INDENT_CHAR = '⠀'

function formatJsonObject(jsonObject, indentIndex = 0) {
    if (!jsonObject) return '';

    const indentSpaces = Array(indentIndex*2 + 1).join(INDENT_CHAR);
    let formatted = '';
    
    // If "root" is an array
    if (Array.isArray(jsonObject)) {
        formatted += `[\n`;
        jsonObject.forEach(value => {
            const fieldIndentSpaces = Array(indentIndex*2 + 2).join(INDENT_CHAR);
            if (typeof value !== 'object') {
                // Primitive values
                formatted += `${fieldIndentSpaces} ${value},`;
            } else if (Array.isArray(value)) {
                // Arrays
                formatted += `${fieldIndentSpaces} ${formatJsonObject(value, indentIndex + 1)},`;
            } else {
                // Objects
                formatted += `${fieldIndentSpaces} ${formatJsonObject(value, indentIndex + 1)},`;
            }
            formatted += `\n`;
        })
        formatted += `${indentSpaces}]`;
        return formatted;
    }

    // If "root" is an object
    formatted += `{\n`;
    Object.entries(jsonObject).forEach(([key, value]) => {
        const fieldIndentSpaces = Array(indentIndex*2 + 2).join(INDENT_CHAR);
        if (typeof value !== 'object') {
            // Primitive values
            formatted += `${fieldIndentSpaces} ${key}: ${value},`;
        } else if (Array.isArray(value)) {
            // Arrays
            formatted += `${fieldIndentSpaces} ${key}: ${formatJsonObject(value, indentIndex + 1)},`;
        } else {
            // Objects
            formatted += `${fieldIndentSpaces} ${key}: ${formatJsonObject(value, indentIndex + 1)},`;
        }
        formatted += `\n`;
    });
    formatted += `${indentSpaces}}`;

    return formatted;
}





function Layout(props) {

    /**
     * url: string,
     * method: string,
     * body: JSON
     * status: 'none' | 'loading' | 'success' | 'error
     */
    function _buildResponse() {
        switch (props.response.status) {
            case 'none':
                return '';
            case 'loading':
                return <div>Loading...</div>;
            case 'success':
                return (<div>
                    <div>URL: {props.response.url} ({props.response.method})</div>
                    <div className="layout--json">{formatJsonObject(props.response.body)}</div>
                </div>);
            case 'error':
                return (<div>
                    <div>URL: {props.response.url} ({props.response.method})</div>
                    <div className="layout--json">{formatJsonObject(props.response.body)}</div>
                </div>);
        }
    }

    const accessTokenDate = props.tokens.accessTokenData?.date;
    const refreshTokenDate = props.tokens.refreshTokenData?.date;

    return (
        <div className="layout">
            <div className="layout__form">
                {props.form}
            </div>

            <div className="layout__tokens">
                <div>{accessTokenDate ? `Access token: set ${accessTokenDate}` : `No Access token`}</div>
                <div>{refreshTokenDate ? `Refresh token: set ${refreshTokenDate}` : `No Refresh token`}</div>
            </div>

            <div className="layout__request layout--json">
                {formatJsonObject(props.request)}
            </div>

            <div className="layout__response">
                {_buildResponse()}
            </div>
        </div>
    );
}

export default Layout;