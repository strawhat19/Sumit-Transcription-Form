// Fading In Main Body
const body = $(`body`);
body.attr(`style`,`display: none`);
body.fadeIn(2000);

// DNA Animation
var dnaAnimation = bodymovin.loadAnimation({
    container: document.querySelector('#dna'),
    renderer: `svg`,
    loop: true,
    autoplay: true,
    path: `./assets/js/DNA.json`
})

const form2 = $(`.form2`);
form2.hide();

const signIn = $(`.login`);
signIn.hide();

const back = $(`.back`);
back.hide();

const form1 = $(`.form1`);
form1.on(`submit`,event => {
    event.preventDefault();

    $(`.phoneNumber`).val() === `` ? alert(`Please enter a valid phone number`) : true;
    isNaN($(`.phoneNumber`).val()) ? alert(`Please enter a valid phone number`) : true;

    const phoneNumber = $(`.phoneNumber`).val();
    const language = $(`.languages`).val();
    const position = $(`.position`).val();

    localStorage.setItem(`Phone Number`, phoneNumber)
    localStorage.setItem(`Language`, language)
    localStorage.setItem(`Position`, position)

    $(`.form1`).hide(750);
    $(`.form2`).show(1500);
    setTimeout(() => {
        back.show();
        signIn.fadeIn(1000);
    },1500)

})