import React from 'react';
import './style.scss';

const Container = ({children}) => {
    return (
        <div className={"Container"}>
            {children}
        </div>
    );
}

export default Container;