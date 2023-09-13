const textValidationTemplate = /* html */ `
  <div id="field-{{id}}" class="mt-4">
    {{#unless valid}}
    <div class="flex items-start mb-1">
      <label class="block text-sm text-red-300" for="cus_email">{{validateMessage}}</label>
    </div>
    {{/unless}}
  </div>
`;

export default window.Handlebars.compile(textValidationTemplate);
