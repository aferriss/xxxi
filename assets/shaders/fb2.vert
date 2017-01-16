attribute vec2 position;
varying vec2 vUv;
void main ()
{
  highp vec4 tmpvar_1;
  tmpvar_1.zw = vec2(0.0, 1.0);
  tmpvar_1.xy = position;
  gl_Position = tmpvar_1;
  vUv = ((position * vec2(0.5, -0.5)) + 0.5);
}
