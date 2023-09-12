import { nextTick } from '../utils';
import { ValidateRule } from '../types';
import template from './text-field.template';
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

// const nameField = new TextField('#required-fields', { id: 'name', label: '이름', type: 'text', placeholder: '이름을 입력해주세요', require: true, });

export default class TextField {
  private template = template;
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
        valid: !isInvalid, // !null || !invalidRules[0]
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
