import * as THREE from 'three';
import Project from '../Project.js';
//import World from './World.js';


// f = m * a 힘을 질량 곱하기 가속도
// a = f / m 가속도는 힘에서 질량을 나눈다. m 이 만약 1로 정의하면
// a = f 이다.
// 이프로젝트는 중력 끌어당김 프로젝트이다. 보이드 아님

export default class Boid
{
    constructor()
    {
        this.project = new Project();
        this.scene = this.project.scene;
        this.birds;

        this.position = new THREE.Vector3();
        this.velocity = new THREE.Vector3(0,0,0);
        this.acceleration = new THREE.Vector3(0,0,0);

        
        this.f = new THREE.Vector3();

        this.G = 1;
        this.mass = 2;

        this.width = window.innerWidth;
        this.height =window.innerHeight;
        this.depth = 1000;

        this.setMesh();
    }

    setMesh()
    {
        this.birdsGeometry = new THREE.BoxGeometry(1,1,1);
        this.birdsMaterial = new THREE.MeshStandardMaterial({color:'white'});
        this.birds = new THREE.Mesh(this.birdsGeometry, this.birdsMaterial);
        this.scene.add(this.birds);
      
    }

    update()
    {   
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.birds.position.copy(this.position);
        this.acceleration.set(0,0,0);
       
    }

    applyForce(force)
    {
        
        this.f.copy(force);
        this.f.divideScalar(this.mass);
        //console.log(this.f);
        this.acceleration.add(this.f);
    }

    edges()
    {   
        //console.log(this.birds.position.y);
        if(this.birds.position.y < -4)
        {
            this.velocity.y *= -0.9;
            this.birds.position.y = -4;
           
        }
    }

    calculateAttraction(p)
    {
        const force = new THREE.Vector3();
        force.subVectors(this.position,p.position);
        force.normalize();
        const distance = this.position.distanceTo(p.position);
        const strength = (this.G * this.mass * p.mass) / (distance * distance);
        force.multiplyScalar(strength);
        console.log(force);
        return force;
        
    }
}