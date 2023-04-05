menuToggler.addEventListener('click', ev => {
  menu1.classList.toggle('open');
  const bike = document.getElementById("LittleBike");
  if (menu1.classList.contains('open')) {
    bike.style.width = "10%";
  } else {
    bike.style.width = "20%";
  }
});