$(() => {
    function pageScripts() {
        let activeDetailPanel = '';
        let pswpGallery = null;
        const panelData = getPanelData();

        // Initialize the selected panel data as null to be populated later
        let panelName = '';
        let selectedPanelData = null;
        let showcaseDetailElem = $('.c-showcase-detail--left');

        function handleSelfInfoPosition() {
            const pos = $('#recon-panel').position();
            $('.c-self-info').css({
                marginLeft: `${pos.left}px`,
            });

            $(window).on('resize', () => {
                handleSelfInfoPosition();
            });
        }

        function initGallery({ index }) {
            const gallery = [
                {
                    src: '../resources/images/kb.jpg',
                    w: 1000,
                    h: 667,
                },
                {
                    src: '../resources/images/peppermint.jpg',
                    w: 1000,
                    h: 563,
                },
                {
                    src: '../resources/images/beach.jpg',
                    w: 1000,
                    h: 663,
                },
                {
                    src: '../resources/images/car.jpg',
                    w: 1000,
                    h: 663,
                },
                {
                    src: '../resources/images/dance.jpg',
                    w: 1000,
                    h: 663,
                },
            ];

            const pswpElem = $('.pswp').get(0);
            const pswpOpts = {
                closeOnScroll: false,
                index,
            };

            pswpGallery = new PhotoSwipe(pswpElem, PhotoSwipeUI_Default, gallery, pswpOpts);
        }

        function handlePanelClick() {
            $('.c-panel__photo').on('click', event => {

                if (showcaseDetailElem.find('.c-showcase-detail__info').length) return;

                positionShowcaseElemOnScreen();
                updatePanelBgColor();
                getPanelName({ event });
                getPanelInfoFromName();
                addShowcaseDetailInfo();

                if (selectedPanelData.panelGithub) {
                    handlePanelsWithGithub();
                }
                if (selectedPanelData.panelImg) {
                    handlePanelsWithImages();
                }
                if (panelName === 'photo') {
                    handlePhotoPanelCase();
                }
                if (panelName === 'about') {
                    handleAboutPanelColors();
                }
                else {
                    handleDefaultPanelColors();
                }

                moveShowcaseElemIn();

                $('body').toggleClass('no-scroll');
            });
        }

        function handlePanelEnter() {
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
        }

        function handlePanelLeave() {
            $('.c-panel__photo').on('mouseleave', event => {
                const title = $(event.currentTarget).find('.c-panel__desc');
                $(event.currentTarget).removeClass('is-hovered');
                TweenLite.to(title.get(0), 0.5, {
                    top: '70%',
                    opacity: '0',
                    ease: Cubic.easeInOut,
                });
            });
        }

        function updatePanelBgColor() {
            const panelBgColor = $(event.currentTarget).css('background-color');
            showcaseDetailElem.css({
                backgroundColor: panelBgColor,
            });
        }

        function getPanelName({ event }) {
            const id = $(event.currentTarget).get(0).id;
            panelName = id.split('-')[0];
        }

        function getPanelInfoFromName() {
            selectedPanelData = {
                panelTitle: panelData[panelName].title,
                panelInfo: panelData[panelName].text,
                panelGithub: panelData[panelName].github,
                panelImg: panelData[panelName].img,
                panelGallery: panelData[panelName].gallery,
            };
        }

        function addShowcaseDetailInfo() {
            showcaseDetailElem.append(`
                <div class="c-showcase-detail__info">
                    <div class="c-showcase-detail__info-title">
                        ${selectedPanelData.panelTitle}
                    </div>
                    <div class="c-showcase-detail__info-text">
                        ${selectedPanelData.panelInfo}
                    </div>
                </div>
            `);
        }

        function positionShowcaseElemOnScreen() {
            // Position the element to cover your screen if you had to scroll
            const scrollOffset = $(window).scrollTop();

            showcaseDetailElem.css({
                top: scrollOffset,
            });
        }

        function handlePanelsWithGithub() {
            $(`
                <div class="c-showcase-detail__github">
                    <img src="../resources/icons/github.png" alt="" data-url="${selectedPanelData.panelGithub}"/>
                </div>
            `).insertAfter('.c-showcase-detail__info-text');

            $('.c-showcase-detail__github').on('click', function() {
                window.location.href = $(this).data('url');
            });
        }

        function handlePanelsWithImages() {
            $(`
                <div class="c-showcase-detail__img">
                    <img src="${selectedPanelData.panelImg}"/>
                <div>
            `).insertBefore('.c-showcase-detail__info-text');
        }

        function handlePhotoPanelCase() {
            const galleryMarkup = selectedPanelData.panelGallery;

            $(galleryMarkup).insertAfter('.c-showcase-detail__info-title');

            $('.c-showcase-detail__info').addClass('is-photo-panel');

            $('.c-showcase-detail__gallery-photo').on('click', event => {
                const index = $(event.currentTarget).data('id');
                initGallery({ index });
                pswpGallery.init();
            });
        }

        function handleAboutPanelColors() {
            $('.c-showcase-detail--left').css({
                color: '#FFF',
            });
        }

        function handleDefaultPanelColors() {
            $('.c-showcase-detail--left').css({
                color: '#000',
            });
        }

        function moveShowcaseElemIn() {
            TweenLite.to(showcaseDetailElem.get(0), 0.5, {
                left: '0',
                ease: Cubic.easeInOut,
            });
        }

        function moveShowcaseElemOut() {
            TweenLite.to(showcaseDetailElem.get(0), 0.5, {
                left: '-100vw',
                ease: Cubic.easeInOut,
                onComplete: _removeDetails.bind(this, showcaseDetailElem),
            });
        }

        function handlePanelClose() {
            $('.c-close').on('click', event => {
                moveShowcaseElemOut();
                $('body').toggleClass('no-scroll');
            });
        }

        function _removeDetails(elem) {
            showcaseDetailElem.find('.c-showcase-detail__info').remove();
        }

        function init() {
            handleSelfInfoPosition();
            handlePanelEnter();
            handlePanelLeave();
            handlePanelClick();
            handlePanelClose();
        }

        init();
    }

    pageScripts();
});

