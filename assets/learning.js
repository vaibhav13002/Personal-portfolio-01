//Tumhare code mein ek scroll-based navbar highlighting ho raha hai — jab koi section viewport (screen area) mein aata hai, tab uska id detect karke navbar ke link ko highlight kiya ja raha hai.

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            highlightNavLinks(id);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// 1. IntersectionObserver ka kaam
// Yeh ek browser feature hai jo check karta hai:
// “Kya koi element screen ke view mein aa gaya hai?”
// const observer = new IntersectionObserver((entries, observer) => { ... });
// ➡️ Jab bhi koi section scroll kar ke visible hota hai, callback function run hota hai.


//  2. entries.forEach(entry => { ... })
// Yeh loop karta hai un sections pe jo visible ya invisible ho rahe hain.

//  3. if (entry.isIntersecting)
// Yeh check karta hai:

// "Kya current section user ki screen mein visible hai?"

// ✅ Agar haan — toh:

// const id = entry.target.getAttribute('id');
// 🧠 entry.target = Jo section screen pe dikh raha hai
// 🧠 .getAttribute('id') = Us section ka id le aata hai
// Jaise agar <section id="about">, toh id = "about"

// 4. highlightNavLinks(id);
// Ab yeh function usi id ke link ko highlight karega:

// if (link.getAttribute('href') === `#${id}`) {
//     link.classList.add('text-cyan-400', 'font-bold');
// }
// Matlab:

// Agar id = 'about'

// Toh woh dekhega a[href="#about"]

// Us link ko bold aur color de dega

///////////////////////
/* Syntax of IntersectionObserver:

new IntersectionObserver(callback, options);
callback = function that runs whenever observed elements intersect with the viewport.

options = an object to configure how intersection is detected.
*/
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.4
};
/*
Yeh object define karta hai:
root: null means default is the viewport
rootMargin: extra space around the root. 0px = no extra margin
threshold: 0.4 means 40% of the section must be visible for it to be considered “intersecting”
*/

// Chalo root aur rootMargin ko real-life examples ke through step-by-step samjhte hain.
/* 
root: null
👉 iska matlab hota hai:
"Check karo kya element viewport (i.e., visible screen area) ke andar aa raha hai ya nahi."
✅ Default behavior hota hai yeh. Agar tum kuch nahi likhte ya null dete ho, toh browser viewport use hota hai root ke liye.
root kisi bhi scrollable container ka reference ho sakta hai.
i.e., tum kisi specific div ke andar ke scroll ko observe kar sakte ho.

✅ Example:
html
Copy
Edit
<div id="scroll-box" style="height: 300px; overflow-y: scroll;">
    <section>...</section>
    <section>...</section>
</div>

const scrollBox = document.getElementById('scroll-box');

const observer = new IntersectionObserver(callback, {
    root: scrollBox,
    threshold: 0.5
});
🔸 Is case me observer sirf scroll-box ke andar ka scroll dekhega — viewport nahi.
*/

//////////////
/*  rootMargin: '0px' – What Does It Do?
Matlab:

“Intersection check karne ke liye koi extra padding (margin) add ya minus mat karo.”
Yeh margin hota hai around the root — i.e., viewport ya custom container.
✅ Then, What Else Can Be rootMargin?
rootMargin me tum positive ya negative values de sakte ho in px, %, em etc.

🟩 Examples:
rootMargin: '100px'
➤ Viewport ke bahar se hi trigger hoga
➤ Jaise hi element 100px before viewport me aane wala ho, trigger ho jaayega

rootMargin: '-100px'
➤ Trigger late karega
➤ Element ka kuch part screen me aane ke baad hi trigger karega

rootMargin: '0px 0px -50% 0px'
➤ Iska matlab:

top: 0px

right: 0px

bottom: -50% (viewport ka half niche ignore karo)

left: 0px

🔸 Use-case: Tabhi trigger ho jab element viewport ke upper half me ho (used for active nav link highlighting)
*/
/////////////////
/*🔍 .observe() kya karta hai?
🔹 Definition:

observer.observe(targetElement);
👉 Yeh method kisi ek element ko observe karna start karta hai —
matlab scroll hone par check karega ki:

“Kya yeh element viewport (ya root) ke andar aa gaya hai ya nahi?”
*/
/*✅ Real-life analogy:
Socho IntersectionObserver ek CCTV camera hai.

Tumne CCTV install kiya (new IntersectionObserver(...))

Lekin tab tak kuch nahi dikhega jab tak tum usse ye na batao:

"Bhai! Ye section dekho — mujhe batana jab yeh screen pe dikhe."

🟩 Wo kaam karta hai .observe() method:
observer.observe(section);
Ab observer ko pata chal gaya:

“Mujhe is section pe nazar rakhni hai.”
*/

/////////////////
/* 📌 1. observer.observe(section) ka kaam
sections.forEach(section => {
    observer.observe(section);
});
Ye line har <section> ko observe() me de raha hai.

➡️ Matlab:
“Observer! In sab sections ko track karo, jab bhi koi bhi section viewport me dikhne lage, mujhe callback me batana.”
✅ IntersectionObserver ka callback tabhi run hota hai jab:
Koi observed element (like a <section>)
Tumhare defined threshold ke hisaab se
Viewport me visible ho jata hai ya chala jaata hai
*/
