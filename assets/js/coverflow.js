const list = document.getElementById("list");
const items = Array.from(list.children);

let isScrolling = false;

/* -----------------------------
   Find current centered item
------------------------------ */
function getCurrentIndex() {
  const center = list.scrollTop + list.clientHeight / 2;

  let closestIndex = 0;
  let closestDist = Infinity;

  items.forEach((item, i) => {
    const itemCenter =
      item.offsetTop + item.offsetHeight / 2;

    const dist = Math.abs(center - itemCenter);

    if (dist < closestDist) {
      closestDist = dist;
      closestIndex = i;
    }
  });

  return closestIndex;
}

/* -----------------------------
   Update active / prev / next
------------------------------ */
function updateActive() {
  const index = getCurrentIndex();

  items.forEach(item => {
    item.classList.remove("active", "prev", "next");
  });

  if (items[index]) items[index].classList.add("active");
  if (items[index - 1]) items[index - 1].classList.add("prev");
  if (items[index + 1]) items[index + 1].classList.add("next");
}

/* -----------------------------
   Scroll event (throttled)
------------------------------ */
list.addEventListener("scroll", () => {
  requestAnimationFrame(updateActive);
});

/* -----------------------------
   Scroll helper (smooth lock)
------------------------------ */
function scrollToItem(item) {
  if (!item || isScrolling) return;

  isScrolling = true;

  item.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  setTimeout(() => {
    isScrolling = false;
  }, 350);
}

/* -----------------------------
   Button controls
------------------------------ */
document.querySelector(".up").addEventListener("click", () => {
  const index = getCurrentIndex();
  scrollToItem(items[index - 1]);
});

document.querySelector(".down").addEventListener("click", () => {
  const index = getCurrentIndex();
  scrollToItem(items[index + 1]);
});

/* -----------------------------
   Init state
------------------------------ */
// updateActive();

window.addEventListener("load", () => {
  const secondItem = items[1];

  if (!secondItem) return;

  const top =
    secondItem.offsetTop -
    list.clientHeight / 2 +
    secondItem.clientHeight / 2;

  list.scrollTo({
    top,
    behavior: "auto" // important: no animation on load
  });

  updateActive();
});