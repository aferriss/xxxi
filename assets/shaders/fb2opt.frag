precision lowp float;
uniform sampler2D texture;
varying vec2 vUv;
uniform float time;
void main ()
{
  lowp vec3 tex2_1;
  vec2 tc_2;
  float tmpvar_3;
  tmpvar_3 = (6.283185 + (time * 0.001));
  tc_2 = (-1.0 + (2.0 * vUv));
  tc_2.x = (tc_2.x * 0.995125);
  tc_2 = ((tc_2 * 0.5) + 0.5);
  tc_2.y = (tc_2.y * 0.9991);
  float tmpvar_4;
  tmpvar_4 = fract((sin(
    ((time * vUv.x) * vUv.y)
  ) * 43758.55));
  lowp vec3 tmpvar_5;
  float tmpvar_6;
  tmpvar_6 = clamp (time, 0.0, 1.0);
  tmpvar_5 = mix (vec3(tmpvar_4), (texture2D (texture, (vUv * 
    (0.9 + ((0.08000004 * (
      sin((time * 0.005))
     - -1.0)) / 2.0))
  )).xyz + (vec3(tmpvar_4) * 0.05)), tmpvar_6);
  tc_2.x = (tc_2.x + ((
    cos(tmpvar_3)
   / 540.0) * 1.5));
  tc_2.y = (tc_2.y + ((
    sin(tmpvar_3)
   / 960.0) * 1.5));
  lowp vec2 tmpvar_7;
  tmpvar_7.x = (tc_2.x - (tmpvar_5.y * 0.02));
  tmpvar_7.y = (tc_2.y - (tmpvar_5.z * 0.02));
  tex2_1 = (mix (tmpvar_5, texture2D (texture, tmpvar_7).xyz, tmpvar_6) + vec3(0.052, 0.01, 0.013));
  tex2_1 = (tex2_1 - (tmpvar_5 * 0.085));
  tex2_1 = (tex2_1 * 1.01);
  gl_FragColor.xyz = tex2_1;
  gl_FragColor.w = 1.0;
}
