import React,{createContext, useContext, useState} from 'react';

const DashboardContext = createContext();


export const DashboaordProvider = ({children}) =>{

    const [formVisible, makeFormVisible] = useState('');
    const [groups, setGroups] = useState([]);
    const [editGroup, setEditGroup] = useState(null);
    const [refresh, setRefresh] = useState(true);
    
    return(
        <DashboardContext.Provider value={{formVisible , makeFormVisible, groups, setGroups, refresh, setRefresh, editGroup, setEditGroup}}>
          {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardProvider = ()=> useContext(DashboardContext);