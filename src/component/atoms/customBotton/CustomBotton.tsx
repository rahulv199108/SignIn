import { StyleProp, StyleSheet, Text, TouchableOpacity } from "react-native"


interface customBottonProps {
    title: string,
    bgColor: string,
    OnPress: () => void
    Disabled: boolean
    style: StyleProp<any>
    BdWidth: number
    BorderColor: string


}

const CustomBotton: React.FC<customBottonProps> = ({ BorderColor, bgColor, BdWidth, title, OnPress, Disabled, style }) => {
    return (

        <TouchableOpacity
            onPress={OnPress}
            disabled={Disabled}
            style={[styles.botton, { backgroundColor: bgColor, borderWidth: BdWidth, borderColor: BorderColor }]}>

            <Text style={style}>{title}</Text>

        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    botton: {

        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 20


    }
})

export default CustomBotton