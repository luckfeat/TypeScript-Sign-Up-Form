const pwdValidationTemplate = `
<div class="mt-1">
    <div class="flex items-start mb-1">
      {{#if strongLevel0}}
      <span class="password-validation flex items-center">
        <svg class="flex-shrink-0 h-5 w-5 text-green-100" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </span>        
      {{/if}}

      {{#if strongLevel1}}
      <span class="password-validation flex items-center">
        <svg class="flex-shrink-0 h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </span>        
      {{/if}}

      {{#if strongLevel2}}
      <span class="password-validation flex items-center">
        <svg class="flex-shrink-0 h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </span>        
      {{/if}}

      <label class="block text-sm text-gray-300" for="cus_email">{{strongMessage}}</label>
    </div>
</div>
`;

export default window.Handlebars.compile(pwdValidationTemplate);
