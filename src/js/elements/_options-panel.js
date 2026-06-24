/**
 * Controls the options panel: listens for radio button changes
 * and reflects the selected values onto the topbar attributes
 */
class OptionsPanel {
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

        this.#init();
    }

    /**
     * Finds the topbar, binds change listeners to each radio input,
     * and syncs the UI to whichever option is checked by default.
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

        this.#syncInitialState();
    };

    /**
     * Reads whichever radio is checked on 'load' and applies it immediately,
     * so the topbar matches the panel's default selection from the start.
     */
    #syncInitialState = () => {
        const checkedTopbarTypeOption = this.el.querySelector('input[name="topbar-type"]:checked');
        if (checkedTopbarTypeOption) {
            this.#selectedTopbarType = checkedTopbarTypeOption.value;
            this.#updateUI();
        }

        const checkedNavigationTypeOption = this.el.querySelector('input[name="navigation-type"]:checked');
        if (checkedNavigationTypeOption) {
            this.#selectedNavigationType = checkedNavigationTypeOption.value;
            this.#updateUI();
        }
    };

    /**
     * Handles a topbarType radio change event by updating the selected type and UI
     * @param {Event} event
     */
    #onTopbarTypeChange = (event) => {
        this.#selectedTopbarType = event.target.value;
        this.#updateUI();
    };

    /**
     * Handles a navigationType radio change event by updating the selected type and UI
     * @param {Event} event
     */
    #onNavigationTypeChange = (event) => {
        this.#selectedNavigationType = event.target.value;
        this.#updateUI();
    };

    /**
     * updates the UI by setting the correct attribute values on the topbar
     */
    #updateUI = () => {
        this.#topbar?.setAttribute('topbar-type', this.#selectedTopbarType);
        this.#mainNav?.setAttribute('main-nav-type', this.#selectedNavigationType);
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
