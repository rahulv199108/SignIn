import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import CustomTextInput from '../../component/atoms/customTextInput/CustomTextInput';
import CustomText from '../../component/atoms/customText/CustomText';
import { useContext, useEffect, useState } from 'react';
import SvgImageWrapper from '../../component/atoms/svgImageWrapper/SVGImageWrapper';
import { appleIcon, facebookIcon, googleIcon, instaIcon } from '../../assets/svgImages/SvgImages';
import CustomBotton from '../../component/atoms/customBotton/CustomBotton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../component/molecules/customTheme/CustomTheme';

const SignUp = () => {
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [textPassError, setTextPassError] = useState('');
  const [textEmailError, setTextEmailError] = useState('');
  const [textNameError, setTextNameError] = useState('');
  const [textPhoneError, setTextPhoneError] = useState('');
  const [isdisable, setIsDisable] = useState(false);

  const navigation = useNavigation();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (email || password || name || phoneNumber) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [email, password, name, phoneNumber]);

  const HandleLogin = async () => {
    let valid = true;

    if (!name) {
      setTextNameError('Name field is blank');
      valid = false;
    } else {
      setTextNameError('');
    }

    if (!email) {
      setTextEmailError('Email field is blank');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setTextEmailError('Please enter a valid Email');
      valid = false;
    } else {
      setTextEmailError('');
    }

    if (!phoneNumber) {
      setTextPhoneError('Phone number field is blank');
      valid = false;
    } else if (phoneNumber.length !== 10) {
      setTextPhoneError('Phone number must contain 10 digits');
      valid = false;
    } else {
      setTextPhoneError('');
    }

    if (!password) {
      setTextPassError('Password field is blank');
      valid = false;
    } else if (password.length < 6) {
      setTextPassError('Password must be at least 6 characters');
      valid = false;
    } else {
      setTextPassError('');
    }

    setIsDisable(!valid);
    if (!valid) return;

    const userData = { name, email, phoneNumber, password };

    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      Alert.alert('Congratulations!', 'Sign-up successful!');
      navigation.navigate('Sign In');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.subContainer}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <CustomText
          title="Create New"
          fontsize={40}
          fontweight={900}
          Color={theme.colors.text}
          style={{ marginTop: 10 }}
        />
        <CustomText
          title="Account"
          fontsize={40}
          fontweight={900}
          Color={theme.colors.text}
          style={{ marginTop: 10 }}
        />

        <View style={styles.inputGroup}>
          <CustomText title="Name" fontsize={18} fontweight={600} Color={theme.colors.text} />
          <CustomTextInput
            placeholder="Enter your Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="grey"
          />
          <CustomText title={textNameError} Color="red" />
        </View>

        <View style={styles.inputGroup}>
          <CustomText title="Email Address" fontsize={18} fontweight={600} Color={theme.colors.text} />
          <CustomTextInput
            placeholder="Enter your Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="grey"
          />
          <CustomText title={textEmailError} Color="red" />
        </View>

        <View style={styles.inputGroup}>
          <CustomText title="Phone Number" fontsize={18} fontweight={600} Color={theme.colors.text} />
          <CustomTextInput
            placeholder="Enter your Phone Number"
            value={phoneNumber}
            onChangeText={(text) => {
              const numericText = text.replace(/[^0-9]/g, '');
              if (numericText.length <= 10) {
                setPhoneNumber(numericText);
              }
            }}
            keyboardType="numeric"
            placeholderTextColor="grey"
          />
          <CustomText title={textPhoneError} Color="red" />
        </View>

        <View style={styles.inputGroup}>
          <CustomText title="Password" fontsize={18} fontweight={600} Color={theme.colors.text} />
          <CustomTextInput
            placeholder="Enter your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hidePassword}
            onPressEye={() => setHidePassword((prev) => !prev)}
            placeholderTextColor="grey"
            hidePassword={hidePassword}
            showEyeIcon={true}
          />
          <CustomText title={textPassError} Color="red" />
        </View>

        <View style={styles.line}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
          <CustomText
            title="  OR Sign Up With  "
            fontsize={14}
            fontweight={500}
            Color="grey"
          />
          <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
        </View>

        <View style={styles.iconView}>
          <TouchableOpacity>
            <SvgImageWrapper xml={googleIcon} height={20} width={20} color="#4285F4" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgImageWrapper xml={appleIcon} height={20} width={20} color={theme.colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgImageWrapper xml={facebookIcon} height={20} width={20} color="#1877F2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <SvgImageWrapper xml={instaIcon} height={20} width={20} color="#DD2A7B" />
          </TouchableOpacity>
        </View>

        <View style={styles.botton}>
          <CustomBotton
            title="Sign Up"
            bgColor={(email || name || phoneNumber || password.length > 0) ? theme.colors.primary : 'grey'}
            OnPress={HandleLogin}
            Disabled={isdisable}
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '600',
              paddingHorizontal: '30%',
              paddingVertical: 10,
            }}
          />
        </View>

        <View style={styles.account}>
          <CustomText title="Do you have an account" Color={theme.colors.text} style={{ marginTop: 10 }} />
          <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
            <CustomText title="Sign In" Color={theme.colors.primary} style={{ marginTop: 10 }} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  inputGroup: {
    marginTop: 10,
  },
  iconView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    gap: 10,
  },
  botton: {
    marginTop: 10,
  },
  line: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  account: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 5,
  },
});

export default SignUp;
