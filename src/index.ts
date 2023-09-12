import { AnyObject } from './types';
import App from './app';

declare global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: AnyObject) => string;
    };
    daum: any;
  }
}

const app = new App('#root', {
  title: '회원가입',
});

app.render();
