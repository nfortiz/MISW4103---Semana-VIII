# MISW4103-Semana-VII
- Daniel Andrade Suárez - d.andrades@uniandes.edu.co
- Daniel Oicatá Hernández - d.oicata@uniandes.edu.co
- Felix Orduz - f.orduz@uniandes.edu.co
- Nixon Ortiz - nf.ortiz@uniandes.edu.co

## Ejecutar las pruebas

### Prerequisitios
- Node JS (versión superior a la 15.0)
- Ghost ejecutandose (versión 5.96.0)
- Git (versión 2.46.0)

### Clone del repositorio
A través del comando git clone, se debe clonar el repositorio a un directorio local. 

### Recomendaciones para la ejecución de las pruebas:**
- **Condiciones iniciales para ejecutar pruebas en Ghost:** Las pruebas deben ejecutarse en la versión de Ghost 5.96 y se enfocan en las funcionalidades principales de la ABP (Posts, Pages, Tags, Members, Settings y Diseño de Ghost). Para evitar interferencias en los resultados, se recomienda que estas secciones estén vacías y sin contenido en drafts, ya que elementos existentes pueden afectar la ejecución correcta de las pruebas. Aplica para Cypress como a Kraken.

- **Manejo de errores iniciales en Cypress y Kraken:** Al ejecutar las pruebas por primera vez, Cypress y Kraken pueden presentar errores inesperados, como problemas para cargar Ghost a tiempo. Si las dos primeras ejecuciones fallan, se recomienda reintentarlas, ya que en la mayoría de los casos, las pruebas logran completarse exitosamente después de estos dos intentos.

### Instalación de dependencias:
- Las dependencias del proyecto están definidas en los archivos package.json y package-lock.json. Para instalarlas, primero se debe ejecutar `npm install` para descargar e instalar todas las dependencias especificadas.

### Instalacion de Ghost
- Primero: Instalar Ghost-CLI 
`npm install ghost-cli@latest -g`

- Luego, en su terminal, acceda a un directorio vacío y ejecute el comando de instalación:
`ghost install local`

- Una vez finalizada la instalación, dirigase a  `http://localhost:2368/ghost` para acceder a Ghost Admin.

### Ejecución en Cypress
- **Instalación de Cypress:** Cypress se instala con el comando `npm install cypress --save-dev`. Una vez instalado, puede verificar la versión en el archivo package.json la cual debe ser `13.5.2` para asegurar la compatibilidad con este repositorio.
  
- **Configuración de credenciales:** En la ruta `cypress/fixtures/`, se encuentra el archivo `properties.json`, donde es necesario reemplazar los valores de `email` y `password` con las credenciales para ejecutar las pruebas correctamente.

  
- **Ejecución de pruebas**: Para iniciar las pruebas, se abre una terminal y se ejecuta el comando `npx cypress open`, lo que lanzará la interfaz de Cypress. A continuación, cree un nuevo proyecto apuntando al directorio donde se clonó el repositorio.

 - Para ejecutar las pruebas, seleccione cada archivo `*.cy.js` y haga clic para ejecutarlo. Se recomienda realizar la ejecución de los archivos uno por uno para garantizar la ejecución exitosa de cada funcionalidad de Ghost.
  
