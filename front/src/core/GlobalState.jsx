import React, {useState} from 'react';
import UserContext from './UserContext';

export default function UserGlobalState(props) {
    const [token, setToken] = useState('1234567890');

    return (   
        <UserContext.Provider value={{token, setToken}}>
            {props.children}
        </UserContext.Provider>
    );
}
