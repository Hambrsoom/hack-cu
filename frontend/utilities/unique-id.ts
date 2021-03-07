
import * as SecureStore from 'expo-secure-store';
import uuid from 'react-native-uuid';

export async function generateUUID() {
	let generatedID = uuid.v1();
	await SecureStore.setItemAsync('uuid', generatedID);
}