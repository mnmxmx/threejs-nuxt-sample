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

        this.transitionTarget = new THREE.Vector4(0, 0, 0, 0);

        this.geometry =  new THREE.BufferGeometry();
        this.setPositions();
        this.currentNum = 0;
        this.uniforms = {
            uProgress: {
                value: new THREE.Vector4(0, 0, 0, 0)
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
            this.transitionTarget.set(1, 0, 0, 0);
            break;

            case "about":
            this.transitionTarget.set(0, 1, 0, 0);
            break;

            case "contact":
            this.transitionTarget.set(0, 0, 1, 0);
            break;

            default: 
            this.transitionTarget.set(0, 0, 0, 1);
            break;

        }

        console.log(this.transitionTarget);
    }

    setPositions(){
        const positions = [];
        const vertices1 = [];
        const vertices2 = [];
        const vertices3 = [];
        const vertices4 = [];



        for(let i = 0; i <= this.segments; i++){
            const v = i / this.segments;
            for(let j = 0; j <= this.segments; j++){
                const u = j / this.segments;
                const shape1 = calcShape.sphere(u, v);
                const shape2 = calcShape.twistTorus(u, v);
                const shape3 = calcShape.torus(u, v);
                const shape4 = calcShape.ribbon(u, v);

                vertices1.push(shape1.x, shape1.y, shape1.z);
                vertices2.push(shape2.x, shape2.y, shape2.z);
                vertices3.push(shape3.x, shape3.y, shape3.z);
                vertices4.push(shape4.x, shape4.y, shape4.z);

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

        this.setAttribute("aShape1", vertices1);
        this.setAttribute("aShape2", vertices2);
        this.setAttribute("aShape3", vertices3);
        this.setAttribute("aShape4", vertices4);

        this.setAttribute("position", positions);

        this.geometry.setIndex( indices );
    }

    setAttribute(name, vertices){
        var array = new Float32Array( vertices );
        this.geometry.setAttribute( name, new THREE.BufferAttribute( array, 3 ) );
    }

    update(){
        this.mesh.rotation.y += Common.time.delta;
        const easing = Math.min(1.0, 3.5 * Common.time.delta)
        this.uniforms.uProgress.value.lerp(this.transitionTarget, easing);
    }
}