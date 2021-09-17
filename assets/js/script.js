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
const form3 = $(`.form3`);
form2.hide();
form3.hide();

$(`.form3 .back`).hide();

const signIn = $(`.login`);
signIn.hide();

const back = $(`.back`);
back.hide();

const form1 = $(`.form1`);
form1.on(`submit`,event => {
    event.preventDefault();

    if ($(`.phoneNumber`).val() === ``) {
        alert(`Please enter a valid phone number`);
        return;
    } else if (isNaN($(`.phoneNumber`).val())) {
        alert(`Please enter a valid phone number`);
        return; 
    } else { // If all conditions are satisfied
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
        
        form2.on(`submit`, event => {
            event.preventDefault();

            if ($(`.firstName`).val() === ``) {
                alert(`Please enter a valid First Name`);
                return;
            } else if ($(`.lastName`).val() === ``) {
                alert(`Please enter a valid Last Name`);
                return;
            } else if ($(`.emailAddress`).val() === ``) {
                alert(`Please enter a valid Email Address`);
                return; 
            } else if ($(`.password`).val() === ``) {
                alert(`Please enter a valid Password`);
                return; 
            } else if ($(`.company`).val() === ``) {
                alert(`Please enter a valid Company Name... If you do not have one, put 'None'.`);
                return; 
            } else if ($(`.termsAgreement`).val() === false) {
                alert(`You must agree to our terms of service and privacy policy`);
                return; 
            } else { // If all conditions are satisfied
                const firstName = $(`.firstName`).val();
                const lastName = $(`.lastName`).val();
                const emailAddress = $(`.emailAddress`).val();
                const password = $(`.password`).val();
                const company = $(`.company`).val();
                const termsAgreement = $(`.termsAgreement`).val();
            
                localStorage.setItem(`First Name`, firstName);
                localStorage.setItem(`Last Name`, lastName);
                localStorage.setItem(`Email Address`, emailAddress);
                localStorage.setItem(`Password`, password);
                localStorage.setItem(`Company`, company);

                console.log(termsAgreement);
                $(`.form2 .back`).hide();
            
                $(`.form2`).hide(750);
                $(`.form3`).show(1500);
                setTimeout(() => {
                    $(`.form3 .back`).show();
                    signIn.fadeOut(1000);
                },1500)

                // User File Handler
                var actualInput = $(`.fileInput`);
                actualInput.change(fileHandler);

                // On File Upload Button Click
                var dropZone = document.querySelector(`.dropZone`);
                dropZone.addEventListener(`click`, event => {
                    actualInput.click();
                })

                dropZone.addEventListener(`drop`, fileHandler);

                    dropZone.addEventListener("dragover", (e) => {
                        e.preventDefault();
                        dropZone.classList.add("drop-zone--over");
                    });

                    ["dragleave", "dragend"].forEach((type) => {
                        dropZone.addEventListener(type, (e) => {
                        dropZone.classList.remove("drop-zone--over");
                        });
                    });

                    dropZone.addEventListener("drop", (e) => {
                        e.preventDefault();

                        if (e.dataTransfer.files.length) {
                        actualInput.files = e.dataTransfer.files;
                        }

                        dropZone.classList.remove("drop-zone--over");
                    });

            }
        })
        
    }

})

// Functions
function fileHandler(event,fileList) {
    event.preventDefault();

    fileList = event.dataTransfer.files;
    console.log(event.dataTransfer.files);

        console.log(fileList);
        var filesContent = $(`<div class="files"></div>`);

        // Generating Elements for Each File
        Object.values(fileList).forEach((file,index) => {
            console.log(file);
            iconType = (icon => {
                icon = file.type;
                switch (icon) {
                    case `audio/mp3`:
                    case `audio/mpeg`:
                    return icon = `<i class="fas fa-file-audio"></i>`;
                    case `video/mp4`: 
                    return icon = `<i class="fas fa-file-video"></i>`;
                    case `image/png`:
                    case `image/jpg`:
                    case `image/jpeg`:
                    return icon = `<i class="fas fa-file-image"></i>`;
                    default:
                    return icon = `<i class="fas fa-file-upload"></i>`;
                } // Generating Icon Based on Which File Type
                return icon;
            }) // Generating File Card Elements
            var fileCard = $(`
                <div class="fileCard">
                    <div class="fileIcon">${iconType()}</div>
                    <div class="fileName">${file.name}</div>
                    <div class="fileType">${file.type}</div>
                </div>
            `);
            filesContent.append(fileCard);
        })
        form3.append(filesContent);
}