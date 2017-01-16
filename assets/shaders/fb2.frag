precision lowp float;
uniform sampler2D texture;
varying vec2 vUv;
uniform float time;
#define TWO_PI 6.283185

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

// float rand(vec2 co){
//     return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
// }

float hash( float n )
{
    return fract(sin(n)*43758.5453);
}

void main(){
	
	float angle =  TWO_PI + time*0.001;
	vec2 tc = vUv;
	tc = -1.0 + 2.0 * tc;
	// tc *= 0.985;
	tc.x *= 0.995125;
	
	tc = tc * 0.5 + 0.5;
	// tc.y -= 0.006;
	tc.y *= 0.9991;

	vec2 tc2 = vUv;
	// tc2 = -1.0 + 2.0 * tc2;
	tc2 *=  map(sin(time*0.005), -1.0, 1.0, 0.9, 0.98);
	// tc2 = tc2 * 0.5 + 0.5;

	vec3 tex = texture2D(texture, tc2 ).rgb;
	float h = hash(time*vUv.x*vUv.y);
	tex = mix(vec3(h,h,h), tex+vec3(h,h,h)*0.05, clamp(time, 0.0,1.0));

	tc.x += cos(angle) / 540.0 * 1.5;
	tc.y += sin(angle) / 960.0 * 1.5;
	// vec3 tex2 = mix(tex, texture2D(texture, vec2(tc)).rgb, clamp(time, 0.0, 1.0));

	vec3 tex2 = mix(tex, texture2D(texture, vec2(tc.x  - tex.g*0.02 , tc.y - tex.b*0.02)).rgb, clamp(time, 0.0, 1.0));

	tex2 += vec3(0.052, 0.01, 0.013);
	tex2 -= tex*0.085;
	tex2 *= 1.01;


	// tex2.rgb = mod(tex2.rgb, vec3(1.0));
	
	gl_FragColor.rgb = tex2;
	gl_FragColor.a = 1.0;
}





