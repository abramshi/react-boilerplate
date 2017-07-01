# Boilerplate For Frontend

## File Orgnization

### src/
Source code for App and unit test.
* **main/** App source code.
* **main/js/** Javascript App, here is design for ReactJS
* **main/ts/** Typescript App, here is for Angular and ReactJS
* **main/\*\*/component/** Component view
* **main/\*\*/module/** App module, the subsystem designed in business or function.
* **main/\*\*/service/** A thin service layer of App. Service will communicate to the server. May be split by business. All the service may inherited from a common service.
* **main/\*\*/vendor/** the 3rd part app or lib.

---

* **main/resource/config/** Configuration or properties of App, module. Json file.
* **main/resource/i18n/** multi-language
* **main/resource/image/** image
* **main/resource/style/** css

### doc/
Usually include design doc, user guide ...
### dist/
Output of App. The dist is product for deployment.
* **appname/** The App name. lowercase.
* **asset/** the resource file, common product from src/**/resource

## Ecosystem

### Language
* **Typescript:**
* **Javascript:**
* **SCSS:**
* **CSS:**
* **HTML5:**

### Dependency And Build
* **NodeJs:**
* **NPM:**
* **Yarn:**

### SCM
* **git:**  

### Frameworks
* **AngularJS:**
* **ReactJS:**
* **Karma:**
* **Jasmine:**

### Package
* **Webpack:**

### Library
* **Lodash:**
* **JQuery:**

### Quality
* **TSLint:**
* **ESLint:**
* **EditorConfig:**
