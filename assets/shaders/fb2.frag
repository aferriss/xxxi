precision highp float;
uniform sampler2D texture;
varying vec2 vUv;
uniform float time;
#define TWO_PI 6.283185

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

vec3 map(vec3 value, vec3 inMin, vec3 inMax, vec3 outMin, vec3 outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}


const lowp vec3 W = vec3(0.2125, 0.7154, 0.0721);

void main(){
	// vec2 tc = gl_FragCoord.xy / resolution;
	float t = time;
	t = mod(t, 59400.0);
	float angle =  TWO_PI + t*0.001;
	vec2 tc = vUv;
	tc = -1.0 + 2.0 * tc;
	tc *= 0.999;
	tc = tc * 0.5 + 0.5;
	tc.y -= 0.006;
	// tc.x -= 0.002;

	vec2 tc2 = vUv;
	// tc2 = -1.0 + 2.0 * tc2;
	tc2 *= map(sin(t*0.005), -1.0, 1.0, 0.5, 0.98);
	// tc2 = tc2 * 0.5 + 0.5;

	vec4 tex = texture2D(texture, tc2 );

	tc.x += cos(angle) / 1280.0*5.5;
	tc.y += sin(angle) / 720.0*6.5;
	vec2 avg = tex.gb;//dot(tex.rgb, vec3(1.0))*0.333;
	// avg = -1.0 + 2.0 * avg;
	// avg.r += cos(angle) / 1280.0*1.0;
	// avg.g += sin(angle) / 720.0*1.0;
	// avg = avg * 0.5 + 0.5;
	vec4 tex2 = texture2D(texture, vec2(tc.x -avg.r*0.02 , tc.y + avg.y*0.03));

	tex.r += 0.01;
	tex.g += 0.012;
	tex.b += 0.013;
	
	// tex2.rgb *= tex.rgb*1.1;
	tex2.rgb -= tex.rgb*0.1;
	tex2.rgb *= 1.01;

	// tex2.rgb = map(tex2.rgb, vec3(0.0), tex2.rgb, vec3(0.0), vec3(1.0));
	// tex2.rgb = mix(tex2.rgb, tex.rgb, 0.05);
	// tex2.rgb = pow(tex2.rgb, vec3(1.3));
	// tex2.rgb = (tex2.rgb);
	// tex2.rgb = mod(tex2.rgb, vec3(1.0));
	// tex2.rgb = tex2.r <= 0.01 ? ve3(1.0) : tex2.rgb;

	// tex.g = tex.r;
	gl_FragColor = tex2;
}