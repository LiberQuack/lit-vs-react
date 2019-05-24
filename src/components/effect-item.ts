import { customElement, property } from "lit-element";
import { BaseElement } from "./base-element";

@customElement('effect-item')
class EffectItem extends BaseElement {

    connectedCallback() {
        super.connectedCallback();
        this.fire('effect-register');
    }

    disconnectedCallback() {
        this.fire('effect-unregister');
    }

}