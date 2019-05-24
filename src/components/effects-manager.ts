import { BaseElement } from "./base-element";
import { customElement, property } from "lit-element";

@customElement('effects-manager')
class EffectsManager extends BaseElement {

    @property({type: Boolean, reflect: true})
    active = false;
    
    @property({type: Boolean, reflect: true})
    autoStart = false;

    @property({type: Number})
    duration = 0;

    @property({type: Number})
    overlap = 0;

    _effectChildren = [] as HTMLElement[];
    _effectIndexRun = -1;
    _running = false;
    
    constructor() {
        super();
        this.addEventListener('effect-register', this.effectRegister)
    }

    effectRegister(e: Event) {
        e.stopPropagation();
        const effectElm = (e.target as HTMLElement);
        effectElm.addEventListener('effect-unregister', this.effectUnRegister.bind(this), {once: true})
        effectElm.style.transitionDuration = this.duration + "ms";
        this._effectChildren = Array.from(this.querySelectorAll('effect-item'));
        this.playAll();
    }
    
    effectUnRegister(e: Event) {
        e.stopPropagation();
        this._effectChildren = this._effectChildren.filter(it => it !== e.target);
    }

    connectedCallback() {
        super.connectedCallback();
        this.playAll();
    }

    play(effect: HTMLElement) {
        console.log('Making visible element', effect)
        effect.classList.add('isVisible')
    }

    playAll() {
        if (this._running) {
            return console.info("Already running");
        };
        this._running = true;
        
        const backgroundJob = () => {
            const nextIndex = this._effectIndexRun + 1;
            if (nextIndex < this._effectChildren.length) {
                this._effectIndexRun = nextIndex;
                setTimeout(() => {
                    this.play(this._effectChildren[nextIndex]);
                    backgroundJob()
                }, this.duration - this.overlap);
            } else {
                this._running = false;
            }
        };

        backgroundJob();
    }

}