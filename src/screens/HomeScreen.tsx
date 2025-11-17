import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import App from '../../App';
import { Appbar, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'react-hook-form';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { colorSystem } from '../helpers/colorSystem';
import { DataModel } from '../models/dataModel';
import { DataServices } from '../services/dataServices';
import Loading from '../components/Loading';

const HomeScreen = () => {
  const navigation: any = useNavigation();

  const [userName, setUserName] = useState('');
  const [data, setData] = useState<DataModel[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getAllServices();
    }, []),
  );

  useEffect(() => {
    getUserName();
    getAllServices();
  }, []);

  const getAllServices = async () => {
    setLoading(true);
    const res = await DataServices.getAllService();
    console.log('all', res);
    if (res !== 'fail') {
      setData(res.data);
    }
    setLoading(false);
  };

  const getUserName = async () => {
    const name = await AsyncStorage.getItem('user');

    setUserName(name ?? '');
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    navigation.navigate('LoginScreen');
  };

  const handleAdd = () => {
    navigation.navigate('AddScreen');
  };

  const renderItem = (item: DataModel) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailScreen', { id: item._id })}
      >
        <View
          style={{
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#e2e2e2',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 16,
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          <Text>{item.price} đ</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: colorSystem.primary }}>
        <Appbar.Content color="white" title={userName} />
        <Appbar.Action icon="account" color="white" onPress={handleLogout} />
      </Appbar.Header>
      <View
        style={{
          padding: 16,
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          gap: 16,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={{ height: 100, alignItems: 'center' }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Danh sách dịch vụ
          </Text>
          <TouchableOpacity
            onPress={handleAdd}
            style={{
              backgroundColor: colorSystem.primary,
              height: 34,
              width: 34,
              borderRadius: 56,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white' }}>+</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item, index) => item._id ?? index.toString()}
            contentContainerStyle={{ gap: 16 }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
