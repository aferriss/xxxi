precision highp float;
uniform sampler2D texture;
varying vec2 vUv;

void main(){
	// vec2 tc = gl_FragCoord.xy / resolution;
	//vec4 tex = texture2D(texture, vUv);
	gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}