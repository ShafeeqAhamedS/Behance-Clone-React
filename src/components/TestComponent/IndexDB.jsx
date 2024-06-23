import React, { useEffect } from 'react';
import userData from '../../userData';
import { behanceItem } from '../../data';
import { openDB } from 'idb';

const IndexDB = () => {
    
    // Load the data from userData & behanceItem into local storage instead of Indexed DB
    const loadData = () => {
        localStorage.setItem('users', JSON.stringify(userData));
        localStorage.setItem('posts', JSON.stringify(behanceItem));
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <div>IndexDB</div>
    );
};

export default IndexDB;
