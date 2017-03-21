$(() => {
    // CSS Only Approach - Revisit Later
    // $('.c-panel__photo').on('mouseenter', event => {
    //     $(event.currentTarget).addClass('is-hovered');
    // });

    // $('.c-panel__photo').on('mouseleave', event => {
    //     $(event.currentTarget).removeClass('is-hovered');
    // });

    $('.c-panel__photo').on('mouseenter', event => {
        const title = $(event.currentTarget).find('.c-panel__desc');
        const image = $(event.currentTarget);
        image.addClass('is-hovered');
        TweenLite.to(title.get(0), 0.5, {
            top: '50%',
            opacity: '1',
            ease: Cubic.easeInOut,
        });

        // TweenLite.to(image, 1, {
        //     backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url('./rfid.png')",
        //     backgroundSize: "50%",
        //     backgroundPosition: "center center",
        //     backgroundRepeat: "no-repeat",
        //     backgroundColor: "#D1DBBD",
        //     ease: Cubic.easeInOut,
        // })
    });

    $('.c-panel__photo').on('mouseleave', event => {
        const title = $(event.currentTarget).find('.c-panel__desc');
        $(event.currentTarget).removeClass('is-hovered');
        TweenLite.to(title.get(0), 0.5, {
            top: '70%',
            opacity: '0',
            ease: Cubic.easeInOut,
        });
    });
})