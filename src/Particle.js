import React from 'react'
import {Engine, Scene} from 'react-babylonjs'
import {
    Animation,
    ArcRotateCamera,
    Color3,
    Color4,
    Mesh,
    ParticleSystem,
    PointLight,
    StandardMaterial,
    Texture,
    Vector3
} from 'babylonjs';

function onSceneMount(e) {
        const { canvas, scene } = e

        // Setup environment
        var light0 = new PointLight("Omni", new Vector3(0, 2, 8), scene);
        var camera = new ArcRotateCamera("ArcRotateCamera", 1, 0.8, 20, new Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);

        // Fountain object
        var fountain = Mesh.CreateSphere("foutain", 10, 0.5, scene);

        // Ground
        var ground = Mesh.CreatePlane("ground", 50.0, scene);
        ground.position = new Vector3(0, -10, 0);
        ground.rotation = new Vector3(Math.PI / 2, 0, 0);

        ground.material = new StandardMaterial("groundMat", scene);
        ground.material.backFaceCulling = false;
        ground.material.diffuseColor = new Color3(0.5, 0.5, 1);

        // Create a particle system
        var particleSystem = new ParticleSystem("particles", 2000, scene);

        //Texture of each particle
        particleSystem.particleTexture = new Texture(require('./static/media/bitesize.png'), scene);

        // Where the particles come from
        particleSystem.emitter = fountain; // the starting object, the emitter
        particleSystem.minEmitBox = new Vector3(-1, 0, 0); // Starting all from
        particleSystem.maxEmitBox = new Vector3(1, 0, 0); // To...

        // Colors of all particles
        particleSystem.color1 = new Color4(1, 1, 1.0, 1.0);
        particleSystem.color2 = new Color4(0, 1, 0.8, 1.0);
        particleSystem.colorDead = new Color4(1, 0, 0, 0.8);

        // Size of each particle (random between...
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 1.0;

        // Life time of each particle (random between...
        particleSystem.minLifeTime = 0.5;
        particleSystem.maxLifeTime = 5.5;

        // Emission rate
        particleSystem.emitRate = 2000;

        // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
        particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

        // Set the gravity of all particles
        particleSystem.gravity = new Vector3(0, -9.81, 0);

        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new Vector3(-9, 8, 3);
        particleSystem.direction2 = new Vector3(9, 8, -3);

        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 6;
        particleSystem.updateSpeed = 0.005;

        // Start the particle system
        particleSystem.start();

        // Fountain's animation
        var keys = [];
        var animation = new Animation("animation", "rotation.x", 60, Animation.ANIMATIONTYPE_FLOAT,
            Animation.ANIMATIONLOOPMODE_CYCLE);
        // At the animation key 0, the value of scaling is "1"
        keys.push({
            frame: 0,
            value: 0
        });

        // At the animation key 50, the value of scaling is "0.2"
        keys.push({
            frame: 50,
            value: Math.PI
        });

        // At the animation key 100, the value of scaling is "1"
        keys.push({
            frame: 100,
            value: 0
        });

        // Launch animation
        animation.setKeys(keys);
        fountain.animations.push(animation);
        scene.beginAnimation(fountain, 0, 100, true);

}

function NonDeclarative() {
    return (
        <div>
            <div className="row">
                <div className="col-xs-12 col-md-6">
                    <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
                        <Scene  onSceneMount={onSceneMount} />
                    </Engine>
                </div>

            </div>
        </div>
    )
}

export default NonDeclarative