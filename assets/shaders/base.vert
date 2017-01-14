attribute vec2 position;
varying vec2 vUv;
// varying vec2 uv;
void main(){
	gl_Position = vec4(position,0.0, 1.0);
	vUv = position * vec2(0.5,-0.5) + 0.5;
	// uv = position;
}