import React, { useId, useRef, useState } from 'react'
import {
  CCol,
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
} from '@coreui/react'
import { CPasswordInput, CStepper } from '@coreui/react-pro'
import MapComponent from '../../MapComponents/MapComponent';
import Box from '@mui/material/Box';
import SetFilters from './SetFilters.tsx';
import DisplayIradat from './DisplayIradat';
import SabteDarkhast from './SabteDarkhast';
import Modeler from '../../Modeler/Modeler';
import { faIR } from '@mui/x-data-grid/locales';
import { createTheme, ThemeProvider } from '@mui/material/styles';
 const Planning = () => {
  
  const theme = createTheme(
    {
      typography: {
        fontFamily: "var(--common-font)", // global font
      },
   direction:'rtl',
    
    },
    
    faIR // your Farsi locale
  );
  const stepperRef = useRef(null)
  const uid = useId()
  const [currentStep, setCurrentStep] = useState(1)
  const[checkedNodes,setCheckedNodes]=useState([]);
  const[nodesData,setNodesData]=useState([]);
  const[selectedRows,setSelectedRows]=useState([]);
  const [finish, setFinish] = useState(false)
  const finishclick = () => {
     alert(checkedNodes);
     //stepperRef.current?.finish();
  };
  const steps = [

    {
      label: 'اطلاعات مکانی',
      content: (
        <CForm className="row g-3">
       
        <MapComponent></MapComponent>
        </CForm>
      ),
    },
    {
    
      label: 'اطلاعات توصیفی ',
      
      content: (
        <CForm className="row g-3">
    <SetFilters nodesData={(value) => setNodesData(value)}  checkedNodes={(value) => setCheckedNodes(value)}></SetFilters>
    </CForm>
        
      ),
      
    },
    {
      label: 'نمایش ایرادات',
      content: (
        <CForm className="row g-3" style={{fontFamily:'IRANSans'}}> 
         <DisplayIradat nodesData={nodesData} checkedNodes={checkedNodes} getSelectedRows={(value) => setSelectedRows(value)} ></DisplayIradat>
        </CForm>
      ),
    },
    {
      label: 'درخواست کار',
      content: (
        <CForm className="row g-3" style={{fontFamily:'IRANSans'}}> 
         <SabteDarkhast selectedData={selectedRows}  ></SabteDarkhast>
        </CForm>
      ),
    },
  ]
  return (
    <ThemeProvider theme={theme}>
    <Box className='form-box' sx={{ bgcolor: 'background.paper', width: '100%', height:'85vh' }}>
      <CStepper  linear={false}
style={{fontFamily:'IRANSans',padding:'10px'}}
        steps={steps}
        onFinish={() => setFinish(true)}
        onReset={() => setFinish(false)}
        onStepChange={setCurrentStep}
        ref={stepperRef}
      />
      {finish && <div>All steps are complete—you're finished.</div>}
      <div className="d-flex gap-2 mt-4">
  
        {!finish && currentStep < steps.length && (
          <CButton style={{fontFamily:'IRANSans'}} color="primary" onClick={() => stepperRef.current?.next()}>
            بعدی
          </CButton>
        )}
              {!finish && currentStep > 1 && (
          <CButton style={{fontFamily:'IRANSans'}} color="secondary" onClick={() => stepperRef.current?.prev()}>
           قبلی
          </CButton>
        )}
        {!finish && currentStep === steps.length && (
          <CButton color="primary" onClick={() => finishclick()}>
            تمام
          </CButton>
        )}
        {finish && (
          <CButton color="danger" onClick={() => stepperRef.current?.reset()}>
            Reset
          </CButton>
        )}
      </div>
      </Box>
      </ThemeProvider>
  )
};
export default Planning;