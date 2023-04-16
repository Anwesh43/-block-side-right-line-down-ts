import React from "react";
import withContext from "./withContext";
import { useStyle } from "./hooks";

interface BSRLDProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : () => void 
}
const BlockSideRightLineDown : React.FC<BSRLDProps> = (props : BSRLDProps) => {
    const {lineStyle, barStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            <div style = {lineStyle()}>

            </div>
            <div style = {barStyle()} onClick = {() => {
                props.onClick()
            }}>

            </div>

        </React.Fragment>
    )   
}

export default withContext(BlockSideRightLineDown)