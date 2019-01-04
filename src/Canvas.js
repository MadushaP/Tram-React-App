import React, { Component } from 'react'
import { Scene, ArcRotateCamera, EnvironmentHelper, IcoSphere, Engine, StandardMaterial, DirectionalLight, ShadowGenerator, TransformNode } from 'react-babylonjs'
import { Vector3, Axis, Color3 } from 'babylonjs';
import SingleAxisRotateMeshBehavior from './SingleAxisRotateMeshBehavior'

class Canvas extends Component {
    render() {
        return (
            <Engine>
                <Scene >
                    <ArcRotateCamera name="camera1"
                        alpha={Math.PI / -2} beta={Math.PI / 4}
                        radius={10} target={Vector3.Zero()} minZ={0.001} />
                    <DirectionalLight name="dl" direction={new Vector3(0, -2.5, 0.5)} position={new Vector3(0, 2, 0.5)}>
                        <ShadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32}
                            shadowCasters={["counterClockwise", "clockwise", "BoomBox"]}
                        />
                    </DirectionalLight>
                    <IcoSphere name="counterClockwise" radius={1.5} flat={true} subdivisions={1}>
                        <StandardMaterial diffuseColor={Color3.Red()} specularColor={Color3.White()} />
                        <SingleAxisRotateMeshBehavior rpm={5} axis={Axis.Y} />
                    </IcoSphere>
                    <EnvironmentHelper enableGroundShadow={true} groundYBias={1} mainColor={Color3.FromHexString("#74b9ff")} />
                </Scene>
            </Engine>
        )
    }

}

export default Canvas
