/**
 * Tracks the topbar's open/closed nav state and mobile/desktop breakpoint.
 * Listens for burger button state changes to open/close the nav (reflected
 * via the open-nav attribute on itself and the nav-is-open attribute on
 * the body), and watches a media query to detect breakpoint changes,
 * dispatching a breakpoint-change event and auto-closing the nav when
 * switching back to desktop.
 *
 * The breakpoint can be customized per-instance via the
 * --toujou-topbar-breakpoint CSS custom property; defaults to 840px.
 *
 * Usage:
 * <toujou-topbar>
 *   ...
 * </toujou-topbar>
 */
class ToujouTopbar extends HTMLElement {
    /** @type {boolean} Whether the nav is currently open */
    #isOpen = false;

    /** @type {boolean} Whether the current viewport matches the mobile breakpoint */
    #isMobile = false;

    /** @type {MediaQueryList} The media query used to detect the mobile breakpoint */
    #mql;

    /** @type {string} The breakpoint used if no custom one is set via CSS */
    #breakpoint = '840px';

    static burgerButtonStateChangeEvent = 'toujou-burger-button-state-change';
    static mqlChangeEventName = 'toujou-topbar-breakpoint-change';
    static openNavBodyAttribute = 'nav-is-open';

    /**
     * @returns {boolean} Whether the nav is currently open
     */
    get isOpen() {
        return this.#isOpen;
    }

    /**
     * Sets the open state and reflects it onto the open-nav attribute.
     * @param {boolean} value
     */
    set isOpen(value) {
        this.#isOpen = value;
        if (value) {
            this.setAttribute('open-nav', '');
        } else {
            this.removeAttribute('open-nav');
        }
    }

    /**
     * Sets up the breakpoint media query and binds listeners for burger
     * button state changes and breakpoint changes.
     */
    connectedCallback() {
        this.#setMediaQuery();

        this.#isMobile = this.#mql.matches;

        window.addEventListener(ToujouTopbar.burgerButtonStateChangeEvent, this.#handleBurgerButtonClick);
        this.#mql.addEventListener('change', this.#handleMqlChange);
    }

    /**
     * Removes all listeners bound in connectedCallback.
     */
    disconnectedCallback() {
        window.removeEventListener(ToujouTopbar.burgerButtonStateChangeEvent, this.#handleBurgerButtonClick);
        this.#mql.removeEventListener('change', this.#handleMqlChange);
    }

    /**
     * Reads the --toujou-topbar-breakpoint CSS custom property (if set) and
     * creates the media query used to detect the mobile/desktop breakpoint.
     */
    #setMediaQuery = () => {
        const computedStyle = getComputedStyle(this);
        const customBreakpoint = computedStyle.getPropertyValue('--toujou-topbar-breakpoint');

        if (customBreakpoint) {
            this.#breakpoint = customBreakpoint.trim();
        }

        this.#mql = window.matchMedia(`(width < ${this.#breakpoint})`);
    };

    /**
     * Handles a burger button state-change event by opening/closing the nav
     * and toggling the nav-is-open attribute on the body accordingly.
     * @param {CustomEvent<{state: boolean}>} event
     */
    #handleBurgerButtonClick = (event) => {
        this.isOpen = event.detail.state;

        if (this.isOpen) {
            document.body.setAttribute(ToujouTopbar.openNavBodyAttribute, '');
        } else {
            document.body.removeAttribute(ToujouTopbar.openNavBodyAttribute);
        }
    };

    /**
     * Handles a media query change by updating the mobile state, dispatching
     * a breakpoint-change event, and auto-closing the nav when switching
     * back to desktop.
     * @param {MediaQueryListEvent} event
     */
    #handleMqlChange = (event) => {
        this.#isMobile = event.matches;

        this.dispatchEvent(
            new CustomEvent(ToujouTopbar.mqlChangeEventName, {
                bubbles: true,
                composed: true,
                detail: { state: this.#isMobile }
            })
        );

        if (!this.#isMobile) {
            this.isOpen = false;
        }
    };
}

customElements.define('toujou-topbar', ToujouTopbar);
