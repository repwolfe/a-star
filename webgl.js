/**
 * WebGL boilerplate code
 */
var gl;

/**
 * Gets the shader object from the scripts
 */
function getShader(gl, id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		alert(id);
		return null;
	}

	// Fill str with the souce of the shader
	var str = "";
	var k = shaderScript.firstChild;
	while (k) {
		// ????
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}

	var shader;

	if (shaderScript.type == "x-shader/x-fragment") {
		shader = gl.createShader(gl.FRAGMENT_SHADER);
	} else if (shaderScript.type == "x-shader/x-vertex") {
		shader = gl.createShader(gl.VERTEX_SHADER);
	} else {
		return null;
	}

	gl.shaderSource(shader, str);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		alert(gl.getShaderInfoLog(shader));
		return null;
	}

	return shader;
}

var shaderProgram;

function initShaders() {
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		alert("Could not initialize shaders");
	}

	gl.useProgram(shaderProgram);

	// Set program's variables to be vertex shader's variables
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
	gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
}

var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();	// perspective

function mvPushMatrix() {
	mvMatrixStack.push(mat4.clone(mvMatrix));
}

function mvPopMatrix() {
	if (mvMatrixStack.length == 0) {
		throw "Invalid popMatrix!";
	}
	mvMatrix = mvMatrixStack.pop();
}

function degToRad(degrees) {
	return degrees * Math.PI / 180;
}

function $(id) {
	return document.getElementById(id);
}

function setMatrixUniforms() {
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}

/**
 * Convenience function to get the cursors position
 */
function getCursorPosition(e) {
	var x, y;
	if ( event.offsetX == null ) {	// Firefox
	   x = event.originalEvent.layerX;
	   y = event.originalEvent.layerY;
	}
	else {	// Other browsers
	   x = event.offsetX;
	   y = event.offsetY;
	}
	return [x, y];
}

/**
 * Event handler when the mouse is moved over the canvas
 */
function canvasMouseMove(e) {
	
}

/**
 * Event handler when the mouse is pressed down
 */
function canvasMouseDown(e) {
	
}

/**
 * Event handler when a mouse click occurs
 */
function canvasClick(e) {
	
}

function tick() {
	requestAnimFrame(tick);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}

function webGLStart() {
	var canvas = $("canvas");
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		return;
    }
	canvas.addEventListener("mousemove", canvasMouseMove, false);
	canvas.addEventListener("mousedown", canvasMouseDown, false);
	canvas.addEventListener("mouseup", canvasClick, false);

	initShaders();

    gl.viewportWidth = canvas.width;
	gl.viewportHeight = canvas.height;
	gl.clearColor(0.14, 0.14, 0.14, 1.0);
	gl.enable(gl.DEPTH_TEST);

	tick();
}