module.exports = {

	FragShader : function(gl, ShaderSrc){
		// console.log(ShaderSrc);
		this.loadShader =  function(){
			var shader = gl.createShader(gl.FRAGMENT_SHADER);
			gl.shaderSource(shader, ShaderSrc);
			gl.compileShader(shader);

			// var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
			//   if (!success) {
			//     // Something went wrong during compilation; get the error
			//     throw "could not compile shader:" + gl.getShaderInfoLog(shader);
			//   }

			return shader;
		};
	},

	VertShader : function(gl, ShaderSrc){
		this.loadShader =  function(){
			var shader = gl.createShader(gl.VERTEX_SHADER);
			gl.shaderSource(shader, ShaderSrc);
			gl.compileShader(shader);

			// var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
			//   if (!success) {
			//     // Something went wrong during compilation; get the error
			//     throw "could not compile shader:" + gl.getShaderInfoLog(shader);
			//   }

			return shader;
		};
	},

	Program : function(gl, shaders){

		this.loadProgram = function(){
			var program = gl.createProgram();
			for(var ii = 0; ii<shaders.length; ii++){
				gl.attachShader(program, shaders[ii]);
			}

			gl.linkProgram(program);

			// var success = gl.getProgramParameter(program, gl.LINK_STATUS);
			//   if (!success) {
			//       // something went wrong with the link
			//       throw ("program failed to link:" + gl.getProgramInfoLog (program));
			//   }

			gl.useProgram(program);
			// gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
			// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			//     -1, 0, 0,
			//     0, -1, 0,
			//     1, 1, 0
			//   ]), gl.STATIC_DRAW)
			// this.initBuffer([
		 //    -1.0,1.0,
		 //    0.0,-1.0,
		 //    -1.0,0.0,
		 //    1.0,1.0,
		 //    0.0,1.0,
		 //    -1.0,0.0
		 //    ]);
		 	this.initBuffer([-1, -1, -1,
      +4, +4, -1])


			var pos_attrib = gl.getAttribLocation(program, 'position');
		    gl.enableVertexAttribArray(pos_attrib);
			gl.vertexAttribPointer(pos_attrib, 2, gl.FLOAT, false, 0,0);

			return program;
		};

		this.initBuffer = function(dataset){
			gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer() );
		    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataset), gl.STATIC_DRAW);
		}

		// this.bind = function(){
		// 	this.gl.useProgram(this.program);
		// };
	},

	Shader : function(gl, ShaderSrc){
		var fragShader = new module.exports.FragShader(gl, ShaderSrc.frag).loadShader();
		var vertShader = new module.exports.VertShader(gl, ShaderSrc.vert).loadShader();
		var program = new module.exports.Program(gl, [vertShader, fragShader]).loadProgram();
		return program;
	}
	

};