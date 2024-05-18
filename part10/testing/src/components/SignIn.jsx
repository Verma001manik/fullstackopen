import React from 'react';
import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
const initialValues = {
  username: '',
  password: '',
};
const validationSchema = yup.object().shape({
  username: yup
      .string()
      .required('Username is required'),
      
  password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must contain at least 8 characters'),
})

const SignupForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
       {formik.touched.username && formik.errors.username && (
  <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
 )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
      />
       {formik.touched.password && formik.errors.password && (
  <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
 )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <SignupForm onSubmit={onSubmit} />
      {/* <Text style={styles.signinText}>The sign-in view</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    width: 300,
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    width: 300,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007bff',
    borderRadius: 5,
    borderRadius: 11
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  signinText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default SignIn;
