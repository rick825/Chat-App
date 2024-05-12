import { useEffect } from 'react';
import Explore from "./Dashbotcomp/Explore";
import './Dashbotcomp/Dashbotcomp.css'
import axios from 'axios';
import { useDashboardProvider } from '../../../context/DashboardContext';


const Dashbot = ()=>{
  const { groups, setGroups, refresh, setRefresh } = useDashboardProvider();

  useEffect(() => {
    axios.get('/api/group')
      .then(response => { 
        console.log("Running Response");
        setGroups(response.data);
        console.log(groups);
        setRefresh(false);
      })
      .catch(error => {
        console.error('Error fetching group list:', error);
      });
  }, [refresh]);
 

  return(<>
  <div className="Dashbot dashcont bgcolor2">
    <div className="dashbotcont">
        <Explore />
    </div>
  </div>
  </>)
}

export default Dashbot;