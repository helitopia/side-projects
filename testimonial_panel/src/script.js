const bLeft = document.querySelector("#button-left");
const bRight = document.querySelector("#button-right");
const ratingContainer = document.querySelector("#rating-container");
const testimonial = document.querySelector("#testimonial")
const testimonialOwnerAvatar = document.querySelector("#avatar > img")
const testimonialOwnerName = document.querySelector("#name")
const testimonialOwnerProfession = document.querySelector("#profession")

const positiveRatingIconClass = "fa-solid fa-star"
const negativeRatingIconClass = "fa-regular fa-star"

class Testimonial {
    constructor(avatar, name, profession, testimonial, rating) {
        this.img = avatar;
        this.name = name;
        this.profession = profession;
        this.testimonialContent = testimonial;
        this.rating = rating;
    }
}

const testimonials = [
    new Testimonial("https://randomuser.me/api/portraits/women/1.jpg", "Ida Fox", "System Administrator", "Jane's expertise in software development has been instrumental in our project success. Her attention to detail, coupled with her innovative problem-solving skills, has significantly improved our product's performance. Jane's ability to mentor junior developers and lead the team through complex challenges makes her an invaluable asset to our company.", 5),
    new Testimonial("https://randomuser.me/api/portraits/men/30.jpg", "Javier Perkins", "Database Administrator", "Jane has transformed our database management system with her exceptional DBA skills. Her thorough analysis and implementation of optimized solutions have greatly enhanced our data retrieval speeds and overall system reliability. Jane's commitment to excellence is evident in every project she undertakes.", 3),
    new Testimonial("https://randomuser.me/api/portraits/men/61.jpg", "Mitchell Cole", "Cyber-security Analyst", "Working with Jane has been an incredible experience. Her deep understanding of network engineering and her proactive approach to troubleshooting have saved us countless hours of downtime. Jane's willingness to share her knowledge and collaborate effectively with other team members sets her apart as a true professional in the IT field.", 4),
    new Testimonial("https://randomuser.me/api/portraits/men/94.jpg", "Daniel Jacobs", "Cloud Architect", "Jane is an outstanding DevOps Engineer whose expertise in automation and CI/CD pipelines has streamlined our development processes. Her dedication to improving our infrastructure and her ability to quickly adapt to new technologies have been crucial to our success. Jane's positive attitude and teamwork make her a pleasure to work with every day.")
];

let currentTestimonialIdx = 0;

function renderTestimonial(index) {
    currentTestimonialIdx = index;
    const {img, name, profession, testimonialContent, rating} = testimonials[index];

    renderRating(parseInt(rating) || 0);
    testimonial.innerHTML = testimonialContent
    testimonialOwnerAvatar.src = img;
    testimonialOwnerName.innerHTML = name;
    testimonialOwnerProfession.innerHTML = profession;
}

function renderPrevTestimonial() {
    renderTestimonial((currentTestimonialIdx - 1 + testimonials.length) % testimonials.length);
}

function renderNextTestimonial() {
    renderTestimonial((currentTestimonialIdx + 1 + testimonials.length) % testimonials.length);
}

function renderRating(rating) {
    console.log(rating);
    [...ratingContainer.children]
        .forEach(currStar => currStar.classList = rating-- > 0
            ? positiveRatingIconClass
            : negativeRatingIconClass);
}

bLeft.addEventListener("click", () => renderPrevTestimonial())
bRight.addEventListener("click", () => renderNextTestimonial())

renderTestimonial(0);