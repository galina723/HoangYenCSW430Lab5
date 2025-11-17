import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { colorSystem } from '../helpers/colorSystem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Controller, Path, useForm } from 'react-hook-form';
import { DataModel } from '../models/dataModel';
import { DataServices } from '../services/dataServices';

const form: Path<DataModel>[] = ['name', 'price'];

const EditScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DataModel>({
    defaultValues: {
      name: '',
      price: 0,
    },
  });

  const [fail, setFail] = useState(false);

  useEffect(() => {
    if ((route.params as any).id) {
      getService((route.params as any).id);
    }
  }, [(route.params as any).id]);

  const getService = async (id: string) => {
    const res = await DataServices.getServiceById(id);

    if (res !== 'fail') {
      reset({
        name: res.data.name,
        price: res.data.price,
      });
    }
  };

  const onSubmit = async (data: DataModel) => {
    console.log('data', data);
    const res = await DataServices.updateService(
      data,
      (route.params as any).id,
    );
    console.log('edit', res);

    if (res !== 'fail') {
      navigation.navigate('HomeScreen');
    } else {
      setFail(true);
    }
  };

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: colorSystem.primary }}>
        <Appbar.Content color="white" title={'Service'} />
        <Appbar.BackAction
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </Appbar.Header>
      <View style={{ gap: 16, padding: 16 }}>
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
                    style={{ backgroundColor: '#f2f2f2' }}
                    mode="outlined"
                    keyboardType={item === 'price' ? 'number-pad' : 'default'}
                  />
                )}
                name={item}
              />
              {(errors as any)[item] && <Text>This is required.</Text>}
            </View>
          )}
          keyExtractor={item => String(item)}
        />

        {fail && <Text>Somethings when wrong</Text>}

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

const styles = StyleSheet.create({});

export default EditScreen;
