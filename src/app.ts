import template from './app.template';
import { AnyObject } from './types';
import {
  CantContainWhitespace,
  CantStartNumber,
  MinimumLengthLimit,
} from './constant';
import { TextField, PasswordField, AddressField } from './views';

// new App('#root', {title: 'Javascript & TypeScript Essential Chapter 5 - Sign up',});

export default class App {
  template = template;
  data: AnyObject;
  container: HTMLElement;
  fields: AnyObject[];
  active: boolean = false;

  constructor(container: string, data: AnyObject = {}) {
    this.container = document.querySelector(container) as HTMLElement;
    this.data = data;
    this.fields = [];

    this.initialize();
  }

  private initialize() {
    const nameField = new TextField('#required-fields', {
      id: 'name',
      label: '이름',
      type: 'text',
      placeholder: '이름을 입력해주세요',
      require: true,
    });

    const idField = new TextField('#required-fields', {
      id: 'id',
      label: '아이디',
      type: 'text',
      placeholder: '아이디를 입력해주세요',
      require: true,
    });

    const emailField = new TextField('#required-fields', {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: '이메일을 입력해주세요',
      require: true,
    });

    const passwordField = new PasswordField('#required-fields', {
      id: 'password',
      label: '비밀번호',
      placeholder: '비밀번호를 입력해주세요',
    });

    const addressField = new AddressField('#optional-fields', {
      id: 'address',
      label: '배송지 주소',
    });

    idField.addValidateRule(CantContainWhitespace);
    idField.addValidateRule(CantStartNumber);
    idField.addValidateRule(MinimumLengthLimit(3));

    emailField.addValidateRule(CantContainWhitespace);

    this.fields.push(nameField);
    this.fields.push(idField);
    this.fields.push(emailField);
    this.fields.push(passwordField);
    this.fields.push(addressField);
  }

  private onSubmit() {}

  public render = () => {
    this.container.innerHTML = this.template(this.data);
    this.fields.forEach((field) => {
      field.render(true);
    });

    this.container.addEventListener('submit', this.onSubmit);
  };
}
