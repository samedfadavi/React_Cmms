import React, { useEffect, useRef, useState } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import {
  BpmnPropertiesPanelModule,BpmnPropertiesProviderModule
} from "bpmn-js-properties-panel";
import Icon from '@mui/material/Icon';
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "@bpmn-io/properties-panel/dist/assets/properties-panel.css";
import { CustomButton } from '@/CustomControls/CustomButton';
import CustomPropertyPanel from "./CustomPropertyPanel";
import Stack from '@mui/material/Stack';
import { CustomTooltip } from '@/CustomControls/CustomTooltip';
import camundaModdle from "camunda-bpmn-moddle/resources/camunda.json";

export default function BpmnEditor() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const modelerRef = useRef<BpmnModeler | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const propertiesRef = useRef<HTMLDivElement>(null);
  const [showPanel, setShowPanel] = useState(true);

  useEffect(() => {
    modelerRef.current = new BpmnModeler({
      container: canvasRef.current!,
      propertiesPanel: { parent: propertiesRef.current! },
      additionalModules: [BpmnPropertiesPanelModule,BpmnPropertiesProviderModule],
      moddleExtensions: { camunda: camundaModdle },
    });

    modelerRef.current.createDiagram();

    return () => {
      modelerRef.current?.destroy();
    };
  }, []);

  const handleNew = async () => {
    await modelerRef.current?.createDiagram();
  };

  const handleOpenClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const xml = e.target?.result;
      if (!xml) return;
      try {
        await modelerRef.current?.importXML(xml.toString());
      } catch (err) {
        console.error("Error importing BPMN:", err);
        alert("Invalid BPMN file");
      }
    };
    reader.readAsText(file);

    event.target.value = "";
  };

  return (
    <div  style={{ position: "relative", height: '700px', width:'100%' }}>
      {/* Toolbar */}
   
      <Stack style={{ paddingBottom: 10 }} direction="row" spacing={2}>
        <CustomTooltip onClick={handleNew} placement="top-end" title="دیاگرام جدید ایجاد کنید">
          <CustomButton style={{ marginLeft: 16 }}>
            <Icon className="fa-solid fa-file-circle-plus"></Icon>
          </CustomButton>
        </CustomTooltip>
        <CustomTooltip onClick={handleOpenClick} placement="top-end" title="دیاگرام را انتخاب کنید">
          <CustomButton>
            <Icon className="fa-solid fa-folder-open"></Icon>
          </CustomButton>
        </CustomTooltip>
        <CustomTooltip onClick={() => setShowPanel((v) => !v)} placement="top-end" title="نمایش/عدم نمایش پنجره خصوصیات">
          <CustomButton>
            <Icon className="fa-solid fa-window-maximize"></Icon>
          </CustomButton>
        </CustomTooltip>
      </Stack>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept=".bpmn,.xml"
        onChange={handleFileChange}
      />

      {/* Editor */}
      <div  className='form-box'  style={{ position: "relative", height: '100%', width:'100%' }}>
        <div ref={canvasRef} style={{ width: "100%", height: "100%" }} />

        {showPanel && (
          <div
            ref={propertiesRef}
            className='form-box'
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 320,
              height: "100%",
              background: "#fff",
              borderLeft: "1px solid #ddd",
              boxShadow: "-4px 0 8px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CustomPropertyPanel modeler={modelerRef.current} />
          </div>
        )}
      </div>
     
      </div>
  );
}
