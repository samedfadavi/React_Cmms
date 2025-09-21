import React, { useEffect, useRef } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";

const defaultDiagram = `<?xml version="1.0" encoding="UTF-8"?>
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
</bpmn:definitions>`;

const BpmnEditor = ({ xml, onSave }) => {
  const containerRef = useRef();
  const modelerRef = useRef();

  // Initialize modeler once
  useEffect(() => {
    modelerRef.current = new BpmnModeler({
      container: containerRef.current,
    });

    // Load default diagram
    modelerRef.current.importXML(xml || defaultDiagram).then(() => {
      modelerRef.current.get("canvas").zoom("fit-viewport");
    }).catch(err => console.error("BPMN import error:", err));

    return () => {
      modelerRef.current?.destroy();
    };
  }, []); // <-- only once

  // Re-import when xml prop changes
  useEffect(() => {
    if (!modelerRef.current || !xml) return;
    modelerRef.current.importXML(xml).then(() => {
      modelerRef.current.get("canvas").zoom("fit-viewport");
    }).catch(err => console.error("BPMN import error:", err));
  }, [xml]);

  const handleSave = async () => {
    if (!modelerRef.current) return;
    try {
      const { xml } = await modelerRef.current.saveXML({ format: true });
      if (onSave) onSave(xml);
      console.log("Saved BPMN XML:", xml);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "80vh" }}>
      <button onClick={handleSave} className="p-2 bg-blue-500 text-white">
        Save Diagram
      </button>
      <div ref={containerRef} style={{width:'100%',height:'100%', minHeight:'600px', flex: 1, border: "1px solid #ccc" }} />
    </div>
  );
};

export default BpmnEditor;
