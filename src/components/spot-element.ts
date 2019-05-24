import { property, html, customElement } from "lit-element";

import { BaseElement } from "./base-element";
import "./effect-item";

@customElement('spot-element')
class SpotElement extends BaseElement {

    @property() name = 'Lit';

    render() {
        return html`
            <effect-item class="scale fade l-inline-block">
                <div class="spotelement--title">Lit-Element</div>
            </effect-item>
        `
    }

}