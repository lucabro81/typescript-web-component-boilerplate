import { wrap } from './utils';
import observedAttributesHelloworld from './components/hello-world/hello-world.observed-attributes';
customElements.define('hello-world', wrap(()=>import('./components/hello-world/hello-world.component'), 'HelloWorld', observedAttributesHelloworld));
