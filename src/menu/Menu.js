import React, { useState } from 'react';
import menuItems from './menu-items';


function Menu(props) {
    const [isOpen, setIsOpen] = useState(true);
    const [openFeatures, setOpenFeatures] = useState([]);

    function getMenuItems() {
        return menuItems.map(item => {
            const isOpenFeature = openFeatures.includes(item.title);

            return (<React.Fragment key={item.title}>
                <div
                    className={`menu__feature ${isOpenFeature ?  'menu__feature--open' : ''}`}
                    onClick={() => {
                        (!isOpenFeature)
                            ? setOpenFeatures([ ...openFeatures, item.title])
                            : setOpenFeatures([ ...openFeatures.filter(feature => feature !== item.title) ]);
                    }}
                >
                    {item.title}
                </div>
                {isOpenFeature ? (
                    <div className="menu__feature-actions">
                        {item.actions.map(action => (
                            <div
                                key={action.title}
                                className="menu__feature-actions__action"
                                onClick={() => props.setCurrentFeature(() => action.component)}
                            >{action.title}</div>
                        ))}
                    </div>
                ): ''}
            </React.Fragment>);
        })
    }

    return (
        <div className={`menu ${isOpen ? "menu--open": "menu--closed"}`}>
            {/* <button
                className={'menu__toggle-button'}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '<' : '>' }
            </button> */}

            {isOpen ? getMenuItems() : ''}
        </div>
    )
}


export default Menu;
