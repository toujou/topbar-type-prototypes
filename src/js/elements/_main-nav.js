/**
 * Controls the main navigation's expandable sub-menus.
 * Clicking a chevron toggles that item's sub-menu open/closed, closes any
 * sibling sub-menus at the same level, and closes everything when clicking
 * outside the navigation.
 */
class MainNav {
    /** @type {HTMLElement} The root .main-nav element */
    #mainNavEl;

    /** @type {HTMLElement[]} All list items that have a sub-navigation */
    #navListItems = [];

    /** @type {HTMLElement[]} Stack of currently open list items */
    #activeSubNavs = [];

    static listItemSelector = '.main-nav__list-item';
    static hasSubNavAttribute = 'data-has-subnav';
    static isOpenAttribute = 'data-is-open';
    static listItemChevronSelector = '.main-nav__chevron';

    /**
     * @param {HTMLElement} mainNavEl - The root .main-nav element
     */
    constructor(mainNavEl) {
        this.#mainNavEl = mainNavEl;
        this.#getNavListItems();
    }

    /**
     * Finds every list item with a sub-navigation, stores it, and binds a
     * click listener to its chevron toggle button.
     */
    #getNavListItems = () => {
        this.#navListItems = [...this.#mainNavEl.querySelectorAll(MainNav.listItemSelector)];

        if (!this.#navListItems.length) {
            console.warn('TOUJOU: Main navigation has no list items!');
            return;
        }

        this.#navListItems.forEach((listItem) => {
            listItem.hasSubNav = listItem.hasAttribute(MainNav.hasSubNavAttribute);
            if (!listItem.hasSubNav) return;

            listItem.isOpen = false;
            listItem.toggleEl = listItem.querySelector(MainNav.listItemChevronSelector);
            listItem.toggleEl.addEventListener('click', () => {
                this.#toggleListItemState(listItem);
            });
        });
    };

    /**
     * Toggles a list item's open state, reflecting it via the isOpenAttribute
     * and the chevron's aria-expanded / aria-pressed attributes. Closes any
     * sibling sub-menus when opening, and manages the outside-click listener.
     * @param {HTMLElement} listItem
     */
    #toggleListItemState = (listItem) => {
        const listItemChevron = listItem.querySelector(MainNav.listItemChevronSelector);

        listItem.isOpen = !listItem.isOpen;

        listItemChevron?.setAttribute('aria-expanded', `${listItem.isOpen}`);
        listItemChevron?.setAttribute('aria-pressed', `${listItem.isOpen}`);

        if (listItem.isOpen) {
            listItem.setAttribute(MainNav.isOpenAttribute, '');
            this.#closeOtherOpenListItems(listItem);
            this.#activeSubNavs.unshift(listItem);
            window.addEventListener('click', this.#onWindowClick);
        } else {
            listItem.removeAttribute(MainNav.isOpenAttribute);
        }
    };

    /**
     * Closes other open list items so only one sub-menu per level stays open
     * at a time (only sibling lists are affected, not unrelated branches).
     * @param {HTMLElement} listItem
     */
    #closeOtherOpenListItems = (listItem) => {
        const openSiblings = listItem.parentNode?.querySelectorAll(
            `${MainNav.listItemSelector}[${MainNav.isOpenAttribute}]`
        );
        if (!openSiblings) return;

        openSiblings.forEach((sibling) => {
            if (sibling.isOpen && sibling !== listItem) {
                this.#toggleListItemState(sibling);
            }
        });
    };

    /**
     * Closes every currently open navigation item.
     */
    #closeAllNavListItems = () => {
        this.#navListItems.forEach((listItem) => {
            if (listItem.isOpen) {
                this.#toggleListItemState(listItem);
            }
        });
        window.removeEventListener('click', this.#onWindowClick);
    };

    /**
     * Closes the whole navigation when a click happens outside of it.
     * @param {MouseEvent} event
     */
    #onWindowClick = (event) => {
        const clickedEl = event.target;
        if (!clickedEl.closest('.main-nav')) {
            this.#closeAllNavListItems();
        }
    };
}

/**
 * Initializes the main navigation if one exists on the page and hasn't
 * already been initialized.
 */
export function initMainNav() {
    const mainNavEl = document.querySelector('.main-nav');
    if (!mainNavEl || mainNavEl.mainNav) return;

    mainNavEl.mainNav = new MainNav(mainNavEl);
}
