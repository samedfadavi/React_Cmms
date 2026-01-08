import React, { useEffect, useRef, useState } from 'react';
import BpmnModeler from 'bpmn-js/dist/bpmn-modeler.development.js';
import 'bpmn-js/dist/assets/bpmn-js.css';

const BpmnEditor = ({ bpmnUrl }) => {
  const containerRef = useRef(null);
  const modelerRef = useRef(null);
  const [xml, setXml] = useState(null);

  // fetch BPMN file
  useEffect(() => {
    fetch(bpmnUrl)
      .then(res => res.text())
      .then(data => setXml(data))
      .catch(err => console.error('Error loading BPMN file', err));
  }, [bpmnUrl]);

  // initialize modeler
  useEffect(() => {
    if (!xml || !containerRef.current) return;

    const modeler = new BpmnModeler({
      container: containerRef.current,
      //keyboard: { bindTo: document },
    });
    modelerRef.current = modeler;

    modeler.importXML(xml)
      .then(() => {
        modeler.get('canvas').zoom('fit-viewport');
      })
      .catch(err => console.error('Error importing BPMN XML', err));

    return () => modeler.destroy();
  }, [xml]);

  const handleSave = async () => {
    try {
      const { xml } = await modelerRef.current.saveXML({ format: true });
      console.log(xml);
      alert('XML exported! Check console.');
    } catch (err) {
      console.error('Error exporting XML', err);
    }
  };

  const handleUndo = () => {
    const stack = modelerRef.current.get('commandStack');
    if (stack.canUndo()) stack.undo();
  };

  const handleRedo = () => {
    const stack = modelerRef.current.get('commandStack');
    if (stack.canRedo()) stack.redo();
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleSave}>Export XML</button>
      </div>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default BpmnEditor;
