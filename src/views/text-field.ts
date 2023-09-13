import { nextTick } from '../utils';
import { ValidateRule } from '../types';
import template from './text-field.template';
import textValidationTemplate from './text-validation.template';
import svgTemplate from './svg.template';
import { RequireRule } from '../constant';

type Props = {
  id: string;
  label: string;
  type: 'text' | 'email' | 'number';
  placeholder?: string;
  text?: string;
  require: boolean;
};

const DefaultProps: Props = {
  id: '',
  text: '',
  label: 'label',
  type: 'text',
  placeholder: '',
  require: false,
};

export default class TextField {
  private template = template;
  private textValidationTemplate = textValidationTemplate;
  private svgTemplate = svgTemplate;
  private container: string;
  private data: Props;
  private updated: boolean = false;
  private validateRules: ValidateRule[] = [];

  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...DefaultProps, ...data };

    if (this.data.require) {
      this.addValidateRule(RequireRule);
    }

    // nextTick(this.attachEventHandler);
    setTimeout(this.attachEventHandler.bind(this), 16);
  }

  private validate() {
    const target = this.data.text ? this.data.text.trim() : '';

    const invalidateRules = this.validateRules.filter(
      (validateRule) => validateRule.rule.test(target) !== validateRule.match
    );

    return invalidateRules.length > 0 ? invalidateRules[0] : null;
  }

  private buildData() {
    const isInvalid: ValidateRule | null = this.validate();

    if (this.updated) {
      return {
        ...this.data,
        updated: this.updated,
        valid: !isInvalid,
        validateMessage: isInvalid ? isInvalid.message : '',
      };
    } else {
      return {
        ...this.data,
        updated: this.updated,
        valid: true,
        validateMessage: '',
      };
    }
  }

  private onChange(e: Event) {
    const { value, id } = e.target as HTMLInputElement;

    if (id === this.data.id) {
      this.updated = true;
      this.data.text = value;
      this.update();
    }
  }

  private attachEventHandler() {
    document
      .querySelector(this.container)
      // ?.addEventListener('change', this.onChange.bind(this));
      ?.addEventListener('input', this.onChange.bind(this));
  }

  private update() {
    const container = document.querySelector(
      `#field-${this.data.id}`
    ) as HTMLElement;
    const svgSpan = document.querySelector(
      `.${this.data.id}-span`
    ) as HTMLElement;
    const validationDiv = document.querySelector(
      `.${this.data.id}-validation`
    ) as HTMLElement;

    svgSpan.innerHTML = this.svgTemplate(this.buildData());
    validationDiv.innerHTML = this.textValidationTemplate(this.buildData());
  }

  public addValidateRule = (rule: ValidateRule) => {
    this.validateRules.push(rule);
  };

  render(append: boolean = false) {
    const container = document.querySelector(this.container) as HTMLElement;

    if (append) {
      const divFragment = document.createElement('div');
      divFragment.innerHTML = this.template(this.buildData());

      container.appendChild(divFragment.children[0]);
    } else {
      container.innerHTML = this.template(this.buildData());
    }
  }
}
