// control limited try.
function limitedTry(){
    const pinSubmitBtn = document.getElementById('pin-submit-btn');
    const tryLeft = parseInt(document.getElementById('try-count').innerText);

    if(tryLeft <= 0){
        pinSubmitBtn.disabled = true;
        pinSubmitBtn.style.backgroundColor = 'black';
    }
    else{
        pinSubmitBtn.style.backgroundColor = '#495BC3';
        pinSubmitBtn.disabled = false;
    }
}

// display (none/block) element
function displayElement(id, value){
    document.getElementById(id).style.display = value;
}


// Generate Pin 
function generatePin(){
    const pin = Math.round(Math.random() * 10000);
    const pinString = pin + '';
    
    if(pinString.length == 4){
        document.getElementById('generated-pin').value = pin;
    }
    else{
        generatePin();
    }

    document.getElementById('try-count').innerText = 3;
    document.getElementById('input-pin').value = '';
    displayElement('failed-msg', 'none');
    displayElement('success-msg', 'none');
    displayElement('blank-gen-pin', 'none');
    limitedTry();
}

// get key pad value.
document.getElementById('key-pad').addEventListener('click', function(event){
    const number = event.target.innerText;
    const typedPin = document.getElementById('input-pin');

    if(isNaN(number)){
        if(number == 'C'){
            typedPin.value = '';
        }
    }
    else{
        const previousTypedPin = typedPin.value;
        typedPin.value = previousTypedPin + number;
    }
})


// verify pin (generated pin = entered pin)
function verifyPin(){
    const genPin = document.getElementById('generated-pin').value;
    const enteredPin = document.getElementById('input-pin').value;
    const tryCount = document.getElementById('try-count');

    if(genPin == ''){
        displayElement('blank-gen-pin', 'block');
    }
    else{
        displayElement('blank-gen-pin', 'none');
        if(genPin == enteredPin){
            displayElement('success-msg', 'block');
            displayElement('failed-msg', 'none');
        }
        else{
            displayElement('success-msg', 'none');
            displayElement('failed-msg', 'block');
            const count = parseInt(tryCount.innerText);
            tryCount.innerText = count - 1;
        }
    }
    limitedTry();
}