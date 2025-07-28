import { Ionicons } from '@expo/vector-icons'; // For icons (email, Facebook, Google)
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background
import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
  
const Signup = () => {
    const navigation = useNavigation();
  return (
     <LinearGradient
      colors={['#CB202D', '#EC0C92']} // Gradient from left (#CB202D) to right (#EC0C92)
      start={{ x: 0, y: 0 }} // Start from left
      end={{ x: 1, y: 0 }} // End at right
      style={styles.container}
    >
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value="+91 9010858965"
          keyboardType="phone-pad"
          editable={false} // For demo purposes, matching the image
        />
      </View>

      {/* Send OTP Button */}
      <TouchableOpacity style={styles.otpButton} onPress={() => navigation.navigate('Main')}>
        <Text style={styles.otpButtonText}>Send OTP</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Continue with Email Button */}
      <TouchableOpacity style={styles.emailButton}>
        <Ionicons name="mail-outline" size={24} color="black" style={styles.icon} />
        <Text style={styles.emailButtonText}>Continue with Email</Text>
      </TouchableOpacity>

      {/* Social Login Buttons */}
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-facebook" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Terms and Policy Footer */}
      <Text style={styles.footerText}>
        By continuing, you agree to our{' '}
        <Text style={styles.linkText}>Terms of Service</Text>,{' '}
        <Text style={styles.linkText}>Privacy Policy</Text>,{' '}
        <Text style={styles.linkText}>Content Policy</Text> 
      </Text>
     </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05, // 5% of screen width
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: height * 0.05, // 5% from top
    right: width * 0.05, // 5% from right
    backgroundColor: '#000000',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    opacity:0.47
  },
  skipText: {
    color: 'white',
    fontSize: 16,
  },
  inputContainer: {
    width: '90%',
    marginBottom: height * 0.02, // 2% of screen height
    marginVertical: height * 0.34,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    fontSize:26,
    color: 'black'
  },
  otpButton: {
    backgroundColor: 'black',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: height * 0.03, // 3% of screen height
  },
  otpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginVertical: height * 0.02, // 2% of screen height
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  dividerText: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 16,
  },
  emailButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '90%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: height * 0.02, // 2% of screen height
  },
  emailButtonText: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: height * 0.03, // 3% of screen height
  },
  socialButton: {
    backgroundColor: 'white',
    width: '48%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    position: 'absolute',
    bottom: height * 0.03, // 3% from bottom
    width: '90%',
  },
  linkText: {
    color: 'white',
    textDecorationLine: 'underline',
  },
  icon: {
    marginRight: 10,
  },
});

export default Signup;