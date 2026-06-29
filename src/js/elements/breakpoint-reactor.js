/**
 * Listens for breakpoint-change events and applies the matching
 * mobile/desktop value onto a configured attribute of a given element.
 * Reads its configuration from the element's data-breakpoint-* attributes:
 * - data-breakpoint-attribute: which attribute to set (e.g. "topbar-type")
 * - data-breakpoint-mobile-value / data-breakpoint-desktop-value: the
 *   values to apply for each breakpoint state
 *
 * Usage:
 * new BreakpointReactor(document.querySelector('.topbar'));
 */
export class BreakpointReactor {
    /** @type {HTMLElement} The element this reactor controls */
    #el;

    /** @type {string|undefined} The attribute to set on the element */
    #attribute;

    /** @type {{mobile: string|undefined, desktop: string|undefined}} */
    #values;

    /**
     * @param {HTMLElement} el - The element to react on
     */
    constructor(el) {
        this.#el = el;
        this.#attribute = el.dataset.breakpointAttribute;
        this.#values = {
            mobile: el.dataset.breakpointMobileValue,
            desktop: el.dataset.breakpointDesktopValue
        };

        window.addEventListener('breakpoint-change', this.#handleChange);
        this.#applyCurrent();
    }

    /**
     * Removes the breakpoint-change listener. Call this if the element is
     * removed from the page and the reactor is no longer needed.
     */
    destroy = () => {
        window.removeEventListener('breakpoint-change', this.#handleChange);
    };

    /**
     * Applies whichever breakpoint state is already set on <html>, useful
     * if this reactor is created after breakpoint-controller already fired
     * its initial event.
     */
    #applyCurrent = () => {
        const current = document.documentElement.getAttribute('data-current-breakpoint');
        if (current) this.#apply(current);
    };

    /**
     * Handles a breakpoint-change event by applying the new state.
     * @param {CustomEvent<{breakpoint: string, isDesktop: boolean}>} event
     */
    #handleChange = (event) => {
        this.#apply(event.detail.breakpoint);
    };

    /**
     * Sets the configured attribute on the element to the value matching
     * the given breakpoint, if one is defined.
     * @param {string} breakpoint - "mobile" or "desktop"
     */
    #apply = (breakpoint) => {
        const value = this.#values[breakpoint];
        if (value && this.#attribute) {
            this.#el.setAttribute(this.#attribute, value);
        }
    };
}
