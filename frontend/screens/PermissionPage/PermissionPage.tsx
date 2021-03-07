import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {Component} from "react";
import {Icon} from 'react-native-elements'
import axios from "axios";
import {generateUUID} from "../../App";
import * as SecureStore from "expo-secure-store";

interface Props {
	navigation: any;
}
export default class PermissionPage extends Component<Props> {
	state = {showPrompt: false, telephoneNumber:undefined, showPermissionPage: true};

	async onSave(){
		await generateUUID();
		let id = await SecureStore.getItemAsync('uuid');

		axios
			.post("http://192.168.0.38:5000/addPhoneNumber",
				{
					id: id,
					phoneNumber: this.state.telephoneNumber
				}
			)
			.then(() => this.props.navigation.navigate("Heatmap"))
			.catch(reason => console.log("Cannot add number:", reason))
	}

	 render() {
		return (
			<View style={styles.container}>
				<Icon
					name='notification-important'
					color={"#778DFF"}
					size={100}
				/>
				{this.showBody()}
			</View>
		);
	}

	private showBody(){
		if(this.state.showPrompt){
			return this.getTelephoneNumberPrompt()
		}else {
			return this.getPermissionView()
		}
	}

	private getPermissionView() {
		return <View>
			<Text style={styles.text}>Would you like to get notified whenever you approach a crowded
				location?</Text>
			<TouchableOpacity
				onPress={() => this.setState({showPrompt: true})}
				style={styles.primaryButton}>
				<Text style={styles.primaryButtonText}>YES</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => this.props.navigation.navigate("Heatmap")}>
				<Text style={styles.secondaryButtonText}>Skip</Text>
			</TouchableOpacity>
		</View>;
	}

	private getTelephoneNumberPrompt() {
		return <View>
			<Text style={styles.text}>Enter your phone number to get notified</Text>
			<TextInput
				style={styles.textInput}
				onChangeText={input => this.setState({telephoneNumber: input})}
				autoCompleteType={"tel"}
				keyboardType={"phone-pad"}
			/>
			<TouchableOpacity
				onPress={() => this.onSave()}
				style={styles.primaryButton}>
				<Text style={styles.primaryButtonText}>SAVE</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => this.setState({showPrompt: false})}>
				<Text style={styles.secondaryButtonText}>Cancel</Text>
			</TouchableOpacity>
		</View>;
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width: "100%",
		alignContent: 'center'
	},
	text: {
		textAlign: 'center',
		fontSize: 24,
	},
	primaryButton: {
		alignSelf: "center",
		marginBottom: 8,
		marginTop: 8,
		paddingBottom: 8,
		paddingTop: 8,

		backgroundColor: "#778DFF",
		shadowColor: "#000000",
		borderRadius: 3,
		width: "50%",

		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3,

		elevation: 10,
	},
	textInput: {
		marginBottom: 8,
		marginTop: 8,
		paddingBottom: 8,
		paddingTop: 8,
		backgroundColor: "#E1E1E1",
		shadowColor: "#000000",
		borderRadius: 3,
		width: "50%",
		alignSelf: 'center',

		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3,

		elevation: 10,
	},
	primaryButtonText: {
		fontSize: 18,
		color: '#fff',
		textAlign: 'center',
	},
	secondaryButtonText: {
		fontSize: 18,
		color: '#000000',
		textAlign: 'center',
	}
});