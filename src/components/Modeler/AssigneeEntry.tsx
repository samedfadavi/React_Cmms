import { TextFieldEntry } from '@bpmn-io/properties-panel';
import { useService } from 'bpmn-js-properties-panel';

export function AssigneeEntry(props: any) {
  const { element, id } = props;

  const modeling = useService('modeling');
  const moddle = useService('moddle');

  const getValue = () => {
    return element.businessObject.get('camunda:assignee') || '';
  };

  const setValue = (value: string) => {
    modeling.updateProperties(element, {
      'camunda:assignee': value
    });
  };

  return TextFieldEntry({
    id,
    element,
    label: 'Assignee',
    getValue,
    setValue
  });
}
