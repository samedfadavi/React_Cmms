import React, { useEffect, useState } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";

interface Props {
  modeler: BpmnModeler | null;
  style?: React.CSSProperties;
}

interface AccordionProps {
  title: string;
  open: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

function Accordion({ title, open, toggle, children }: AccordionProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        onClick={toggle}
        style={{
          cursor: "pointer",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          userSelect: "none",
          color: "#333",
          marginBottom: 4,
        }}
      >
        <span style={{ marginRight: 6 }}>{open ? "▼" : "▶"}</span>
        {title}
      </div>
      {open && (
        <div
          style={{
            maxHeight: 250,
            overflowY: "auto",
            padding: 10,
            border: "1px solid #eee",
            borderRadius: 6,
            background: "#fafafa",
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// آیکون المان‌ها
const taskIcons: Record<string, string> = {
  "bpmn:UserTask": "bpmn-icon-user-task",
  "bpmn:ServiceTask": "bpmn-icon-service-task",
  "bpmn:ScriptTask": "bpmn-icon-script-task",
  "bpmn:StartEvent": "bpmn-icon-start-event-none",
  "bpmn:EndEvent": "bpmn-icon-end-event-none",
  "bpmn:ExclusiveGateway": "bpmn-icon-gateway-xor",
  "bpmn:SequenceFlow": "bpmn-icon-connection",
};

export default function CustomPropertyPanel({ modeler, style }: Props) {
  const [element, setElement] = useState<any>(null);

  const [showGeneral, setShowGeneral] = useState(true);
  const [showCamunda, setShowCamunda] = useState(true);
  const [showCondition, setShowCondition] = useState(true);
  const [showIo, setShowIo] = useState(true);
  const [showListeners, setShowListeners] = useState(true);
  const [showLoop, setShowLoop] = useState(true);

  useEffect(() => {
    if (!modeler) return;

    const onSelectionChanged = (e: any) => setElement(e.newSelection[0] || null);
    const onElementChanged = (e: any) => setElement(e.element);

    modeler.on("selection.changed", onSelectionChanged);
    modeler.on("element.changed", onElementChanged);

    return () => {
      modeler.off("selection.changed", onSelectionChanged);
      modeler.off("element.changed", onElementChanged);
    };
  }, [modeler]);

  if (!element)
    return <div style={{ padding: 16, color: "#666" }}>Select an element</div>;

  const bo = element.businessObject;
  const modeling = modeler!.get("modeling");
  const iconClass = taskIcons[bo.$type];

  const updateProperty = (props: Record<string, any>) =>
    modeling.updateProperties(element, props);

  // تمام propertyهای مهم Camunda
  const camundaProps: string[] = [
    "camunda:assignee",
    "camunda:candidateGroups",
    "camunda:candidateUsers",
    "camunda:formKey",
    "camunda:dueDate",
    "camunda:followUpDate",
    "camunda:priority",
    "camunda:documentation",
    "camunda:asyncBefore",
    "camunda:asyncAfter",
    "camunda:exclusive",
  ];

  const renderProperty = ({ name }: { name: string }) => {
    name=name.replace("camunda:", "");
    let value = bo[name];

    // مقدار پیش فرض اگر undefined بود
    if (value === undefined || value === null) {
      if (name.startsWith("async") || name === "exclusive") value = false;
      else value = "";
    }

    const isBoolean = typeof value === "boolean";

    // conditionExpression مخصوص SequenceFlow
    if (name === "conditionExpression" && bo.conditionExpression) 
    {
      const cond = bo.conditionExpression;
      return (
        <div key={name} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 12, color: "#666" }}>Type</label>
          <input
            value={cond.$type || ""}
            disabled
            style={{ padding: "6px 8px", borderRadius: 4, border: "1px solid #ccc" }}
          />
          <label style={{ fontSize: 12, color: "#666" }}>Body</label>
          <textarea
            value={cond.body || ""}
            onChange={(e) => {
              cond.body = e.target.value;
              updateProperty({ conditionExpression: cond });
            }}
            style={{ padding: "6px 8px", borderRadius: 4, border: "1px solid #ccc", minHeight: 50 }}
          />
        </div>
      );
    }

    return (
      <div key={name} style={{ marginBottom: 8 }}>
        <label style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>
          {name.replace("camunda:", "")}
        </label>
        {isBoolean ? (
          <input
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => updateProperty({ [name]: e.target.checked })}
          />
        ) : (
          <input
            value={value as string}
            onChange={(e) => updateProperty({ [name]: e.target.value || undefined })}
            style={{ padding: "6px 8px", borderRadius: 4, border: "1px solid #ccc", width: "100%" }}
          />
        )}
      </div>
    );
  };

  // Input/Output
  const renderIoMappings = () => {
    const ioMapping = bo.ioSpecification?.dataInputAssociations || [];
    return (
      <div>
        {ioMapping.map((m: any, idx: number) => (
          <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <input
              value={m.sourceRef || ""}
              placeholder="Source"
              onChange={(e) => {
                m.sourceRef = e.target.value;
                updateProperty({ ioSpecification: bo.ioSpecification });
              }}
              style={{ flex: 1, padding: 4 }}
            />
            <input
              value={m.targetRef || ""}
              placeholder="Target"
              onChange={(e) => {
                m.targetRef = e.target.value;
                updateProperty({ ioSpecification: bo.ioSpecification });
              }}
              style={{ flex: 1, padding: 4 }}
            />
          </div>
        ))}
        <button
          onClick={() => {
            bo.ioSpecification = bo.ioSpecification || { dataInputAssociations: [] };
            bo.ioSpecification.dataInputAssociations.push({ sourceRef: "", targetRef: "" });
            updateProperty({ ioSpecification: bo.ioSpecification });
          }}
        >
          + Add Mapping
        </button>
      </div>
    );
  };

  // Listeners
  const renderListeners = () => {
    const listeners = bo.extensionElements?.values || [];
    return (
      <div>
        {listeners.map((l: any, idx: number) => (
          <div key={idx} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
            <input
              value={l.event || ""}
              placeholder="Event"
              onChange={(e) => {
                l.event = e.target.value;
                updateProperty({ extensionElements: bo.extensionElements });
              }}
              style={{ flex: 1, padding: 4 }}
            />
            <input
              value={l.class || ""}
              placeholder="Class/Delegate"
              onChange={(e) => {
                l.class = e.target.value;
                updateProperty({ extensionElements: bo.extensionElements });
              }}
              style={{ flex: 1, padding: 4 }}
            />
          </div>
        ))}
        <button
          onClick={() => {
            bo.extensionElements = bo.extensionElements || { values: [] };
            bo.extensionElements.values.push({ event: "", class: "" });
            updateProperty({ extensionElements: bo.extensionElements });
          }}
        >
          + Add Listener
        </button>
      </div>
    );
  };

  // Loop / Multi-instance
  const renderLoopCharacteristics = () => {
    const loop = bo.loopCharacteristics || {};
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <label>isSequential</label>
        <input
          type="checkbox"
          checked={loop.isSequential || false}
          onChange={(e) => {
            loop.isSequential = e.target.checked;
            updateProperty({ loopCharacteristics: loop });
          }}
        />
        <label>Loop Cardinality</label>
        <input
          value={loop.loopCardinality || ""}
          onChange={(e) => {
            loop.loopCardinality = e.target.value;
            updateProperty({ loopCharacteristics: loop });
          }}
        />
        <label>Input Data Item</label>
        <input
          value={loop.inputDataItem || ""}
          onChange={(e) => {
            loop.inputDataItem = e.target.value;
            updateProperty({ loopCharacteristics: loop });
          }}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflowY: "auto",
        fontFamily: "Inter, sans-serif",
        ...style,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        {iconClass && (
          <div
            className={iconClass}
            style={{ width: 28, height: 28, marginRight: 8, fontSize: 20, color: "#555" }}
          />
        )}
        <span style={{ fontWeight: 600, fontSize: 16 }}>
          {bo.$type.replace("bpmn:", "")}
        </span>
      </div>

      <Accordion title="General" open={showGeneral} toggle={() => setShowGeneral((v) => !v)}>
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 12, color: "#666" }}>ID</label>
          <input
            value={element.id}
            disabled
            style={{ padding: "6px 8px", borderRadius: 4, border: "1px solid #ccc", width: "100%" }}
          />
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#666" }}>Name</label>
          <input
            value={bo.name || ""}
            onChange={(e) => updateProperty({ name: e.target.value })}
            style={{ padding: "6px 8px", borderRadius: 4, border: "1px solid #ccc", width: "100%" }}
          />
        </div>
      </Accordion>

      <Accordion title="Camunda Properties" open={showCamunda} toggle={() => setShowCamunda((v) => !v)}>
        {camundaProps.map((p) => renderProperty({ name: p }))}
      </Accordion>

      {bo.$type === "bpmn:SequenceFlow" && bo.conditionExpression && (
        <Accordion title="Condition Expression" open={showCondition} toggle={() => setShowCondition((v) => !v)}>
          {renderProperty({ name: "camunda:conditionExpression" })}
        </Accordion>
      )}
  
  
      <Accordion title="Input/Output" open={showIo} toggle={() => setShowIo((v) => !v)}>
        {renderIoMappings()}
      </Accordion>

      <Accordion title="Listeners" open={showListeners} toggle={() => setShowListeners((v) => !v)}>
        {renderListeners()}
      </Accordion>

      <Accordion title="Loop / Multi-instance" open={showLoop} toggle={() => setShowLoop((v) => !v)}>
        {renderLoopCharacteristics()}
      </Accordion>
    </div>
  );
}
