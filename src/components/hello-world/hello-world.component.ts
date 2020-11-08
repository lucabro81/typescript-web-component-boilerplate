import html from './hello-world.html';
import style from './hello-world.css';
import {Component} from "@/utils";

@Component({
	html: html,
	style: style,
})
export class HelloWorld {

	constructor(private $el: HTMLElement) {
		console.log('HelloWorld instantiated', this.$el);
	}

	connectedCallback() {
		console.log('HelloWorld connected');

		let textcontainer = this.$el.querySelector('.show-clicked-btn');

		this.$el.querySelector('.btn-to-click')?.addEventListener('click', () => {
			if (textcontainer) {
				textcontainer.innerHTML = 'clicked!!';
			}
		})
	}

}