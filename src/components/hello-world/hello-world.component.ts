import html from './hello-world.html';
import style from './hello-world.css';
import {Component} from "@/utils";
import {IWebComponent} from "@/interfaces";

@Component({
    html: html,
    style: style,
})
export class HelloWorld implements IWebComponent {

	static observedAttributes() {
    // return an array containing the names of the attributes you want to observe
	}

  constructor(private $el: HTMLElement) {}

  connectedCallback() {
    // Invoked each time the custom element is disconnected from the document's DOM.
    console.log('hello-world2 connected');

    let textcontainer = this.$el.querySelector('.show-clicked-btn');

    this.$el.querySelector('.btn-to-click')?.addEventListener('click', () => {
      if (textcontainer) {
        textcontainer.innerHTML = 'clicked!!';
      }
    })
  }

  disconnectedCallback() {
    // Invoked each time the custom element is moved to a new document.
    console.log('hello-world2 disconnected');
  }

  adoptedCallback() {
    // Invoked each time the custom element is moved to a new document.
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
     // Invoked each time one of the custom element's attributes is added, removed, or changed.
     // Which attributes to notice change for is specified in a static get observedAttributes method
     console.log(`${name} changed`);
  }

}

// Ref.: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements