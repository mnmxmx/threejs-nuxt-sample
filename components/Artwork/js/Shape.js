import * as THREE from "three";
import Common from "./Common";
import calcShape from "./calcShape";

import vertexShader from "./glsl/shape.vert";
import fragmentShader from "./glsl/shape.frag";

import EventBus from "~/utils/event-bus";

export default class Shape{
    constructor(){
        this.segments = 80;
        this.init();
    }

    init(){
        EventBus.$on("TRANSITION", this.onTransition.bind(this));

        this.transitionTraget = new THREE.Vector3(1, 0, 0);

        this.geometry =  new THREE.BufferGeometry();
        this.setPositions();
        this.currentNum = 0;
        this.uniforms = {
            uProgress: {
                value: new THREE.Vector3(0, 0, 0)
            },
        };

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            flatShading: true,
            side: THREE.DoubleSide,
            // wireframe: true
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = Math.PI / 4;
        Common.scene.add(this.mesh);
    }

    onTransition(path){
        switch(path){
            case "index": 
            this.transitionTraget.set(1, 0, 0);
            break;

            case "about":
            this.transitionTraget.set(0, 1, 0);
            break;

            case "contact":
            this.transitionTraget.set(0, 0, 1);
            break;
        }
    }

    setPositions(){
        const positions = [];
        const verticesSphere = [];
        const verticesTwistTorus = [];
        const verticesTorus = [];


        for(let i = 0; i <= this.segments; i++){
            const v = i / this.segments;
            for(let j = 0; j <= this.segments; j++){
                const u = j / this.segments;
                const sphere = calcShape.sphere(u, v);
                const tTorus = calcShape.twistTorus(u, v);
                const torus = calcShape.torus(u, v);

                verticesSphere.push(sphere.x, sphere.y, sphere.z);
                verticesTwistTorus.push(tTorus.x, tTorus.y, tTorus.z);
                verticesTorus.push(torus.x, torus.y, torus.z);

                positions.push(0, 0, 0);
            }
        }

        // generate indices
        const indices = [];
        var sliceCount = this.segments + 1;
        for ( let i = 0; i < this.segments; i ++ ) {
            for ( let j = 0; j < this.segments; j ++ ) {

                var a = i * sliceCount + j;
                var b = i * sliceCount + j + 1;
                var c = ( i + 1 ) * sliceCount + j + 1;
                var d = ( i + 1 ) * sliceCount + j;

                // faces one and two
                indices.push( a, b, d );
                indices.push( b, c, d );
            }
        }

        this.setAttribute("aShape1", verticesSphere);
        this.setAttribute("aShape2", verticesTwistTorus);
        this.setAttribute("aShape3", verticesTorus);


        this.setAttribute("position", positions);

        this.geometry.setIndex( indices );
    }

    setAttribute(name, vertices){
        var array = new Float32Array( vertices );
        this.geometry.setAttribute( name, new THREE.BufferAttribute( array, 3 ) );
    }

    update(){
        this.mesh.rotation.y += Common.time.delta;
        this.uniforms.uProgress.value.lerp(this.transitionTraget, 3.5 * Common.time.delta);
    }
}