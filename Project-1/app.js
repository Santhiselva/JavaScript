const buttons = document.querySelectorAll(".btn");
const boxes = document.querySelectorAll(".box");
const searchBox = document.querySelector("#search");

/*search product by search box */
searchBox.addEventListener("keyup", (e) => {
  searchText = e.target.value.toLowerCase().trim();
  boxes.forEach((box) => {
    const data = box.dataset.item;
    if (data.includes(searchText)) {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  });
  buttons.forEach((button) => {
    button.classList.remove("btn-clicked");
  });

  buttons[0].classList.add("btn-clicked");
});
/* search product by using button */

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    setActiveBtn(e);
    const btnFilter = button.dataset.filter;
    //console.log(btnFilter);
    boxes.forEach((box) => {
      if ((btnFilter =="all")) {
        box.style.display ="block";
      } else {
        const boxFilter = box.dataset.item;
        if (btnFilter == boxFilter) {
          box.style.display = "block";
        } else {
          box.style.display = "none";
        }
      }
    });
  });
});

function setActiveBtn(e) {
  buttons.forEach((button) => {
    button.classList.remove("btn-clicked");
  });
  e.target.classList.add("btn-clicked");
}
