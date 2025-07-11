import { useContext, useState } from "react"
import { StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import SvgImageWrapper from "../svgImageWrapper/SVGImageWrapper"
import { hidePasswordIcon, showPasswordicon } from "../../../assets/svgImages/SvgImages"
import { ThemeContext } from "../../molecules/customTheme/CustomTheme";

interface CustomTextInputProps {
    title: string,
    borderColors: string,
    onPressEye?: () => void,
    hidePassword: boolean,
    showEyeIcon?: boolean;
    style?: StyleProp<any>


}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    showEyeIcon, hidePassword, onPressEye, borderColors, title, style, ...props

}) => {
    const [isFocused, setIsFocused] = useState(false)
    const { theme } = useContext(ThemeContext);


    return (
    
        <View style={[styles.container, {borderColor: isFocused ? theme.colors.primary : theme.colors.border},
        ]}>


            <TextInput
                style={[{ flex: 1 }, style]}
                color={theme.colors.text}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                secureTextEntry={props.secureTextEntry}
                autoCorrect={false}
                autoCapitalize="none"
                {...props}
            />
            {showEyeIcon && (
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={onPressEye}
                >
                    {!hidePassword ? (
                        <SvgImageWrapper
                            xml={showPasswordicon}
                            height={20}
                            width={20}
                            color={theme.colors.text}
                        />
                    ) : (
                        <SvgImageWrapper
                            xml={hidePasswordIcon}
                            height={20}
                            width={20}
                            color={theme.colors.text}
                        />
                    )}
                </TouchableOpacity>
            )}

        </View>
    )
}

const styles = StyleSheet.create({


    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        width: '100%',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        padding: 10,
        marginTop: 10

    },

    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,

    },


})

export default CustomTextInput