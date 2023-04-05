menuToggler.addEventListener('click', ev => {
    menu3.classList.toggle('open');
    const bike = document.getElementById("LittleBike");
    if (menu3.classList.contains('open')) {
        bike.style.width = "10%";
    } else {
        bike.style.width = "20%";
    }
});