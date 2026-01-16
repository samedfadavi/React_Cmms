import React, { useEffect, useRef } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import Icon from '@mui/material/Icon';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import { CustomButton } from '@/CustomControls/CustomButton';
import Stack from '@mui/material/Stack';
import { CustomTooltip } from '@/CustomControls/CustomTooltip';

const BpmnEditor = () => {
  const canvasRef = useRef(null);
  const modelerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    modelerRef.current = new BpmnModeler({
      container: canvasRef.current
    });

    // Create initial empty diagram
    modelerRef.current.createDiagram();

    return () => {
      modelerRef.current.destroy();
    };
  }, []);

  // 🆕 New Diagram
  const handleNew = async () => {
    await modelerRef.current.createDiagram();
  };

  // 📂 Open BPMN file
  const handleOpenClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const xml = e.target.result;
      try {
        await modelerRef.current.importXML(xml);
      } catch (err) {
        console.error("Error importing BPMN:", err);
        alert("Invalid BPMN file");
      }
    };
    reader.readAsText(file);

    // allow opening same file again
    event.target.value = "";
  };

  return (
    <>
      {/* Toolbar */}
      <Stack style={{paddingBottom:'5px'}} direction="row"  spacing={2} >
      <CustomTooltip onClick={handleNew} placement="top-end" title="دیاگرام جدید ایجاد کنید "    >  
          <CustomButton style={{marginLeft:'16px'}}>
          
                <Icon  className="fa-solid fa-file-circle-plus" ></Icon>
            </CustomButton>
          
      </CustomTooltip> 
      <CustomTooltip onClick={handleOpenClick} placement="top-end" title="دیاگرام را انتخاب کنید "    >  
          <CustomButton >
          
                <Icon  className="fa-solid fa-folder-open"></Icon>
            </CustomButton>
          
      </CustomTooltip> 

      </Stack>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".bpmn,.xml"
        onChange={handleFileChange}
      />

      {/* BPMN Canvas */}
      <div
        ref={canvasRef}
        style={{
          height: "600px",
          width: "100%",
          border: "1px solid #ccc"
        }}
      />
    </>
  );
};

export default BpmnEditor;
