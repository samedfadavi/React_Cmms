import React, { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import CustomPropertyPanel from './CustomPropertyPanel';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css'; 
import 'bpmn-js/dist/assets/bpmn-js.css';

const BpmnModelerComponent = ({ bpmnXML }) => {
  const modelerRef = useRef(null);
  const bpmnModeler = useRef(null);
  const [selectedElement, setSelectedElement] = React.useState(null);

  useEffect(() => {
    bpmnModeler.current = new BpmnModeler({
      container: modelerRef.current,
    });

    if (bpmnXML) {
      bpmnModeler.current.importXML(bpmnXML, (err) => {
        if (err) {
          console.error('Error rendering BPMN diagram:', err);
        } else {
          bpmnModeler.current.get('canvas').zoom('fit-viewport');
        }
      });
    }

    // Listen for selection changes
    bpmnModeler.current.on('element.click', (event) => {
      setSelectedElement(event.element);
    });

    return () => {
      if (bpmnModeler.current) {
        bpmnModeler.current.destroy();
      }
    };
  }, [bpmnXML]);

  const handlePropertyChange = (element) => {
    bpmnModeler.current.get('modeling').updateProperties(element);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '70%', height: '600px', border: '1px solid #ccc' }}
        ref={modelerRef} />
      <div style={{ width: '30%', padding: '20px' }}>
        {selectedElement ? (
          <CustomPropertyPanel element={selectedElement} onChange={handlePropertyChange} />
        ) : (
          <div>Select a task to see properties</div>
        )}
      </div>
    </div>
  );
};

export default BpmnModelerComponent;