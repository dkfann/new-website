$(() => {
    $('.c-panel__photo').on('mouseenter', event => {
        const title = $(event.currentTarget).find('.c-panel__desc');
        TweenLite.to(title.get(0), 0.5, {
            top: '50%',
            opacity: '1',
            ease: Cubic.easeInOut,
        });
    });

    $('.c-panel__photo').on('mouseleave', event => {
        const title = $(event.currentTarget).find('.c-panel__desc');
        TweenLite.to(title.get(0), 0.5, {
            top: '70%',
            opacity: '0',
            ease: Cubic.easeInOut,
        });
    })
})