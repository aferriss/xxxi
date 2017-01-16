var shell = require('gl-now')({tickRate: 100, doClear : false});
shell.preventDefaults = false; 

var createFbo = require('gl-fbo');
var Triangle = require('gl-big-triangle');
var glUtils = require('./glUtils.js');
var createShader = require('./shader.js').Shader;

var createTexture = require('gl-texture2d');
var glslify = require('glslify');

var triangle;
var fbo, fbo2;
var inc = 0;

var feedback2 = {
	vert: glslify('../assets/shaders/fb2.vert'),
	frag: glslify('../assets/shaders/fb2opt.frag'),
	name : 'fb',
	uniforms : {}
}

var w = 1080/2;// window.innerWidth;
var h = 1920/2;//window.innerHeight;
var canvas;
canvas = document.getElementById("canvas");
canvas.width = w;//window.innerWidth;
canvas.height = h;//window.innerHeight;

var gl;
initGl();

function initGl(){
	gl = getWebGLContext(canvas, {preserveDrawingBuffer:false, antialias:false, stencil: false, depth:false});
	gl.enable(gl.BLEND);
	gl.disable(gl.DEPTH_TEST);
	gl.viewport(0,0,w,h);
	

	if(!gl){
		alert("webgl unsupported / problems :( ");
		return;
	}

	feedback2.program = createShader(gl, feedback2);
	feedback2.uniforms.texture = gl.getUniformLocation(feedback2.program, 'texture');
	feedback2.uniforms.time = gl.getUniformLocation(feedback2.program, 'time');
	gl.uniform1i(feedback2.uniforms.texture, 0);

	fbo = new glUtils.SetupFbo(gl, w,h).createFbo();
	fbo2 = new glUtils.SetupFbo(gl, w,h).createFbo();

	triangle = Triangle(gl);
	triangle.bind();
	gl.viewport(0, 0, w, h);
	animate();
}




function animate(){
	setTimeout(function(){
		requestAnimationFrame(animate);
	}, 1000/11);

	fbo.bind();
		fbo2.color[0].bind();
	triangle.draw();

	fbo2.bind();
		gl.useProgram(feedback2.program);
		gl.uniform1f(feedback2.uniforms.time, inc < 30 ? 0.0 : inc % 10000);
		fbo.color[0].bind();
	triangle.draw();
	inc++;
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		fbo2.color[0].bind();
	triangle.draw();
}