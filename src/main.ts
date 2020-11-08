import { wrap } from './utils';
customElements.define('hello-world', wrap(()=>import('./components/hello-world/hello-world.component'), 'HelloWorld'));
