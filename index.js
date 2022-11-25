


const createClass = () => {
    let className = document.querySelector('#class-name').value;
    let atributes = getAttributes();
    let gen =`
    using System;
    using System.IO;
    class ${className}{
        ${genAtributes(atributes)};
        ${genGettersAndSetters(atributes)}
        ${genRead(atributes)}
        ${genShow(atributes)}
    }`
    
    console.log(gen);
    
    let answer = document.querySelector('#answer');
    answer.textContent = gen;

} 


const genAtributes = (atributes) => {
    let att = `` 
    for (let i = 0; i < atributes.length; i++) {
        att = att + `
        ${atributes[i]}`;        
    }
    return att;
}

const genGettersAndSetters = (atributes) => {
    
    let dataTypes = atributes.map((at)=>{
        let array = at.split(' ');
        return array[1];
    });
    let atributesName = atributes.map((at)=>{
        let array = at.split(' ');
        return array[2];
    });
    console.log(dataTypes);
    console.log(atributesName);
    let finalString = ``;
    for (let i = 0; i < atributes.length; i++) {
        finalString = finalString + `
        public ${dataTypes[i]} get${atributesName[i]} () {
            return this.${atributesName[i]};  
        }`
    }

    for (let i = 0; i < atributes.length; i++) {
        finalString = finalString + 
        `
        public ${dataTypes[i]} set${atributesName[i]} (${dataTypes[i]} ${atributesName[i]}) {
            this.${atributesName[i]} = ${atributesName[i]};  
        }`
    }
    return finalString;
    
}

const genRead = (atributes) => {   
    let dataTypes = atributes.map((at)=>{
        let array = at.split(' ');
        return array[1];
    });
    let atributesName = atributes.map((at)=>{
        let array = at.split(' ');
        return array[2];
    });
    let readers = ``;
    for (let i = 0; i < atributes.length; i++) {
        let readingType;
        if(dataTypes[i] === "string") {
            readingType = "Cadena()";
        } else if(dataTypes[i] === "short") {
            readingType = "Short()";
        } else if(dataTypes[i] === "int") {
            readingType = "Integer()";
        } else if(dataTypes[i] === "long") {
            readingType = "Long()";
        } else if(dataTypes[i] === "float") {
            readingType = "Float()";
        } else if(dataTypes[i] === "double") {
            readingType = "Double()";
        } else if(dataTypes[i] === "decimal") {
            readingType = "Decimal()";
        }

        readers = readers + `
        \tConsole.Write("${atributesName[i]} => ");
        \t${atributesName[i]} = Leer.${readingType};`
    }
    let readMethod = `public void leer() {
            ${readers}
        }`;
    return readMethod;
    
}

const genShow = (atributes) => {
    let dataTypes = atributes.map((at)=>{
        let array = at.split(' ');
        return array[1];
    });
    let atributesName = atributes.map((at)=>{
        let array = at.split(' ');
        return array[2];
    });
    let printers = ``;
    for (let i = 0; i < atributes.length; i++) {
        printers = printers + `
            Console.WriteLine("${atributesName[i]}:" + ${atributesName[i]});`;
    }

    let printerMethod = `
        public void mostrar() {
            ${printers}
        }
    `;
    return printerMethod;
}

