import { Ionicons } from '@expo/vector-icons'; // For icons (email, Facebook, Google)
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient'; // For gradient fade
import React from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Signup = () => {
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [step, setStep] = React.useState<'phone' | 'password'>('phone');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Food Cover Image Section */}
        <View style={styles.imageHeaderContainer}>
          <Image
            source={require('../../assets/images/sam-moqadam-Oxpa8sZwGNU-unsplash 1.png')}
            style={styles.coverImage}
            resizeMode="cover"
          />
          {/* Smooth Fade Transition */}
          <LinearGradient
            colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)', '#ffffff']}
            style={styles.gradientOverlay}
          />
        </View>

        {/* Bottom Login Form Card Container */}
        <View style={styles.formContainer}>

          {/* Brand Logo & Subtitle */}
          <View style={styles.brandContainer}>
            <Text style={styles.brandLogo}>Foodie</Text>
            <Text style={styles.brandSubtitle}>Order food online</Text>
          </View>

          {/* Form Title */}
          <Text style={styles.loginTitleText}>Login or Signup</Text>

          {/* Step-by-Step Input Container (Mobile or Password) */}
          {step === 'phone' ? (
            <View style={styles.inputCard}>
              {/* Country Flag & Code */}
              <View style={styles.countryCodeContainer}>
                <Text style={styles.flagText}>🇮🇳</Text>
                <Text style={styles.codeText}>+91</Text>
                <Ionicons name="chevron-down" size={12} color="#757575" style={{ marginLeft: 4 }} />
              </View>

              {/* Divider */}
              <View style={styles.inputDivider} />

              {/* Text Input */}
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
                placeholder="Enter Phone Number"
                placeholderTextColor="#9E9E9E"
              />
            </View>
          ) : (
            <View style={styles.inputCard}>
              <TextInput
                style={styles.phoneInput}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                placeholder="Enter Password"
                placeholderTextColor="#9E9E9E"
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} activeOpacity={0.7}>
                <Ionicons
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color="#757575"
                />
              </TouchableOpacity>
            </View>
          )}

          {/* Continue / Login Button */}
          <TouchableOpacity
            style={styles.otpButton}
            onPress={() => {
              if (step === 'phone') {
                if (phoneNumber.length === 10) {
                  setStep('password');
                } else {
                  alert('Please enter a valid 10-digit mobile number');
                }
              } else {
                navigation.navigate('Main');
              }
            }}
            activeOpacity={0.9}
          >
            <Text style={styles.otpButtonText}>
              {step === 'phone' ? 'Continue' : 'Login'}
            </Text>
          </TouchableOpacity>

          {/* OR Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Continue with Email Button */}
          <TouchableOpacity style={styles.emailButton} activeOpacity={0.8}>
            <Ionicons name="mail" size={20} color="#616161" style={styles.emailIcon} />
            <Text style={styles.emailButtonText}>Continue with Email</Text>
          </TouchableOpacity>

          {/* Social Login Row */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Ionicons name="logo-google" size={22} color="#EA4335" style={{ marginRight: 8 }} />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <Ionicons name="logo-facebook" size={22} color="#1877F2" style={{ marginRight: 8 }} />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Policy Footer */}
          <Text style={styles.footerText}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text>,{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>,{' '}
            <Text style={styles.linkText}>Content Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  imageHeaderContainer: {
    width: width,
    height: height * 0.40,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '20%',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
    backgroundColor: '#ffffff',
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  brandLogo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#CB202D',
    letterSpacing: -1.5,
  },
  brandSubtitle: {
    fontSize: 11,
    color: '#757575',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: '600',
    marginTop: 2,
  },
  loginTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    height: 56,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagText: {
    fontSize: 18,
    marginRight: 6,
  },
  codeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D2D2D',
  },
  inputDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 12,
  },
  phoneInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    color: '#2D2D2D',
    height: '100%',
    padding: 0,
  },
  otpButton: {
    backgroundColor: '#CB202D',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#CB202D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  otpButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  dividerText: {
    color: '#9E9E9E',
    marginHorizontal: 12,
    fontSize: 13,
    fontWeight: '600',
  },
  emailButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emailIcon: {
    marginRight: 10,
  },
  emailButtonText: {
    color: '#424242',
    fontSize: 15,
    fontWeight: '600',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '48%',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialText: {
    color: '#424242',
    fontSize: 14,
    fontWeight: '600',
  },
  footerText: {
    color: '#9E9E9E',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  linkText: {
    color: '#757575',
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});

export default Signup;