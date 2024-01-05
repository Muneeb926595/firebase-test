import AsyncStorage from '@react-native-community/async-storage';

export const StorageKeys = {
  USER_ID: 'userId',
  Access_Token: 'access_token',
  SELECTED_APP_LANGUAGE: 'app_language',
  IS_APP_OPEND_FIRSTTIME: 'is_app_opend_firsttime',
  Cart: 'cart',
};

async function saveItem(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value)).then();
    return true;
  } catch (error) {
    console.log('Error saving data');
    return false;
  }
}

async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}

async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default {
  removeItem,
  StorageKeys,
  getItem,
  saveItem,
};
