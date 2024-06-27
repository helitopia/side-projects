new Swiper('.album-covers-wrapper', {
    direction: 'horizontal',
    slidesPerView: "auto",
    centeredSlides: true,
    initialSlide: 2,
    spaceBetween: 50,

    effect: "coverflow",
    coverflowEffect: {
        slideShadows: false,
        rotate: 20,
    },
    navigation: {
        nextEl: '.next-song',
        prevEl: '.prev-song',
    },
});
