const numberOfAttributes = document.querySelector('#number-of-attributes');
const inputReadingFileMethod = document.querySelector('#number-of-attributes');
const inputWritingFileMethod = document.querySelector('#number-of-attributes');


const generateInputs = () => {
    const inputs = [];
    const formulary = document.querySelector('#form-2');
    formulary.innerHTML = "";
    for(let i = 0; i < numberOfAttributes.value; i++) {
        const theInput = document.createElement('input');
        theInput.type = "text";
        theInput.id = "class-attribute";
        theInput.name = "class-attribute";
        theInput.placeholder= "private string name";
        inputs.push(theInput);
    }
    formulary.append(...inputs);
}



const getAttributes = () => {
    let attributes = document.querySelectorAll('#class-attribute');
    // let array = [];
    attributes = [...attributes];
    let attributesValuesArray = attributes.map((input)=>{
        return input.value;
    })
    return attributesValuesArray;
}