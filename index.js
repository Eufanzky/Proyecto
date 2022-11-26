


const createClass = () => {
    const inputReadingWritingFileMethod = document.querySelector('#checkbox1');
    const inputFile = document.querySelector('#checkbox2');
    if(inputReadingWritingFileMethod.checked) {
        createWithReadingWritings();
    } else if(inputFile.checked) {
        createClassFile();
    } else {
        createNormal();
    }
} 


const createNormal = ()=> {
    let className = document.querySelector('#class-name').value;
    let atributes = getAttributes();
    let gen =`
    using System;
    using System.IO;
    class ${className}{
        ${genAtributes(atributes)};
        ${genConstructor(atributes, className)}
        ${genGettersAndSetters(atributes)}
        ${genRead(atributes)}
        ${genShow(atributes)}
    }`
    
    console.log(gen);
    
    let answer = document.querySelector('#answer');
    answer.textContent = gen;

}


//for reading and writings
const createWithReadingWritings = () => {
    let className = document.querySelector('#class-name').value;
    let atributes = getAttributes();
    let gen =`
    using System;
    using System.IO;
    class ${className}{
        ${genAtributes(atributes)};
        ${genConstructor(atributes, className)}
        ${genGettersAndSetters(atributes)}
        ${genRead(atributes)}
        ${genShow(atributes)}
        ${genReadingForFile(atributes)}
        ${genWritingForFile(atributes)}
    }`
    
    console.log(gen);
    
    let answer = document.querySelector('#answer');
    answer.textContent = gen;

};


const createClassFile = () => {
    let className = document.querySelector('#class-name').value;
    let atributes = getAttributes();
    let classForFile = document.querySelector('#classForFile').value;
    let gen =`
    using System;
    using System.IO;
    class ${className}{
        ${genAtributes(atributes)};
        ${genConstructor(atributes, className)}
        ${genGettersAndSetters(atributes)}
        ${genRead(atributes)}
        ${genShow(atributes)}
        ${genFileClassCreateNew()}
        ${genFileClassAdd(atributes)}
        ${genFileClassList()}
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
const genConstructor = (atributes, className) => {
    
    let dataTypes = atributes.map((at)=>{
        let array = at.split(' ');
        return array[1];
    });
    let atributesName = atributes.map((at)=>{
        let array = at.split(' ');
        return array[2];
    });

    let constructoAttributes = ``;
    for (let i = 0; i < atributes.length; i++) {
        constructoAttributes = constructoAttributes + 
        `
            this.${atributesName[i]} = ${atributesName[i]};`
    }

    let params = [];
    for (let i = 0; i < atributes.length; i++) {
        params.push(`${dataTypes[i]} ${atributesName[i]}`);
    }
    params = params.join(',');
    
    let finalResult = `
        public ${className} (${params}) {
            ${constructoAttributes}
        }
    `
    return finalResult; 
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

const genReadingForFile = (atributes) => {
    
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
        let type;
        if(dataTypes[i] === "string") {
            type = "String";
        } else if(dataTypes[i] === "string") {
            type = "Int32";
        } else if(dataTypes[i] === "double") {
            type = "double";
        } else if(dataTypes[i] === "boolean") {
            type = "Boolean";
        } else if(dataTypes[i] === "char") {
            type = "Char";
        }


        readers = readers + `
            ${atributesName[i]} = lector.Read${type}()`;
    }

    let readerMethod = `
        public void leerAA() {
            ${readers}
        }
    `;
    return readerMethod;
}


const genWritingForFile = (atributes) => {
    let dataTypes = atributes.map((at)=>{
        let array = at.split(' ');
        return array[1];
    });
    let atributesName = atributes.map((at)=>{
        let array = at.split(' ');
        return array[2];
    });
    let writers = ``;
    for (let i = 0; i < atributes.length; i++) {
        writers = writers+ `
            escritor.Write(${atributesName[i]})`;
    }

    let writerMethod = `
        public void escribirAA() {
            ${writers}
        }
    `;
    return writerMethod;
}


const genFileClassCreateNew = () => {
    let method = `
    public void crearNuevo() {
		if( System.IO.File.Exists(nombre) ) {
			Console.WriteLine("Realmente quiere crear el archivo ojo que se borraran los registros?. s/n");
			if( Console.ReadKey().KeyChar == 's' )
				System.IO.File.Delete(nombre);
		}
		else
			Console.WriteLine("El archivo no existe.");
	}
    `
    return method;
}

const genFileClassAdd = (className) => {
    let method = `
    public void adicionar() {
		// Abrimos el archivo o se crea un nuevo archivo si no existe
		Stream archp = File.Open(nombre, FileMode.Append);
		BinaryWriter escritor = new BinaryWriter(archp);
		${className} clas = new ${className}();
		try {
			do {
				clas.leer();
				clas.escribirAA(escritor);
				Console.Write("Desea continuar añadiendo Estudiantes? s/n => ");
			} while( Console.ReadKey().KeyChar == 's' );
		}
		catch( Exception ) {
			Console.WriteLine("Fallo en adicionar el objeto !!!");
		}
		finally {
			archp.Close();
		}
	}
    `
    return method;
}

const genFileClassList = (className) => {
    let method = `
    public void listar() {
		// Abrimos el archivo o se crea un nuevo archivo si no existe
		Stream archp = File.Open(nombre, FileMode.Open);
		BinaryReader lector = new BinaryReader(archp);
		${className} clas = new ${className}();
		try {
			Console.Write("\n\tnombre\tEdad");
			while( true ) {
				clas.leerAA(lector);
				clas.mostrar();
			}
		}
		catch( Exception ) {
			Console.WriteLine("Fin de archivo ...");
		}
		finally {
			archp.Close();
		}
	}
    `
    return method;
}

const genFileClassDelete = () => {
    let method = `
    public bool eliminar( string codigo ) {
		bool sw = false;
		try {
			// Abrimos el archivo o se crea un nuevo archivo si no existe
			Stream archp = File.Open(nombre, FileMode.Open);
			Stream archTemporal = File.Open(@"..\temp.dat", FileMode.OpenOrCreate);
			BinaryReader lector = new BinaryReader(archp);
			BinaryWriter escribeTemp = new BinaryWriter(archTemporal);
			${className} clas = new ${className}();
			
			try {
				while( true ) {
					clas.leerAA(lector);
					if( clas.getExample() != codigo ) {
						clas.escribirAA(escribeTemp);
					}
					else {
						sw = true;
					}
				}
			}
			catch( Exception ) {
				// No hace nada.
			}
			finally {
				archp.Close();
				archTemporal.Close();
				File.Replace(@"..\temp.dat", nombre, nombre + ".bak");
			}
		}
		catch( Exception ) {
			Console.WriteLine("El archivo no se puede acceder !!!");
		}
		return sw;
	}
    `
    return method;
}