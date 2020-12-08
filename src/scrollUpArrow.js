const offset = 100;
const scrollUp = document.querySelector(".scrollUp");
const scrollUpPath = document.querySelector(".scrollUpPath");
const pathLength = scrollUpPath.getTotalLength();

scrollUpPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpPath.style.transition = "stroke-dashoffset 20ms";

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

const updateDashoffset = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const dashoffset = pathLength - (getTop() * pathLength / height)

    scrollUpPath.style.strokeDashoffset = dashoffset
};

window.addEventListener("scroll", () => {
    updateDashoffset();
    if (getTop() > offset) {
        scrollUp.classList.add("scrollUp--active");
    } else {
        scrollUp.classList.remove("scrollUp--active");
    }
});

scrollUp.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});