/**
 * Watches a single breakpoint and reflects the current state as
 * data-current-breakpoint="mobile"|"desktop" on the <html> element.
 * Dispatches a `breakpoint-change` event on window whenever the
 * breakpoint is crossed, and once on initial load.
 *
 * Usage:
 * <breakpoint-controller breakpoint="840"></breakpoint-controller>
 */
class BreakpointController extends HTMLElement {
    /** @type {MediaQueryList} The media query used to detect the breakpoint */
    #mql;

    static changeEventName = 'breakpoint-change';
    static breakpointAttribute = 'data-current-breakpoint';

    /**
     * Sets up the media query for the configured breakpoint, applies the
     * initial state, and starts listening for changes.
     */
    connectedCallback() {
        const breakpointValue = this.getAttribute('breakpoint') || '840';
        this.#mql = window.matchMedia(`(min-width: ${breakpointValue}px)`);

        this.#mql.addEventListener('change', this.#handleChange);
        this.#applyState(this.#mql.matches);
        console.log('HELLO - controller');
    }

    /**
     * Removes the media query listener.
     */
    disconnectedCallback() {
        this.#mql.removeEventListener('change', this.#handleChange);
    }

    /**
     * Handles a media query change event by applying the new state.
     * @param {MediaQueryListEvent} event
     */
    #handleChange = (event) => {
        this.#applyState(event.matches);
    };

    /**
     * Sets data-current-breakpoint on the <html> element and dispatches the
     * breakpoint-change event on window with the current state.
     * @param {boolean} isDesktop
     */
    #applyState = (isDesktop) => {
        console.log('BREAKPOINT_CONTROLLER', isDesktop);
        const current = isDesktop ? 'desktop' : 'mobile';

        document.documentElement.setAttribute(BreakpointController.breakpointAttribute, current);

        window.dispatchEvent(
            new CustomEvent(BreakpointController.changeEventName, {
                detail: { breakpoint: current, isDesktop }
            })
        );
    };
}

customElements.define('breakpoint-controller', BreakpointController);
