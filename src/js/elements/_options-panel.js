/**
 * Controls the options panel: listens for radio button changes
 * and reflects the selected values onto the topbar attributes
 */
class OptionsPanel {
    /** @type {string|null} Currently selected topbar type */
    #selectedTopbarType;

    /** @type {NodeListOf<HTMLInputElement>} Radio inputs for topbar type */
    #topbarTypeInputs;

    /** @type {HTMLElement|null} The topbar element this panel controls */
    #topbar;

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

        this.#topbarTypeInputs = this.el.querySelectorAll('input[name="topbar-type"]');

        this.#topbarTypeInputs.forEach((input) => {
            input.addEventListener('change', this.#onTopbarTypeChange);
        });

        this.#syncInitialState();
    };

    /**
     * Reads whichever radio is checked on 'load' and applies it immediately,
     * so the topbar matches the panel's default selection from the start.
     */
    #syncInitialState = () => {
        const checked = this.el.querySelector('input[name="topbar-type"]:checked');
        if (checked) {
            this.#selectedTopbarType = checked.value;
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
     * updates the UI by setting the correct attribute values on the topbar
     */
    #updateUI = () => {
        this.#topbar?.setAttribute('topbar-type', this.#selectedTopbarType);
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
