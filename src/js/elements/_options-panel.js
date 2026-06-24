/**
 * Controls the options panel: listens for radio button changes
 * and reflects the selected values onto the topbar attributes.
 * Selections are persisted to localStorage and restored on page load.
 */
class OptionsPanel {
    /** @type {string} localStorage key used to persist the panel's state */
    static storageKey = 'options-panel-state';

    /** @type {string|null} Currently selected topbar type */
    #selectedTopbarType;

    /** @type {NodeListOf<HTMLInputElement>} Radio inputs for the topbar type options */
    #topbarTypeInputs;

    /** @type {string|null} Currently selected navigation type */
    #selectedNavigationType;

    /** @type {NodeListOf<HTMLInputElement>} Radio inputs for the navigation type options */
    #navigationTypeInputs;

    /** @type {HTMLElement|null} The topbar element this panel controls */
    #topbar;

    /** @type {HTMLElement|null} The main-nav element this panel controls */
    #mainNav;

    /**
     * @param {HTMLElement} el - The root element of the options panel
     */
    constructor(el) {
        this.el = el;
        this.#selectedTopbarType = null;
        this.#selectedNavigationType = null;

        this.#init();
    }

    /**
     * Finds the topbar, binds change listeners to each radio input,
     * and syncs the UI to the stored state (if any) or whichever
     * option is checked by default.
     */
    #init = () => {
        this.#topbar = document.querySelector('.topbar');
        this.#mainNav = document.querySelector('.main-nav');

        this.#topbarTypeInputs = this.el.querySelectorAll('input[name="topbar-type"]');
        this.#navigationTypeInputs = this.el.querySelectorAll('input[name="navigation-type"]');

        this.#topbarTypeInputs.forEach((input) => {
            input.addEventListener('change', this.#onTopbarTypeChange);
        });

        this.#navigationTypeInputs.forEach((input) => {
            input.addEventListener('change', this.#onNavigationTypeChange);
        });

        this.#restoreState();
    };

    /**
     * Reads any previously saved state from localStorage and applies it,
     * checking the matching radio inputs. Falls back to whichever options
     * are checked by default in the markup if there's nothing stored yet
     * (or if storage isn't available).
     */
    #restoreState = () => {
        const storedState = this.#readStoredState();

        if (storedState?.topbarType) {
            this.#selectedTopbarType = storedState.topbarType;
            this.#checkInput(this.#topbarTypeInputs, storedState.topbarType);
        } else {
            const checkedTopbarTypeOption = this.el.querySelector('input[name="topbar-type"]:checked');
            if (checkedTopbarTypeOption) {
                this.#selectedTopbarType = checkedTopbarTypeOption.value;
            }
        }

        if (storedState?.navigationType) {
            this.#selectedNavigationType = storedState.navigationType;
            this.#checkInput(this.#navigationTypeInputs, storedState.navigationType);
        } else {
            const checkedNavigationTypeOption = this.el.querySelector('input[name="navigation-type"]:checked');
            if (checkedNavigationTypeOption) {
                this.#selectedNavigationType = checkedNavigationTypeOption.value;
            }
        }

        this.#updateUI();
    };

    /**
     * Checks whichever radio input in a list matches the given value.
     * @param {NodeListOf<HTMLInputElement>} inputs
     * @param {string} value
     */
    #checkInput = (inputs, value) => {
        inputs.forEach((input) => {
            input.checked = input.value === value;
        });
    };

    /**
     * Reads and parses the saved state from localStorage.
     * @returns {{topbarType?: string, navigationType?: string}|null}
     */
    #readStoredState = () => {
        try {
            const raw = localStorage.getItem(OptionsPanel.storageKey);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.warn('TOUJOU: Could not read options panel state from localStorage.', error);
            return null;
        }
    };

    /**
     * Persists the current selection to localStorage.
     */
    #saveState = () => {
        try {
            localStorage.setItem(
                OptionsPanel.storageKey,
                JSON.stringify({
                    topbarType: this.#selectedTopbarType,
                    navigationType: this.#selectedNavigationType
                })
            );
        } catch (error) {
            console.warn('TOUJOU: Could not save options panel state to localStorage.', error);
        }
    };

    /**
     * Handles a topbarType radio change event by updating the selected
     * type, re-rendering the UI, and persisting the new state.
     * @param {Event} event
     */
    #onTopbarTypeChange = (event) => {
        this.#selectedTopbarType = event.target.value;
        this.#updateUI();
        this.#saveState();
    };

    /**
     * Handles a navigationType radio change event by updating the selected
     * type, re-rendering the UI, and persisting the new state.
     * @param {Event} event
     */
    #onNavigationTypeChange = (event) => {
        this.#selectedNavigationType = event.target.value;
        this.#updateUI();
        this.#saveState();
    };

    /**
     * Updates the UI by setting the correct attribute values on the topbar
     * and main navigation elements.
     */
    #updateUI = () => {
        if (this.#selectedTopbarType) {
            this.#topbar?.setAttribute('topbar-type', this.#selectedTopbarType);
        }
        if (this.#selectedNavigationType) {
            this.#mainNav?.setAttribute('main-nav-type', this.#selectedNavigationType);
        }
    };
}

/**
 * Initializes the options panel if one exists on the page.
 */
export function initOptionsPanel() {
    const optionPanelEl = document.querySelector('.options-panel');
    if (optionPanelEl) {
        new OptionsPanel(optionPanelEl);
    }
}
