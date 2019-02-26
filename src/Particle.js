import React from 'react'
import {Engine, Scene} from 'react-babylonjs'
import {Animation, ArcRotateCamera, Color4, Mesh, ParticleSystem, PointLight, Texture, Vector3, GUI} from 'babylonjs';

function onSceneMount(e) {
    const {canvas, scene} = e


    var emitPower = 5
    var particleSystem = new ParticleSystem("particles", 3000, scene);


    //UI Slider
    var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    advancedTexture.layer.layerMask = 2;

    var panel3 = new GUI.StackPanel();
    panel3.width = "220px";
    panel3.fontSize = "14px";
    panel3.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    panel3.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    advancedTexture.addControl(panel3);

    var header = new GUI.TextBlock();
    header.text = "Emit Power";
    header.height = "40px";
    header.color = "white";
    header.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    header.paddingTop = "10px";
    panel3.addControl(header);

    var slider = new GUI.Slider();
    slider.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    slider.minimum = 0;
    slider.maximum = 50;
    slider.color = "green";
    slider.value = emitPower;
    slider.height = "20px";
    slider.width = "200px";

    slider.onValueChangedObservable.add(function(value){
        console.log(value)
        particleSystem.maxEmitPower  = value
    })
    panel3.addControl(slider);



    // Setup environment
    var light0 = new PointLight("Omni", new Vector3(0, 2, 8), scene);
    var camera = new ArcRotateCamera("ArcRotateCamera", 1, 0.8, 20, new Vector3(0, 0, 0), scene);
    camera.attachControl(canvas, true);

    // Fountain object
    var fountain = Mesh.CreateSphere("foutain", 10, 0.5, scene);

    // Create a particle system

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
    particleSystem.maxSize = 2.0;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.5;
    particleSystem.maxLifeTime = 4.5;

    // Emission rateo
    particleSystem.emitRate = 2000;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new Vector3(-9, 10, 3);
    particleSystem.direction2 = new Vector3(9, 10, -3);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = 2 * Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = emitPower;
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
        value: 4 * Math.PI
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
                <div className="col-xs-12 col-md-6" style={{'overflowX': 'hidden'}}>
                    <Engine antialias={true} adaptToDeviceRatio={true} canvasId="sample-canvas">
                        <Scene onSceneMount={onSceneMount}/>
                    </Engine>
                </div>

            </div>
        </div>
    )
}

export default NonDeclarative