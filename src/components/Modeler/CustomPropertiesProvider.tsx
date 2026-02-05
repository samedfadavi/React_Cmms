import { is } from "bpmn-js/lib/util/ModelUtil";

export default function CustomPropertiesProvider(
  propertiesPanel: any,
  translate: any
) {
  this.getGroups = function (element: any) {
    return function (groups: any[]) {

      /* ---------------- General ---------------- */

      const generalGroup = {
        id: "general",
        label: translate("General"),
        entries: [
          {
            id: "name",
            component: NameEntry,
            isEdited: (el: any) => !!el.businessObject.name
          }
        ]
      };

      groups.push(generalGroup);

      /* ---------------- Camunda ---------------- */

      if (is(element, "bpmn:UserTask")) {
        const camundaGroup = {
          id: "camunda",
          label: "Camunda",
          entries: [
            {
              id: "formKey",
              component: FormKeyEntry
            }
          ]
        };

        groups.push(camundaGroup);
      }

      return groups;
    };
  };

  propertiesPanel.registerProvider(1000, this);
}

CustomPropertiesProvider.$inject = ["propertiesPanel", "translate"];

/* ========================================================= */
/* ======================= ENTRIES ========================= */
/* ========================================================= */

function NameEntry({ element, id }: any) {
  const modeling = element.modeler.get("modeling");

  return (
    <div className="bio-properties-panel-entry">
      <label htmlFor={id}>Name</label>
      <input
        id={id}
        type="text"
        value={element.businessObject.name || ""}
        onChange={(e) =>
          modeling.updateProperties(element, {
            name: e.target.value
          })
        }
      />
    </div>
  );
}

function FormKeyEntry({ element, id }: any) {
  const modeling = element.modeler.get("modeling");

  return (
    <div className="bio-properties-panel-entry">
      <label htmlFor={id}>Form Key</label>
      <input
        id={id}
        type="text"
        placeholder="my-form-key"
        value={element.businessObject.get("camunda:formKey") || ""}
        onChange={(e) =>
          modeling.updateProperties(element, {
            "camunda:formKey": e.target.value || undefined
          })
        }
      />
    </div>
  );
}
