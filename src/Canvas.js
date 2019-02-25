import React, { Component } from 'react'
import { Scene, ArcRotateCamera, EnvironmentHelper, IcoSphere, Engine, StandardMaterial, PBRMaterial, DirectionalLight, ShadowGenerator, GUI3DManager, PlanePanel, HolographicButton, ColorPicker, StackPanel, Plane, AdvancedDynamicTexture } from 'react-babylonjs'
import { Vector3, Axis, Color3 } from 'babylonjs';
import SingleAxisRotateMeshBehavior from './SingleAxisRotateMeshBehavior'

class Canvas extends Component {

    state = {
        switch: false,
        shapeColor: {
            r: 199,
            g: 0,
            b: 57
        }
    }

    changeColor(selectedColor) {

        this.setState({
            shapeColor: {
              r: selectedColor.r * 255 ,
              g: selectedColor.g  * 255  ,
              b: selectedColor.b  * 255

            }})

    }


    render() {
        return (
            <Engine>
                <Scene onScenePointerDown="">
                    <ArcRotateCamera name="camera1"
                        alpha={Math.PI / -2} beta={Math.PI / 3}
                        radius={10} target={Vector3.Zero()} minZ={0.001} />
                    <DirectionalLight name="dl" direction={new Vector3(-1, -1.5, 0.5)} position={new Vector3(2, 3, 1.5)}>
                        <ShadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={16}
                            shadowCasters={["counterClockwise", "clockwise", "BoomBox"]} />
                    </DirectionalLight>
                    <IcoSphere name="counterClockwise" radius={1.5} flat={true} subdivisions={1}>
                        <StandardMaterial diffuseColor={Color3.FromInts(this.state.shapeColor.r, this.state.shapeColor.g,this.state.shapeColor.b)} specularColor={Color3.White()} />
                        <SingleAxisRotateMeshBehavior rpm={5} axis={Axis.Y} />
                    </IcoSphere>
                    <GUI3DManager name="gui3d">
                        <PlanePanel name="panel" margin={-0.1}>
                            <HolographicButton
                                key={`switch`}
                                name={`switch`}
                                text={`Switch colour`}/>
                        </PlanePanel>
                    </GUI3DManager>
                    <Plane position={new Vector3(0, 2, 0)}>
                        <AdvancedDynamicTexture createForParentMesh={true}>
                            <StackPanel>
                                <ColorPicker height="1400px" width="1400px"  onValueChangedObservable={this.changeColor.bind(this)}></ColorPicker>
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
