import { wrap } from '../../utils';
import observedAttributesHelloWorld from './hello-world.observed-attributes';

export const helloWorldDefine = () => customElements.define('hello-world', wrap(()=>import('./hello-world.component'), 'HelloWorld', observedAttributesHelloWorld));