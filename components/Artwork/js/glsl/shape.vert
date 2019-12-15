attribute vec3 aShape1;
attribute vec3 aShape2;
attribute vec3 aShape3;
attribute vec3 aShape4;

uniform vec4 uProgress;

varying vec3 vPos;

void main(){
    vec3 pos = aShape1 * uProgress.x + aShape2 * uProgress.y + aShape3 * uProgress.z + aShape4 * uProgress.w;
    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    vPos = worldPosition.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPosition;
}