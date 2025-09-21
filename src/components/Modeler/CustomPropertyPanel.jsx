import React, { useEffect, useRef } from 'react';

const CustomPropertyPanel = ({ element, onChange }) => {
  const [taskType, setTaskType] = React.useState('');

  useEffect(() => {
    // Set initial task type when the element changes
    if (element && element.businessObject) {
      setTaskType(element.businessObject.customTaskType || '');
    }
  }, [element]);

  const handleChange = (e) => {
    const value = e.target.value;
    setTaskType(value);

    // Update model
    if (element && element.businessObject) {
      element.businessObject.customTaskType = value;
      onChange(element);
    }
  };

  return (
    <div>
      <h3>Task Properties</h3>
      <label>
        Task Type:
        <select value={taskType} onChange={handleChange}>
          <option value="">Select Task Type</option>
          <option value="taskA">Task A</option>
          <option value="taskB">Task B</option>
          <option value="customTask">Custom Task</option>
        </select>
      </label>
    </div>
  );
};

export default CustomPropertyPanel;