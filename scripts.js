$(() => {
    let activeDetailPanel = '';
    const pos = $('#recon-panel').position();
    $('.c-self-info').css({
        marginLeft: `${pos.left}px`,
    });

    const panelData = {
        rfid: {
            title: 'RFID Electric Strike Lock',
            text: 'An RFID lock system created by connecting an ATmega32 microprocessor with an RFID chip. The RFID chip reads in a keycard on UART, sends the unique serial identification code to the microprocessor, then opens the lock if the keycard\'s ID is accepted.',
            github: 'https://github.com/dkfann/RFID-Reader',
        },
        recon: {
            title: '3D Mesh Reconstruction With Structured Lighting',
            text: 'Recreated a 3D model of a mannequin from structured lighting image scans of the mannequin. The images were placed in a stack and the binary gray code values were collapsed into an array of decoded decimal values per pixel. This array was then used to reconstruct a point cloud, which was converted into a mesh and smoothed with Poisson reconstruction. ',
            github: 'https://github.com/dkfann/3D-Reconstruct',
        },
        photo: {
            title: 'Photography',
            text: 'Some of my photographs.',
        },
        about: {
            title: 'About Me',
            text: 'Some info about me',
            altCol: true,
        },
        ai: {
            title: 'Connect-K AI',
            text: 'An AI for Connect-K that uses Iterative Deepening Search (IDS) to traverse through possible game states in order to make the best moves. These games states are analyzed via heuristics that compute the value of a given move by checking piece location, blocking, and win condition approximations.',
            github: 'https://github.com/dkfann/ConnectK-AI',
        },
        react: {
            title: 'ReactAppSetup',
            text: 'Boilerplate code for starting a new React app using Webpack, Babel, and React Router.',
            github: 'https://github.com/dkfann/ReactAppSetup',
        },
        sdl: {
            title: 'SDL Game Engine',
            text: 'Collaborated with a team to create a working SDL-based game engine. Created the physics and collision detection portions of the engine and implemented basic game mechanics for engine demonstration purposes.',
            github: 'https://github.com/dkfann/ICS-161-Engine',
        },
        foodies: {
            title: 'Foodies',
            text: 'A foodies app',
        },
    }
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

    $('.c-panel__photo').on('click', event => {
        const elem = $('.c-showcase-detail--left');
        const panelBgColor = $(event.currentTarget).css('background-color');
        const id = $(event.currentTarget).get(0).id;
        const panelName = id.split('-')[0];

        const panelTitle = panelData[panelName].title;
        const panelInfo = panelData[panelName].text;
        const panelGithub = panelData[panelName].github;
        const panelAltCol = panelData[panelName].altCol;

        elem.append(`
            <div class="c-showcase-detail__info">
                <div class="c-showcase-detail__info-title">
                    ${panelTitle}
                </div>
                <div class="c-showcase-detail__info-text">
                    ${panelInfo}
                </div>
            </div>
        `);
    
        if (panelGithub) {
            $(`
                <div class="c-showcase-detail__github">
                    <img src="./github.png" alt="" data-url="${panelGithub}"/>
                </div>
            `).insertAfter('.c-showcase-detail__info-text');

            $('.c-showcase-detail__github').on('click', function() {
                window.location.href = $(this).data('url');
            });
        }

        elem.css({
            backgroundColor: panelBgColor,
        });

        if (panelAltCol) {
            elem.css({
                color: '#FFF',
            });
        }

        TweenLite.to(elem.get(0), 0.5, {
            left: '0',
            ease: Cubic.easeInOut,
        });

        activeDetailPanel = 'left';
    });

    function _getInfoToShowFromPanelName({ info }) {

    }

    $('.c-close').on('click', event => {
        if (activeDetailPanel === 'left') {
            const elem = $('.c-showcase-detail--left');
            TweenLite.to(elem.get(0), 0.5, {
                left: '-100vw',
                ease: Cubic.easeInOut,
                onComplete: _removeDetails.bind(this, elem),
            });

            activeDetailPanel = '';
        }
    });

    function _removeDetails(elem) {
        elem.find('.c-showcase-detail__info').remove();
    }
})