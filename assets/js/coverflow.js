const list = document.getElementById("list");
const items = Array.from(list.children);


let isScrolling = false;

/* -----------------------------
   Convert HEX → RGB
------------------------------ */
function hexToRgb(hex) {
  console.log(hex)
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/* -----------------------------
   sRGB → Linear
------------------------------ */
function toLinear(c) {
  c = c / 255;
  return c <= 0.04045
    ? c / 12.92
    : Math.pow((c + 0.055) / 1.055, 2.4);
}

/* -----------------------------
   Compute luminance
------------------------------ */
function getLuminance(r, g, b) {
  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/* -----------------------------
   Get contrast-safe text color
------------------------------ */
function getTextColor(bgColor) {
  const { r, g, b } = hexToRgb(bgColor);
  console.log(r);
  const luminance = getLuminance(r, g, b);
  console.log(luminance)

  // threshold ~0.5 works well
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}


items.forEach(item => {
  const bg = getComputedStyle(item).backgroundColor;
  

  // Convert rgb(...) → hex (quick helper)
  const rgbMatch = bg.match(/\d+/g);
  if (!rgbMatch) return;

  const [r, g, b] = rgbMatch.map(Number);
  const hex =
    "#" +
    [r, g, b]
      .map(v => v.toString(16).padStart(2, "0"))
      .join("");

  const textColor = getTextColor(hex);
  console.log(textColor)
  item.style.color = textColor;
});

/* -----------------------------
   Find current centered item
------------------------------ */
function getCurrentIndex() {
  const center = list.scrollTop + list.clientHeight / 1.5;

  let closestIndex = 0;
  let closestDist = Infinity;

  items.forEach((item, i) => {
    const itemCenter =
      item.offsetTop + item.offsetHeight / 1.5;

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

