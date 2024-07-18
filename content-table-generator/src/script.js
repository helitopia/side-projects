alert("The project is \"work in progress\"");

const headingTags = ["h2", "h3", "h4", "h5", "h6"];
let headings = document.querySelectorAll(headingTags.join(",")),
    h2Count = 0,
    headingNums,
    hPrevLevel = -1;

for (let heading of headings) {
    let hLevel = heading.nodeName[1];
    if (hLevel === "2")
        headingNums = [h2Count++, 0, 0, 0, 0];

    if (hLevel < hPrevLevel)
        headingNums[hPrevLevel - 2] = 0;

    hPrevLevel = hLevel;
    headingNums[hLevel - 2]++;
    heading.prepend(headingNums.slice(0, hLevel - 1).join(".") + ". ");
}
