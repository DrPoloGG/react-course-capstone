import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
    caterogiesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    const [ categoriesMap, setCategoriesMap ] = useState({});

    useEffect(() => {
        const getCategoryMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }

        getCategoryMap();
    }, [])

    /* This uploaded the data in SHOP_DATA to the database on Firebase, only run ONCE!!!
       This is usually done from the backend or with an import method run by the Admin.
    
    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    },[])
    
    */

    const value = { categoriesMap };
    return <CategoriesContext.Provider value={ value }>{ children }</CategoriesContext.Provider>
}