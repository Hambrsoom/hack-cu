
import * as SecureStore from 'expo-secure-store';
export async function generateUUID() {
	let generatedID = '1234'//TODO: Find a way to generate a uuid (i.e uuid.v1())
	await SecureStore.setItemAsync('uuid', generatedID);
}