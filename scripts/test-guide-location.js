import fs from 'fs';
import path from 'path';

const projectBase = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/Sistema de Laboratorio Magistral');
const outsideGuide = path.resolve('C:/Users/ituka/Documents/Honey/workspace/Javascript/GUIA_DE_PRUEBAS_Y_EJECUCION.md');

let errores = 0;

if (fs.existsSync(path.join(projectBase, 'GUIA_DE_PRUEBAS_Y_EJECUCION.md'))) {
  console.error('La guia todavia existe dentro del proyecto!');
  errores++;
}

if (!fs.existsSync(outsideGuide)) {
  console.error('La guia no existe en la ubicacion exterior especificada!');
  errores++;
} else {
  const content = fs.readFileSync(outsideGuide, 'utf-8');
  if (!content.includes('aistudio.google.com') || !content.includes('Get API key')) {
    console.error('La guia exterior no contiene el tutorial de Gemini API Key');
    errores++;
  }
}

if (errores === 0) {
  console.log('Verificacion exitosa: La guia esta fuera del proyecto y contiene el tutorial de Gemini API Key.');
} else {
  console.error(`Fallo la verificacion con ${errores} errores.`);
  process.exit(1);
}
