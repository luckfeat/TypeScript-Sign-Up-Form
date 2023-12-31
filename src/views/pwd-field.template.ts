const template = /* html */ `
<div id="field-{{id}}">
  <div class="mt-4">
    <div class="flex items-start mb-1">
      <span class="{{id}}-span flex items-center">
        <svg class="validation-svg flex-shrink-0 h-5 w-5 {{#if valid}}{{#if updated}}text-green-500{{else}}text-gray-200{{/if}}{{else}}text-gray-200{{/if}}" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </span>        
      <label class="block text-sm" for="password">{{label}}</label>
    </div>
    <input id="{{id}}" name="{{id}}" type="password" value="{{text}}" placeholder="{{placeholder}}" {{#if require}}required{{/if}} aria-label="Password" class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
  </div>

  <div class="mt-1">
  </div>
</div>
`;

export default window.Handlebars.compile(template);
