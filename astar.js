function Point(x_, y_) {
	this.x = x_;
	this.y = y_;

	this.equals = function(other) {
		return this.x == other.x && this.y == other.y;
	};
}

var _vertexBuffer;
var _vertexColorBuffer;

var poly;
var color;
var colors = [];
function init() {
	poly = [0, 0, 193, 195, 40, 129, 92, 230, 280, 81, 450, 402, 134, 330, 477, 70];
	color = [1.0, 1.0, 1.0, 1.0];

	_vertexBuffer = gl.createBuffer();
	_vertexBuffer.numItems = poly.length;
	_vertexBuffer.itemSize = 2;
	_vertexBuffer.numVertices = _vertexBuffer.numItems / _vertexBuffer.itemSize;

	for (var i = 0; i < _vertexBuffer.numVertices; ++i) {
		colors = colors.concat(color);
	}

	_vertexColorBuffer = gl.createBuffer();
	_vertexColorBuffer.itemSize = 4;

	_setupBuffers();
}

function addPoint(location) {
	poly.push(location[0], location[1]);
	colors = colors.concat(color);
	_setupBuffers();
}

function _setupBuffers() {
	// Vertex Buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, _vertexBuffer);

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(poly), gl.STATIC_DRAW);
	_vertexBuffer.numItems = poly.length;
	_vertexBuffer.numVertices = _vertexBuffer.numItems / _vertexBuffer.itemSize;

	// Vertex Color buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, _vertexColorBuffer);

	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	_vertexColorBuffer.numItems = colors.length;

	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

function drawPoints() {
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	gl.bindBuffer(gl.ARRAY_BUFFER, _vertexBuffer);
 	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, _vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, _vertexColorBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, _vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	//mvPushMatrix();
	//mat4.translate(mvMatrix, mvMatrix, [-canvas.width * 0.5, -canvas.height * 0.5, 0.0]);

	//setMatrixUniforms();
	gl.drawArrays(gl.POINTS, 0, _vertexBuffer.numVertices);

	//mvPopMatrix();

	gl.bindBuffer(gl.ARRAY_BUFFER, null);
}