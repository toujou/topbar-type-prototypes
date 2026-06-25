/**
 * Controls the options panel: listens for radio button changes
 * and reflects the selected values onto the topbar attributes.
 * Selections are persisted to localStorage and restored on page load.
 * Navigation type options are filtered/disabled based on which ones
 * are compatible with the currently selected topbar type.
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

    /** @type {Array<{id: string, label: string, compatibleTopbarTypes?: string[]|null}>} */
    #navigationTypes;

    /**
     * @param {HTMLElement} el - The root element of the options panel
     * @param {Array<{id: string, label: string, compatibleTopbarTypes?: string[]|null}>} navigationTypes
     */
    constructor(el, navigationTypes = []) {
        this.el = el;
        this.#selectedTopbarType = null;
        this.#selectedNavigationType = null;
        this.#navigationTypes = navigationTypes;

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

        this.#updateNavigationTypeAvailability();

        if (storedState?.navigationType && this.#isNavigationTypeCompatible(storedState.navigationType)) {
            this.#selectedNavigationType = storedState.navigationType;
            this.#checkInput(this.#navigationTypeInputs, storedState.navigationType);
        } else {
            const checkedNavigationTypeOption = this.el.querySelector('input[name="navigation-type"]:checked');
            if (checkedNavigationTypeOption && !checkedNavigationTypeOption.disabled) {
                this.#selectedNavigationType = checkedNavigationTypeOption.value;
            } else {
                this.#selectFirstAvailableNavigationType();
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
     * Returns whether a given navigation type id is compatible with the
     * currently selected topbar type.
     * @param {string} navigationTypeId
     * @returns {boolean}
     */
    #isNavigationTypeCompatible = (navigationTypeId) => {
        const navType = this.#navigationTypes.find((type) => type.id === navigationTypeId);
        if (!navType?.compatibleTopbarTypes) return true; // no restriction = always compatible
        return navType.compatibleTopbarTypes.includes(this.#selectedTopbarType);
    };

    /**
     * Disables (and visually marks) navigation type radio inputs that
     * aren't compatible with the currently selected topbar type.
     */
    #updateNavigationTypeAvailability = () => {
        this.#navigationTypeInputs.forEach((input) => {
            const isCompatible = this.#isNavigationTypeCompatible(input.value);
            input.disabled = !isCompatible;
            input.closest('.options-panel__option')?.classList.toggle('options-panel__option--disabled', !isCompatible);
        });
    };

    /**
     * Selects the first available (non-disabled) navigation type input,
     * used as a fallback when the current selection becomes incompatible.
     */
    #selectFirstAvailableNavigationType = () => {
        const firstAvailable = [...this.#navigationTypeInputs].find((input) => !input.disabled);
        if (firstAvailable) {
            firstAvailable.checked = true;
            this.#selectedNavigationType = firstAvailable.value;
        }
    };

    /**
     * Handles a topbarType radio change event: updates the selected type,
     * refreshes which navigation types are compatible, falls back to a
     * compatible navigation type if the current one no longer qualifies,
     * re-renders the UI, and persists the new state.
     * @param {Event} event
     */
    #onTopbarTypeChange = (event) => {
        this.#selectedTopbarType = event.target.value;
        this.#updateNavigationTypeAvailability();

        if (!this.#isNavigationTypeCompatible(this.#selectedNavigationType)) {
            this.#selectFirstAvailableNavigationType();
        }

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
 * @param {Array<{id: string, label: string, compatibleTopbarTypes?: string[]|null}>} navigationTypes
 */
export function initOptionsPanel(navigationTypes = []) {
    const optionPanelEl = document.querySelector('.options-panel');
    if (optionPanelEl) {
        new OptionsPanel(optionPanelEl, navigationTypes);
    }
}
