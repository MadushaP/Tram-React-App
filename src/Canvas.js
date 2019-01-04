import React, { Component } from 'react'
import { Scene, ArcRotateCamera, EnvironmentHelper, IcoSphere, Engine, StandardMaterial, PBRMaterial, DirectionalLight, ShadowGenerator, GUI3DManager, PlanePanel, HolographicButton, ColorPicker, StackPanel, Plane, AdvancedDynamicTexture } from 'react-babylonjs'
import { Vector3, Axis, Color3 } from 'babylonjs';
import SingleAxisRotateMeshBehavior from './SingleAxisRotateMeshBehavior'

class Canvas extends Component {

    state = {
        switch: false
    }

    selectReflective(coordinates) {
        this.setState({ switch: !this.state.switch })
    }


    render() {
        return (
            <Engine>
                <Scene onScenePointerDown="">
                    <ArcRotateCamera name="camera1"
                        alpha={Math.PI / -2} beta={Math.PI / 3}
                        radius={10} target={Vector3.Zero()} minZ={0.001} />
                    <DirectionalLight name="dl" direction={new Vector3(-1, -1.5, 0.5)} position={new Vector3(2, 3, 1.5)}>
                        <ShadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={32}
                            shadowCasters={["counterClockwise", "clockwise", "BoomBox"]} />
                    </DirectionalLight>
                    <IcoSphere name="counterClockwise" radius={1.5} flat={true} subdivisions={1}>
                        <StandardMaterial diffuseColor={this.state.switch ? Color3.Red() : Color3.Yellow()} specularColor={Color3.White()} />
                        <SingleAxisRotateMeshBehavior rpm={5} axis={Axis.Y} />
                    </IcoSphere>
                    <GUI3DManager name="gui3d">
                        <PlanePanel name="panel" margin={-0.1}>
                            <HolographicButton
                                key={`switch`}
                                name={`switch`}
                                text={`Switch colour`}
                                onPointerClickObservable={this.selectReflective.bind(this)} />

                        </PlanePanel>
                    </GUI3DManager>
                    <Plane position={new Vector3(0, 2, 0)}>
                        <AdvancedDynamicTexture createForParentMesh={true}>
                            <StackPanel>
                                <ColorPicker height="1500px" width="1500px" scaleY="1.0" scaleX="1.0"></ColorPicker>
                            </StackPanel>
                        </AdvancedDynamicTexture>
                    </Plane>

                    <EnvironmentHelper enableGroundShadow={true} groundYBias={1} mainColor={Color3.FromHexString("#74b9ff")} />
                </Scene>
            </Engine>
        )
    }

}

export default Canvas
