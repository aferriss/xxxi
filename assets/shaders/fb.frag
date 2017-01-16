precision highp float;
uniform sampler2D texture;
varying vec2 vUv;
uniform float time;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(){
	// vec2 tc = gl_FragCoord.xy / resolution;
	float t = time;
	t = mod(t, 59400.0);
	vec4 tex = texture2D(texture, vUv);
	// vec3 random = vec3(rand(0.1+vUv+t*0.01), rand(0.1+vUv+t*0.01), rand(0.1+vUv+t*0.01));
	// tex.rgb += 0.01;
	// tex.rgb = mod(tex.rgb, vec3(1.0));
	gl_FragColor =tex;// mix(vec4(random,1.0), tex+vec4(random,1.0)*0.05, clamp(t, 0.0,1.0));//tex;
	gl_FragColor.a = 1.0;

}