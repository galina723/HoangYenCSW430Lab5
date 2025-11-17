import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthModel } from '../models/authModel';
import { useForm, Controller, Path } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { DataServices } from '../services/dataServices';
import { colorSystem } from '../helpers/colorSystem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const form: Path<AuthModel>[] = ['phone', 'password'];

const LoginScreen = () => {
  const navigation: any = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthModel>({
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const [fail, setFail] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const res = await AsyncStorage.getItem('token');

    if (res) {
      navigation.navigate('HomeScreen');
    }
  };

  const onSubmit = async (data: AuthModel) => {
    console.log(data);
    const res = await DataServices.login(data);

    if (res !== 'fail') {
      navigation.navigate('HomeScreen');
    } else {
      setFail(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 34,
          fontWeight: 'bold',
          color: colorSystem.primary,
          textAlign: 'center',
        }}
      >
        Login
      </Text>
      <View style={{ gap: 16 }}>
        <FlatList
          scrollEnabled={false}
          persistentScrollbar={false}
          data={form}
          contentContainerStyle={{ gap: 16 }}
          renderItem={({ item }) => (
            <View>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder={String(item)}
                    onBlur={onBlur}
                    onChangeText={text => onChange(text)}
                    value={
                      value === undefined || value === null
                        ? ''
                        : value.toString()
                    }
                    secureTextEntry={item === 'password'}
                    style={{ backgroundColor: '#f2f2f2' }}
                    mode="outlined"
                  />
                )}
                name={item}
              />
              {(errors as any)[item] && <Text>This is required.</Text>}
            </View>
          )}
          keyExtractor={item => String(item)}
        />

        {fail && <Text>Wrong phone or password</Text>}

        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          style={{ backgroundColor: colorSystem.primary }}
        >
          Submit
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 32,
    marginTop: Dimensions.get('window').height * 0.2,
  },
});

export default LoginScreen;
