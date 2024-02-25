//WEB GL ERRORS
global.ERROR_ID_GET_WEB_GL_CONTEXT = 1001;
global.ERROR_TEXT_GET_WEB_GL_CONTEXT = "Failed to use WebGL 2.0 context.";
//+ " Your browser or device may not support WebGL 2.0.";







class ErrorManager{

    constructor(){
        this.buildErrorDictionary();
    }

    buildErrorDictionary() {
        this.error_dictionary = {};
    
        //WEB GL ERRORS
        this.error_dictionary[ERROR_ID_GET_WEB_GL_CONTEXT] = ERROR_TEXT_GET_WEB_GL_CONTEXT;
    
    }

    displayError(error_id) {
        console.warn("DISPLAY ERROR");
        document.getElementById("wrapper_dialog_error").className = "wrapper";
        document.getElementById("error_title").innerText = "Error " + error_id;
        document.getElementById("error_description").innerText = this.error_dictionary[error_id];
        document.getElementById("error_link").setAttribute("href", "https://sfb-trr191.github.io/3-torus-flowvis-tool-tutorial/error_"+error_id+".html");

        
    }
}

module.exports = ErrorManager;