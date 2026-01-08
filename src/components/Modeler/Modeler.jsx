import React, { useState } from 'react';
import BpmnModelerComponent from './BpmnModelerComponent';
import BpmnEditor from './BpmnEditor';

const Modeler = () => {
  const [xml,setXml]=useState('');


  return (
    <div>
 {/*    <input type="file" accept=".bpmn" onChange={async (e) => {
      const file = e.target.files[0];
      const text = await file.text();
      setXml(text);
    }} /> */}
      <BpmnEditor bpmnUrl="/1.bpmn" />
      </div>
  );
};

export default Modeler;