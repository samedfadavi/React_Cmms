import { is } from 'bpmn-js/lib/util/ModelUtil';
import EntryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

// 🔹 Custom Camunda Provider برای نسخه قدیمی
export default {
  __init__: ['customPropertiesProvider'],
  __depends__: [], 
  customPropertiesProvider: ['type', function(propertiesProvider: any) {

    propertiesProvider.getTabs = function(element: any) {
      const tabs: any[] = [];

      // اگر element UserTask یا ServiceTask باشد
      if (is(element, 'bpmn:UserTask') || is(element, 'bpmn:ServiceTask')) {

        tabs.push({
          id: 'custom-tab',
          label: 'Custom Camunda',
          groups: [
            {
              id: 'custom-group',
              label: 'Task Properties',
              entries: [
                EntryFactory.textField({
                  id: 'assignee',
                  label: 'Assignee',
                  modelProperty: 'camunda:assignee'
                }),
                EntryFactory.textField({
                  id: 'candidateUsers',
                  label: 'Candidate Users',
                  modelProperty: 'camunda:candidateUsers'
                }),
                EntryFactory.textField({
                  id: 'candidateGroups',
                  label: 'Candidate Groups',
                  modelProperty: 'camunda:candidateGroups'
                }),
                EntryFactory.textField({
                  id: 'priority',
                  label: 'Priority',
                  modelProperty: 'camunda:priority'
                }),
                EntryFactory.textField({
                  id: 'dueDate',
                  label: 'Due Date',
                  modelProperty: 'camunda:dueDate'
                })
              ]
            }
          ]
        });

      }

      return tabs;
    };

    return propertiesProvider;
  }]
};
