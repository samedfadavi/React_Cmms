import React, { useState } from 'react';
import BpmnModelerComponent from './BpmnModelerComponent';
import BpmnEditor from './BpmnEditor';
const Modeler = () => {
  const [xml,setXml]=useState('');
  const bpmnXML = `<?xml version="1.0" encoding="UTF-8"?>
  <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" 
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                    id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
    <bpmn:process id="Process_1" isExecutable="false">
      <bpmn:startEvent id="StartEvent_1" name="Start" />
      <bpmn:task id="Task_1" name="Do something" />
      <bpmn:endEvent id="EndEvent_1" name="End" />
      <bpmn:sequenceFlow id="Flow_1" sourceRef="StartEvent_1" targetRef="Task_1" />
      <bpmn:sequenceFlow id="Flow_2" sourceRef="Task_1" targetRef="EndEvent_1" />
    </bpmn:process>
  </bpmn:definitions>
  `;

  return (
    <div>
    <input type="file" accept=".bpmn" onChange={async (e) => {
      const file = e.target.files[0];
      const text = await file.text();
      setXml(text);
    }} />
      <BpmnEditor bpmnXML={xml|| bpmnXML} />
      </div>
  );
};

export default Modeler;