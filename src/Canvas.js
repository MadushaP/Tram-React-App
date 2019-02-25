import React, {Component} from 'react'
import {
    Scene,
    ArcRotateCamera,
    EnvironmentHelper,
    IcoSphere,
    Engine,
    StandardMaterial,
    DirectionalLight,
    ShadowGenerator,
    GUI3DManager,
    PlanePanel,
    HolographicButton,
    ColorPicker,
    Plane,
    AdvancedDynamicTexture,
} from 'react-babylonjs'

import {Vector3, Axis, Color3} from 'babylonjs';
import SingleAxisRotateMeshBehavior from './SingleAxisRotateMeshBehavior'

class Canvas extends Component {

    state = {
        switch: false,
        shapeColor: {
            r: 199,
            g: 0,
            b: 57
        },
        shapePosition: {
            x: 0,
            y: 0,
            z: 0
        },
        shapeRpm: 5,
    }



    componentDidMount() {
        document.addEventListener("keydown", this.keyboardEventHandler.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyboardEventHandler, false);
    }

    keyboardEventHandler(event) {
        let position;
        switch(event.key) {
            case "w":
                position = Object.assign({}, this.state.shapePosition);
                position.z =   position.z + 0.5;
                this.setState({shapePosition: position})
                break;
            case "s":
                position = Object.assign({}, this.state.shapePosition);
                position.z =   position.z - 0.5;
                this.setState({shapePosition: position})
                break;
            case "a":
                position = Object.assign({}, this.state.shapePosition);
                position.x =   position.x - 0.5;
                this.setState({shapePosition: position})
                break;
            case "d":
                position = Object.assign({}, this.state.shapePosition);
                position.x =   position.x + 0.5;
                this.setState({shapePosition: position})
                break;
            case " ":
                event.preventDefault();
                position = Object.assign({}, this.state.shapePosition);
                position.y =   position.y + 1;
                setTimeout(this.func, 10000);
                position.y =   position.y + 1;

                this.setState({shapePosition: position})
                break;
        }

    }

    leftRPM() {
        this.setState({shapeRpm: this.state.shapeRpm -= 50})
    }

    rightRPM() {
        this.setState({shapeRpm: this.state.shapeRpm += 50})
    }

    changeColor(selectedColor) {
        this.setState({
            shapeColor: {
                r: selectedColor.r * 255,
                g: selectedColor.g * 255,
                b: selectedColor.b * 255
            }
        })

    }


    render() {
        return (
            <Engine>
                <Scene onScenePointerDown="">
                    <ArcRotateCamera name="camera1"
                                     alpha={Math.PI / -2} beta={Math.PI / 3}
                                     radius={10} target={Vector3.Zero()} minZ={0.001}/>
                    <DirectionalLight name="dl" direction={new Vector3(-1, -1.5, 0.5)}
                                      position={new Vector3(2, 3, 1.5)}>
                        <ShadowGenerator mapSize={1024} useBlurExponentialShadowMap={true} blurKernel={16}
                                         shadowCasters={["counterClockwise", "clockwise", "BoomBox"]}/>
                    </DirectionalLight>
                    <IcoSphere animation={new Vector3(1,2,3)} position={new Vector3(this.state.shapePosition.x, this.state.shapePosition.y, this.state.shapePosition.z)} name="counterClockwise" radius={1.0} flat={true}
                               subdivisions={1}>
                        <StandardMaterial
                            diffuseColor={Color3.FromInts(this.state.shapeColor.r, this.state.shapeColor.g, this.state.shapeColor.b)}
                            specularColor={Color3.White()}/>
                        <SingleAxisRotateMeshBehavior rpm={this.state.shapeRpm} axis={Axis.Y}/>
                    </IcoSphere>
                    <GUI3DManager name="gui3d">
                        <PlanePanel name="panel" margin={-1}>
                            <HolographicButton
                                key={`switch`}
                                name={`switch`}
                                text={`Rotate Right `}
                                onPointerClickObservable={this.leftRPM.bind(this)}/>
                            <HolographicButton
                                key={`decreaseRPM`}
                                name={`decreaseRPM`}
                                text={`Rotate Left`}
                                onPointerClickObservable={this.rightRPM.bind(this)}/>
                        </PlanePanel>
                    </GUI3DManager>
                    <Plane position={new Vector3(0, 2, 0)}>
                        <AdvancedDynamicTexture createForParentMesh={true}>
                            <ColorPicker height="1400px" width="1400px"
                                         onValueChangedObservable={this.changeColor.bind(this)}></ColorPicker>
                        </AdvancedDynamicTexture>
                    </Plane>
                    <EnvironmentHelper enableGroundShadow={true} groundYBias={1}
                                       mainColor={Color3.FromHexString("#74b9ff")}/>
                </Scene>
            </Engine>
        )
    }

}

export default Canvas
