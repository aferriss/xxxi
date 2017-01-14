var shell = require('gl-now')({tickRate: 33, doClear : false});
shell.preventDefaults = false; 
var createFbo = require('gl-fbo');
var Triangle = require('gl-big-triangle');
var glUtils = require('./glUtils.js');
// var createShader = require('gl-shader');
var createShader = require('./shader.js').Shader;

var createTexture = require('gl-texture2d');
var glslify = require('glslify');

var triangle;
var fbo, fbo2;
var inc = 0;
var baseShader = {
	vert: glslify('../assets/shaders/base.vert'),
	frag: glslify('../assets/shaders/base.frag'),
	name : 'base'
}

var feedback = {
	vert: glslify('../assets/shaders/fb.vert'),
	frag: glslify('../assets/shaders/fb.frag'),
	name : 'fb',
	uniforms : {}
}

var feedback2 = {
	vert: glslify('../assets/shaders/fb2.vert'),
	frag: glslify('../assets/shaders/fb2.frag'),
	name : 'fb',
	uniforms : {}
}


shell.on('gl-init', function(){
	var gl = shell.gl;

	gl.disable(gl.DEPTH_TEST);
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	baseShader.program = createShader(gl, baseShader);
	feedback.program = createShader(gl, feedback);
	feedback.uniforms.texture = gl.getUniformLocation(feedback.program, 'texture');
	feedback.uniforms.time = gl.getUniformLocation(feedback.program, 'time');

	feedback2.program = createShader(gl, feedback2);
	feedback2.uniforms.texture = gl.getUniformLocation(feedback2.program, 'texture');
	feedback2.uniforms.time = gl.getUniformLocation(feedback2.program, 'time');

	fbo = new glUtils.SetupFbo(gl, shell.width, shell.height).createFbo();
	fbo2 = new glUtils.SetupFbo(gl, shell.width, shell.height).createFbo();

	triangle = Triangle(gl);

});

shell.on('tick', function(){
	var gl = shell.gl;

	fbo.bind();
	gl.useProgram(feedback.program);
		gl.useProgram(feedback.program);
		gl.uniform1i(feedback.uniforms.texture, 0);
		gl.uniform1f(feedback.uniforms.time, inc < 30 ? 0.0 : inc);
		fbo2.color[0].bind();
	// triangle.bind();
	triangle.draw();

	fbo2.bind();
		gl.useProgram(feedback2.program);
		gl.uniform1i(feedback2.uniforms.texture, 0);
		gl.uniform1f(feedback2.uniforms.time, inc);
		fbo.color[0].bind();
	triangle.draw();
	console.log(inc);
	inc++;
});

shell.on('gl-render', function(){
	var gl = shell.gl;
	

	gl.useProgram(feedback.program);
	gl.uniform1i(feedback.uniforms.texture, 0);
		fbo2.color[0].bind();

	triangle.bind();
	triangle.draw();
});

