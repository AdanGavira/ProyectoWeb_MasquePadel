function myFunction() {
  document.getElementById("mi-menu").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.menu-responsive')) {
    var dropdowns = document.getElementsByClassName("navbar");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}