function getPanelData() {
    return {
        rfid: {
            title: 'RFID Electric Strike Lock',
            text: 'An RFID lock system created by connecting an ATmega32 microprocessor with an RFID chip. The RFID chip reads in a keycard on UART, sends the unique serial identification code to the microprocessor, then opens the lock if the keycard\'s ID is accepted.',
            github: 'https://github.com/dkfann/RFID-Reader',
        },
        recon: {
            title: '3D Mesh Reconstruction With Structured Lighting',
            text: 'Recreated a 3D model of a mannequin from structured lighting image scans of the mannequin. The images were placed in a stack and the binary gray code values were collapsed into an array of decoded decimal values per pixel. This array was then used to reconstruct a point cloud, which was converted into a mesh and smoothed with Poisson reconstruction.',
            github: 'https://github.com/dkfann/3D-Reconstruct',
        },
        photo: {
            title: 'Photography',
            text: '',
            gallery: `
                <div class="c-showcase-detail__gallery">
                    <div class="c-showcase-detail__gallery-photo" data-id="0">
                        <img src="../resources/images/kb-t.jpg" />
                    </div>
                    <div class="c-showcase-detail__gallery-photo" data-id="1">
                        <img src="../resources/images/peppermint-t.jpg" />
                    </div>
                    <div class="c-showcase-detail__gallery-photo" data-id="2">
                        <img src="../resources/images/beach-t.jpg" />
                    </div>
                    <div class="c-showcase-detail__gallery-photo" data-id="3">
                        <img src="../resources/images/car-t.jpg" />
                    </div>
                    <div class="c-showcase-detail__gallery-photo" data-id="4">
                        <img src="../resources/images/dance-t.jpg" />
                    </div>
                </div>
            `,
        },
        about: {
            title: 'About Me',
            text: 'Hey there! I\'m a software developer based in California. Software and technology have always intrigued me and captured my fascination, so I\'m always looking for ways to creatively solve problems through software!',
            img: '../resources/images/danny-xs.png',
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
            text: 'A restaurant sharing app that helps friends share and discover a curated assortment of places to eat and hang out at. Created with React, React Router, Webpack, and Babel.',
        },
    }
}

