// Create The Boxes From Fetching The Data
let container = document.querySelector(".container .content");
iconEllipsis =
  '<svg width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>';

let activityData = async () => {
  await fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((e) => {
        let box = document.createElement("div");
        box.className = "box";

        let backgroundBox = document.createElement("div");
        backgroundBox.className = "background";

        backgroundBox.innerHTML = e.svgImage;
        backgroundBox.style.background = e.backgroundColor;
        backgroundBox.style.boxShadow = `0 20px 0 ${e.backgroundColor}`;

        box.appendChild(backgroundBox);

        let contentContainer = document.createElement("div");
        contentContainer.className = "content-container";

        let head = document.createElement("div");
        head.className = "head";

        let text = document.createElement("div");
        text.className = "text";

        let textHeader = document.createElement("h4");
        textHeader.textContent = e.title;

        let icon = document.createElement("div");
        icon.className = "icon-holder";
        icon.innerHTML = iconEllipsis;

        text.appendChild(textHeader);

        head.appendChild(text);
        head.appendChild(icon);

        contentContainer.appendChild(head);

        let content = document.createElement("div");
        content.className = "content-data";

        let hours = document.createElement("div");
        hours.className = "hours";

        hoursContent = document.createElement("h3");
        if (localStorage.getItem("timeframes")) {
          hoursContent.textContent = `${
            e.timeframes[localStorage.getItem("timeframes")].current
          }hrs`;
        } else {
          hoursContent.textContent = `${e.timeframes.weekly.current}hrs`;
        }

        hours.appendChild(hoursContent);

        let date = document.createElement("div");
        date.className = "date";

        let dateContent = document.createElement("p");
        if (localStorage.getItem("timeframes")) {
          dateContent.textContent = `Last ${
            localStorage.getItem("timeframes") == "daily"
              ? "Day"
              : localStorage.getItem("timeframes") == "monthly"
              ? "Month"
              : "Week"
          } - ${e.timeframes[localStorage.getItem("timeframes")].previous}hrs`;
        } else {
          dateContent.textContent = `Last Week - ${e.timeframes.weekly.previous}hrs`;
        }

        hours.appendChild(hoursContent);
        date.appendChild(dateContent);

        content.appendChild(hours);
        content.appendChild(date);

        contentContainer.appendChild(content);

        box.appendChild(contentContainer);

        container.appendChild(box);
      });
    });
};

activityData();

// Nav Bullets
let bullets = document.querySelectorAll(".nav ul li");

if (localStorage.getItem("timeframes")) {
  bullets.forEach((e) => {
    e.classList.remove("active");
    if (e.dataset.id == [localStorage.getItem("timeframes")])
      e.classList.add("active");
  });
}

bullets.forEach((e) => {
  e.addEventListener("click", (e) => {
    bullets.forEach((e) => e.classList.remove("active"));

    e.currentTarget.classList.add("active");

    localStorage.setItem("timeframes", e.currentTarget.dataset.id);

    container.innerHTML = "";

    activityData();
  });
});
