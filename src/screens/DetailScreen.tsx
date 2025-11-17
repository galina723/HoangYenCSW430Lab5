import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Appbar, Button, Icon, TextInput } from 'react-native-paper';
import { colorSystem } from '../helpers/colorSystem';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Controller, Path, useForm } from 'react-hook-form';
import { DataModel } from '../models/dataModel';
import { DataServices } from '../services/dataServices';
import dayjs from 'dayjs';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const DetailScreen = () => {
  const navigation: any = useNavigation();
  const route = useRoute();

  const [data, setData] = useState<DataModel>();

  useEffect(() => {
    if ((route.params as any).id) {
      getService((route.params as any).id);
    }
  }, [(route.params as any).id]);

  const getService = async (id: string) => {
    const res = await DataServices.getServiceById(id);
    console.log('detail', res);
    if (res !== 'fail') {
      setData(res.data);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await DataServices.deleteService(id);
    console.log('delete', res);
    if (res !== 'fail') {
      navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Delete fail');
    }
  };

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: colorSystem.primary }}>
        <Appbar.Content color="white" title={'Service Detail'} />
        <Appbar.BackAction
          color="white"
          onPress={() => {
            navigation.goBack();
          }}
        />
        {data && (
          <Appbar.Action
            icon={() => (
              <Menu>
                <MenuTrigger>
                  <Icon color="white" source={'dots-vertical'} size={24} />
                </MenuTrigger>
                <MenuOptions>
                  <MenuOption
                    onSelect={() => {
                      navigation.navigate('EditScreen', { id: data?._id });
                    }}
                    text="Edit"
                  />
                  <MenuOption
                    onSelect={() => {
                      Alert.alert(
                        'Warring',
                        'Do you want to delete this service?',
                        [
                          { text: 'Cancel' },
                          {
                            text: 'OK',
                            onPress: () => handleDelete(data?._id ?? ''),
                          },
                        ],
                      );
                    }}
                    text="Delete"
                  />
                </MenuOptions>
              </Menu>
            )}
            color="white"
          />
        )}
      </Appbar.Header>
      <View style={{ gap: 16, padding: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Service name: </Text>
          <Text>{data?.name}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Price: </Text>
          <Text>{data?.price}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Creator: </Text>
          <Text>{'Hung'}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Time: </Text>
          <Text>
            {data?.createdAt &&
              dayjs(data?.createdAt).format('DD/MM/YYYY HH:mm:ss')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Final update: </Text>
          <Text>
            {data?.updatedAt &&
              dayjs(data?.updatedAt).format('DD/MM/YYYY HH:mm:ss')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default DetailScreen;
