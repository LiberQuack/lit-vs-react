import { LitElement } from 'lit-element';

abstract class BaseElement extends LitElement {

    connectedCallback() {
        super.connectedCallback();
        this.classList.add(this.nodeName.replace(/-/g, '').toLowerCase());
    }

    createRenderRoot() {
        return this;
    }

    fire(name: string, detail?:any) {
        this.dispatchEvent(new CustomEvent(name, { bubbles: true, detail }));
    }
}

export { BaseElement }

