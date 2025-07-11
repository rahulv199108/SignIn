import { StyleProp, StyleSheet, Text, View } from "react-native"

interface customTextProps {
title : string,
fontweight : number,
fontsize : number,
fontfamily : string,
Color :string,
style : StyleProp<any>


}

const CustomText : React.FC<customTextProps> = ({fontweight,fontsize,title, fontfamily ,Color ,style}) => {
    return(
        <View>
            <Text style={[{fontSize:fontsize, fontWeight:fontweight ,fontFamily: fontfamily ,color : Color },style]}>{title}</Text>
        </View>

    )

}

    

export default CustomText;
