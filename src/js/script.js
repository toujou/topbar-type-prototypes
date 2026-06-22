document.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', () => {
        console.log('Action triggered:', btn.dataset.action);
    });
});
