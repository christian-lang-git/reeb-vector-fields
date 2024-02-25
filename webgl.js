exports.getRenderingContext = function(canvas, error_manager) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    //set the canvas buffer to 1920x1080, smaller sizes are handled automatically
    canvas.width = 1920;
    canvas.height = 1080;

    var gl = canvas.getContext("webgl2", {preserveDrawingBuffer: true})
        || canvas.getContext("experimental-webgl");
    if (!gl) {
        error_manager.displayError(ERROR_ID_GET_WEB_GL_CONTEXT);
        return null;
    }
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    console.log("getRenderingContext", gl.drawingBufferWidth, gl.drawingBufferHeight, canvas.width, canvas.height);
    return gl;
}

exports.getRenderingContextTransferFunction = function(canvas, error_manager) {
    //set the canvas buffer to the fixed size: 512x256
    canvas.width = 512;
    canvas.height = 256;

    var gl = canvas.getContext("webgl2", {preserveDrawingBuffer: true})
        || canvas.getContext("experimental-webgl");
    if (!gl) {
        error_manager.displayError(ERROR_ID_GET_WEB_GL_CONTEXT);
        return null;
    }
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    console.log("getRenderingContextTransferFunction", gl.drawingBufferWidth, gl.drawingBufferHeight, canvas.width, canvas.height);
    return gl;
}

exports.loadShaderProgramFromCode = function(gl, program, v_source, f_source) {
    var t_start = performance.now();
    var source = v_source;
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, source);
    gl.compileShader(vertexShader);
    var compiled = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    if (!compiled) {
        // Something went wrong during compilation; get the error
        console.error(gl.getShaderInfoLog(vertexShader));
        console.log("test point 1 vertexShader");
    }
    var t_stop = performance.now();
    //console.log("Performance: compiled vertex shader in: ", Math.ceil(t_stop-t_start), "ms");
    
    var t_start = performance.now();
    var source = f_source;
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, source);
    gl.compileShader(fragmentShader);
    var compiled = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if (!compiled) {
        // Something went wrong during compilation; get the error
        console.error(gl.getShaderInfoLog(fragmentShader));
        console.log("test point 1 fragmentShader");
    }
    var t_stop = performance.now();
    //console.log("Performance: compiled fragment shader in: ", Math.ceil(t_stop-t_start), "ms");


    var t_start = performance.now();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    //console.log("Performance: attached shaders in: ", Math.ceil(t_stop-t_start), "ms");


    //link program: this is the bottleneck
    var t_start = performance.now();
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        // something went wrong with the link
        console.error(gl.getProgramInfoLog(program));
        console.log("test point 2");
    }
    var t_stop = performance.now();
    //console.log("Performance: linked program in: ", Math.ceil(t_stop-t_start), "ms");

    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        var linkErrLog = gl.getProgramInfoLog(program);
        //cleanup();
        document.querySelector("p").innerHTML =
            "Shader program did not link successfully. "
            + "Error log: " + linkErrLog;
        return;
    }
}
/*
function generateDataTextureFloat(gl) {
    var internalformat = gl.R32F;
    var format = gl.RED;
    var type = gl.FLOAT;
    return generateDataTexture(gl, internalformat, format, type);
}

function generateDataTextureInt(gl) {
    var internalformat = gl.R32I;
    var format = gl.RED_INTEGER;
    var type = gl.INT;
    return generateDataTexture(gl, internalformat, format, type);
}

function generateDataTexture(gl, internalformat, format, type) {
    var texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_3D, texture);
    var target = gl.TEXTURE_3D;
    var level = 0;
    var width = 8;
    var height = 8;
    var depth = 8;
    var border = 0;
    var texture_data = 0;
    if (type == gl.FLOAT)
        texture_data = new Float32Array(width * height * depth).fill(0);
    else if (type == gl.INT)
        texture_data = new Int32Array(width * height * depth).fill(0);
    else
        throw "Error unknown type: " + type;

    gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, texture_data);

    // set the filtering so we don't need mips and it's not filtered
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    texture_settings = { target, level, internalformat, width, height, depth, border, format, type };
    return { texture: texture, texture_data: texture_data, texture_settings: texture_settings };
}

function updateDataTexture(gl, texture, texture_data, texture_settings) {
    gl.bindTexture(gl.TEXTURE_3D, texture);
    var target = texture_settings.target;
    var level = texture_settings.level;
    var internalformat = texture_settings.internalformat;
    var width = texture_settings.width;
    var height = texture_settings.height;
    var depth = texture_settings.depth;
    var border = texture_settings.border;
    var format = texture_settings.format;
    var type = texture_settings.type;
    console.log("updateDataTexture");
    console.log("texture_data.length: " + texture_data.length);
    console.log("width: " + width);
    console.log("height: " + height);
    console.log("depth: " + depth);
    gl.texImage3D(target, level, internalformat, width, height, depth, border, format, type, texture_data);
}
*/

