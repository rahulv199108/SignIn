import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import CustomTextInput from '../../component/atoms/customTextInput/CustomTextInput';
import CustomText from '../../component/atoms/customText/CustomText';
import SvgImageWrapper from '../../component/atoms/svgImageWrapper/SVGImageWrapper';
import { appleIcon, facebookIcon, googleIcon, instaIcon } from '../../assets/svgImages/SvgImages';
import CustomBotton from '../../component/atoms/customBotton/CustomBotton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../component/molecules/customTheme/CustomTheme';

const SignIn = () => {



  const { theme } = useContext(ThemeContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [textPassError, setTextPassError] = useState('');
  const [textEmailError, setTextEmailError] = useState('');
  const [isdisable, setIsDisable] = useState(false);

  const navigation = useNavigation();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if ((email && email.length > 0) || (password && password.length > 0)) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [email, password]);

  const HandleLogin = async () => {
    let isValid = true;

    if (email.length <= 0) {
      setTextEmailError('Email field is blank');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setTextEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setTextEmailError('');
    }

    if (password.length <= 0) {
      setTextPassError('Password field is blank');
      isValid = false;
    } else if (password.length < 6) {
      setTextPassError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setTextPassError('');
    }

    if (!isValid) {
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem('user');
      console.log('Stored user:', storedUser);

      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('Parsed user:', user);

        if (user.email === email && user.password === password) {
          Alert.alert('Login Successful', `Welcome, ${user.name}`);
          navigation.navigate('Questionaire');
        } else {
          Alert.alert('Sign In Failed', 'Invalid credentials');
        }
      } else {
        Alert.alert('Sign In Failed', 'No user found. Please sign up.');
      }
    } catch (error) {
      console.log('Error during sign-in:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };




  console.log('Email:', email);
  console.log('Password:', password);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        style={styles.subContainer}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <CustomText
          title="Hello,"
          fontsize={40}
          fontweight={900}
          Color={theme.colors.text}
          style={{ marginTop: 10 }}
        />
        <CustomText
          title="Welcome Back!"
          fontsize={40}
          fontweight={900}
          Color={theme.colors.text}
          style={{ marginTop: 10 }}
        />

        <View style={styles.emailView}>
          <CustomText
            title="Email Address"
            fontsize={18}
            fontweight={600}
            Color={theme.colors.text}
            style={{ marginTop: 10 }}
          />

          <CustomTextInput
            placeholder="Enter your Email"
            borderColors={theme.colors.primary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="grey"
          />
          <CustomText title={textEmailError} Color="red" />
        </View>

        <CustomText
          title="Password"
          fontsize={18}
          fontweight={600}
          Color={theme.colors.text}
          style={{ marginTop: 10 }}
        />

        <CustomTextInput
          placeholder="Enter your Password"
          borderColors={theme.colors.primary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
          onPressEye={() => setHidePassword((prev) => !prev)}
          placeholderTextColor="grey"
          hidePassword={hidePassword}
          showEyeIcon={true}
        />
        <CustomText title={textPassError} Color="red" />

        <View style={{ flexWrap: 'wrap-reverse' }}>
          <TouchableOpacity>
            <CustomText
              title="Forgot Password?"
              Color={theme.colors.text}
              style={{ marginTop: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.line}>
          <View style={{ flex: 1, height: 1, backgroundColor: 'grey' }} />
          <CustomText
            title="  OR Sign In With  "
            style={{ fontSize: 14, fontWeight: '500', color: 'grey' }}
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
            title="Sign In"
            bgColor={email || password.length > 0 ? theme.colors.primary : 'grey'}
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
          <CustomText
            title="Don't have an account"
            Color={theme.colors.text}
            style={{ marginTop: 10 }}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
            <CustomText
              title="Create Account?"
              Color={theme.colors.primary}
              style={{ marginTop: 10 }}
            />
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
  iconView: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
    gap: 10,
  },
  botton: {
    marginTop: '30%',
  },
  line: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  account: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 5,
  },
  emailView: {
    marginTop: 20,
  },
});

export default SignIn;
