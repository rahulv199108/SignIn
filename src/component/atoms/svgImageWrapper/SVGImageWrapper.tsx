import React from "react";
import { SvgXml } from "react-native-svg";


interface SvgImageWrapperProps {
    height: number | string;  
    width: number | string;   
    xml: string;              
    color: string;           
}

const SvgImageWrapper: React.FC<SvgImageWrapperProps> = ({ height, width, xml, color }) => {
    return (
        <SvgXml 
            xml={xml} 
            width={width}
            height={height}
            fill={color}
        /> 
    );
}

export default SvgImageWrapper;