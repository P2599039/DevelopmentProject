menuToggler.addEventListener('click', ev => {
    menu2.classList.toggle('open');
    const bike = document.getElementById("LittleBike");
    if (menu2.classList.contains('open')) {
        bike.style.width = "10%";
    } else {
        bike.style.width = "20%";
    }
});