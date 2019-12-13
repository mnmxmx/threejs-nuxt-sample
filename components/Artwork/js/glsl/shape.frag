varying vec3 vPos;

const vec3 objColor = vec3(1.0);

const vec3 hemiLight_g = vec3(0.86,0.86,0.86);

const vec3 hemiLight_s_1 = vec3(0.5882352941176471,0.8274509803921568,0.8823529411764706);
const vec3 hemiLight_s_2 = vec3(0.9686274509803922,0.8509803921568627,0.6666666666666666);
const vec3 hemiLight_s_3 = vec3(0.8784313725490196,0.5882352941176471,0.7647058823529411);

const vec3 dirLight = vec3(0.16);
const vec3 dirLight_2 = vec3(0.02);


const vec3 hemiLightPos_1 = vec3(100.0, 100.0, -100.0);
const vec3 hemiLightPos_2 = vec3(-100.0, -100.0, 100.0);
const vec3 hemiLightPos_3 = vec3(-100.0, 100.0, 100.0);

const vec3 dirLightPos = vec3(-50, 50, 50);
const vec3 dirLightPos_2 = vec3(30, -50, -50);

vec3 calcIrradiance_hemi(vec3 newNormal, vec3 lightPos, vec3 grd, vec3 sky){
    float dotNL = dot(newNormal, normalize(lightPos));
    float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

    return mix(grd, sky, hemiDiffuseWeight);
}

vec3 calcIrradiance_dir(vec3 newNormal, vec3 lightPos, vec3 light){
    float dotNL = dot(newNormal, normalize(lightPos));

    return light * max(0.0, dotNL);
}

void main(){
    vec3 normal = normalize(cross(dFdx(vPos), dFdy(vPos)));

    vec3 hemiColor = vec3(0.0);
    hemiColor += calcIrradiance_hemi(normal, hemiLightPos_1, hemiLight_g, hemiLight_s_1) * 0.38;
    hemiColor += calcIrradiance_hemi(normal, hemiLightPos_2, hemiLight_g, hemiLight_s_2) * 0.26;
    hemiColor += calcIrradiance_hemi(normal, hemiLightPos_3, hemiLight_g, hemiLight_s_3) * 0.36;
    
    vec3 dirColor = vec3(0.0);
    dirColor += calcIrradiance_dir(normal, dirLightPos, dirLight);
    dirColor += calcIrradiance_dir(normal, dirLightPos_2, dirLight_2);


    vec3 color = objColor * hemiColor;
    color += dirColor;


    gl_FragColor = vec4(color, 1.0);
}