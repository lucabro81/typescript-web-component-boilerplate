export interface IWebComponent {
	connectedCallback(): void;
	disconnectedCallback(): void;
	adoptedCallback(): void;
	attributeChangedCallback(name: string, oldValue: any, newValue: any): void;
}