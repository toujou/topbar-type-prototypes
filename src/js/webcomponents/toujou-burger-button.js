/**
 * A burger button element that toggles its own pressed/expanded state on
 * click or Enter/Space keypress, dispatches a state-change event on every
 * toggle, closes itself when the main navigation reports closing, and
 * resets to closed when the topbar reports a breakpoint change that no
 * longer matches.
 *
 * Usage:
 * <toujou-burger-button>
 *   <span slot="content">Menu</span>
 * </toujou-burger-button>
 */
class ToujouBurgerButton extends HTMLElement {
    /** @type {boolean} Current pressed/expanded state */
    #state = false;

    static stateChangeEventName = 'toujou-burger-button-state-change';
    static topbarMqlChangeEventName = 'toujou-topbar-breakpoint-change';
    static mainNavCloseEventName = 'toujou-main-nav-close';

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = '<slot name="content"></slot>';
    }

    /**
     * @returns {boolean} The current pressed/expanded state
     */
    get state() {
        return this.#state;
    }

    /**
     * Sets the pressed/expanded state and reflects it onto aria-pressed
     * and aria-expanded.
     * @param {boolean} value
     */
    set state(value) {
        this.#state = value;
        this.setAttribute('aria-pressed', String(value));
        this.setAttribute('aria-expanded', String(value));
    }

    /**
     * Sets initial aria attributes and binds click, keyboard, and
     * cross-component event listeners.
     */
    connectedCallback() {
        this.setAttribute('aria-pressed', String(this.#state));
        this.setAttribute('aria-expanded', String(this.#state));

        this.addEventListener('click', this.#handleClickEvent);
        this.addEventListener('keyup', this.#handleKeyUp);

        window.addEventListener(ToujouBurgerButton.topbarMqlChangeEventName, this.#handleMqlChange);
        window.addEventListener(ToujouBurgerButton.mainNavCloseEventName, this.#handleMainNavCloseEvent);
    }

    /**
     * Removes all listeners bound in connectedCallback.
     */
    disconnectedCallback() {
        this.removeEventListener('click', this.#handleClickEvent);
        this.removeEventListener('keyup', this.#handleKeyUp);

        window.removeEventListener(ToujouBurgerButton.topbarMqlChangeEventName, this.#handleMqlChange);
        window.removeEventListener(ToujouBurgerButton.mainNavCloseEventName, this.#handleMainNavCloseEvent);
    }

    /**
     * Handles a click by toggling the state.
     */
    #handleClickEvent = () => {
        this.#toggleState();
    };

    /**
     * Handles Enter or Space keyup by toggling the state, matching native
     * button activation behavior.
     * @param {KeyboardEvent} event
     */
    #handleKeyUp = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            this.#toggleState();
        }
    };

    /**
     * Closes the button (if open) when the main navigation reports closing,
     * keeping the burger button's visual state in sync with the nav.
     */
    #handleMainNavCloseEvent = () => {
        if (this.#state) {
            this.#toggleState();
        }
    };

    /**
     * Flips the current state, reflects it via the state setter, and
     * dispatches a state-change event with the new state in its detail.
     */
    #toggleState = () => {
        this.state = !this.#state;

        this.dispatchEvent(
            new CustomEvent(ToujouBurgerButton.stateChangeEventName, {
                bubbles: true,
                composed: true,
                detail: { state: this.state }
            })
        );
    };

    /**
     * Resets the state to closed when the topbar breakpoint change event
     * reports a state of false (e.g. no longer matching the relevant
     * breakpoint), without dispatching a further state-change event.
     * @param {CustomEvent} event
     */
    #handleMqlChange = (event) => {
        if (!event.detail.state) {
            this.state = false;
        }
    };
}

customElements.define('toujou-burger-button', ToujouBurgerButton);
