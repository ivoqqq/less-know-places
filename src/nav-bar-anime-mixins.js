import anime from 'animejs';

export let animation = {
    methods: {
        menu() {
            if (this.activeNavBar) {
                //menu animation //menu open //
                anime({
                    targets: ".link",
                    delay: anime.stagger(100),
                    easing: "easeOutExpo",
                    opacity: [0, 1],
                });
                //burger animation
                anime({
                    targets: ".burger",
                    rotate: {
                        value: 450
                    },
                    easing: "spring(1, 100, 100, 0)"
                })
                anime({
                    targets: document.querySelector("span"),
                    translateX: 10,
                    width: 15
                })
                anime({
                    targets: document.querySelectorAll("span")[1],
                    translateX: 5,
                    width: 25,
                    backgroundColor: "#daa520"
                });

            } else {
                
                //burger animation reverse
                anime({
                    targets: ".burger",
                    rotate: {
                        value: 0
                    }
                });
                anime({
                    targets: document.querySelector("span"),
                    translateX: 0,
                    width: 35
                });
                anime({
                    targets: document.querySelectorAll("span")[1],
                    translateX: 0,
                    width: 35,
                    backgroundColor: "#fff"
                });
            }
        },

        mouseOverLink(e) {
            anime({
                targets: e.target,
                scale: 1.1,
                easing: "easeOutExpo"
            })
        },
        mouseOutLink(e) {
            anime({
                targets: e.target,
                scale: 1,
            });
        }
    }
}