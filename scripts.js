$(() => {
    let activeDetailPanel = '';
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

    // $('.c-panel__photo').on('click', event => {
    //     $(event.currentTarget).toggleClass('is-selected');
    //     $('.c-panel__photo')
    //         .not($(event.currentTarget))
    //         .parents('.c-panel')
    //         .addClass('is-hidden');
    // });

    $('.c-panel__photo').on('click', event => {
        // $('.c-showcase-detail--left').addClass('is-active');
        const elem = $('.c-showcase-detail--left');
        const panelBgColor = $(event.currentTarget).css('background-color');
        elem.css({
            backgroundColor: panelBgColor,
        });
        TweenLite.to(elem.get(0), 0.5, {
            left: '0',
            ease: Cubic.easeInOut,
        });

        activeDetailPanel = 'left';
        // const target = $(event.currentTarget);
        // var offset_t = $(event.currentTarget).offset().top - $(window).scrollTop();
        // var offset_l = $(event.currentTarget).offset().left - $(window).scrollLeft();

        // var left = Math.round( (event.clientX - offset_l) );
        // var top = Math.round( (event.clientY - offset_t) );

        // console.log("Left: " + left + " Top: " + top);

        // const xform = anime({
        //     targets: target.get(0),
        //     duration: 1000,]
        //     scale: 2,
        // });
    });

    $('.c-close').on('click', event => {
        if (activeDetailPanel === 'left') {
            const elem = $('.c-showcase-detail--left');
            TweenLite.to(elem.get(0), 0.5, {
                left: '-100vw',
                ease: Cubic.easeInOut,
            });

            activeDetailPanel = '';
        }
        // $('.c-showcase-detail--left').removeClass('is-active');
        // $('.c-showcase-detail--right').removeClass('is-active');
    });
})