import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IntegralUITreeViewComponent from 'integralui-web-lite/wrappers/react.integralui.treeview.js';
import '../App.css'
import WeatherStats from './WeatherStats/WeatherStats';
const DerakhteTajhizat = () => {
  const mytree=React.useRef();
    const [data,setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
    
    
        
    
        
          
    
          try {
            
            const response = await axios.get("http://localhost:800/api/Derakht_Tajhizat/GetDerakht_Tajhizat");
            const json = await response.data;
            setData(json);   
/*             mytree.current.suspendLayout();
            mytree.current.loadData(json, null, treeFields, false);        
            mytree.current.resumeLayout(); */
          } catch (error) {

            return;
          }

        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [

      ]);
      const    currentItemTemplate = (item) => { 
        return `
            <div>
                <span>${item.text}</span>
            </div>
        `;
    };
      
      const currentResourcePath= '../icons';
  const  ctrlSize= { width: '100%', height: '100%' };    
    const   treeFields= {      
      
        id: "ID",
        expanded: "isExpanded",
        pid: "Parent_tajhiz",
        items: "children",
        text: "Sharh"
    }
    
  //09105929706
    return (<div className='borderDemo'  >            
                                    
                        <IntegralUITreeViewComponent id="treeview-overview" ref={mytree}                                               
                        style={{
              
              width: '100%',
              height: '100%',
            }}
                        dataFields={treeFields}                                                
                                        
                   items={data}    
                    ></IntegralUITreeViewComponent>                    
     
        </div>);
};
export default DerakhteTajhizat;
