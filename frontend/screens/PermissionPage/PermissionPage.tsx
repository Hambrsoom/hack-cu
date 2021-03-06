import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {Component} from "react";
import {Icon} from 'react-native-elements'

interface Props {
	navigation: any;
}
export default class PermissionPage extends Component<Props> {
	state = {showPrompt: false, telephoneNumber:null, showPermissionPage: true};

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
		return <>
			<Text style={styles.text}>Would you like to get notified whenever you approach a crowded
				location?</Text>
			<TouchableOpacity
				onPress={() => this.setState({showPrompt: true})}
				style={styles.primaryButton}>
				<Text style={styles.primaryButtonText}>YES</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => this.props.navigation.navigate("HeatMap")}>
				<Text style={styles.secondaryButtonText}>Skip</Text>
			</TouchableOpacity>
		</>;
	}

	getTelephoneNumberPrompt() {
		return <>
			<Text style={styles.text}>Enter your phone number to get notified</Text>
			<TextInput
				style={styles.textInput}
				onChangeText={text => console.log(text)}
				autoCompleteType={"tel"}
				keyboardType={"phone-pad"}
			/>
			<TouchableOpacity
				onPress={() => alert('Hello, world!')}
				style={styles.primaryButton}>
				<Text style={styles.primaryButtonText}>SAVE</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => this.setState({showPrompt: false})}>
				<Text style={styles.secondaryButtonText}>Cancel</Text>
			</TouchableOpacity>
		</>;
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
		fontSize: 24
	},
	primaryButton: {
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