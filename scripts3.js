menuToggler.addEventListener('click', ev => {
    menu3.classList.toggle('open');
    const bike = document.getElementById("LittleBike");
    if (menu3.classList.contains('open')) {
        bike.style.width = "10%";
    } else {
        bike.style.width = "20%";
    }
});
ContactInfo.addEventListener('click', ev => {
    email.classList.toggle('open');    
    const Contact = document.getElementById("ContactInfo");
    if (email.classList.contains('open')) {
        Contact.innerHTML = "Hide Contact Information";
    } else {
        Contact.innerHTML = "Show Contact Information";        
    }
});