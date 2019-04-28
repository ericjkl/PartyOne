import React from "react";
import styles from "../style/style";
import {Button, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert} from "react-native";
import firebase from "firebase";

export default class LoginScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			password:      "",
			email:         "",
			errorHappened: false,
			isLoading: false,
		};
	}

	validateEmailAndPassword = () => {
		let email = this.state.email;
		let password = this.state.password;
		let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		console.log(re.test(email));
		if (email.length < 5 || !re.test(email)) {
			this.setState({
				errorText:     "Bitte gib eine korrekte Email-Adresse ein.",
				errorHappened: true,
			});
			return false;
		}
		if (password.length < 6) {
			this.setState({
				errorText:     "Dein Passwort muss mindestens sechsstellig sein.",
				errorHappened: true,
			});
			return false;
		}
		this.setState({
			errorText:     "",
			errorHappened: false,
		});
		return true;
	};

	loginUser = () => {
		let that = this;
		let email = this.state.email;
		let password = this.state.password;
		if (!this.validateEmailAndPassword) return;
		this.setState({isLoading: true});
		firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
			this.setState({isLoading: false});
			that.props.navigation.goBack(null);
			Alert.alert('Super!', "Du bist jetzt eingeloggt.");
		}).catch((err) => {
			this.setState({isLoading: false});
			Alert.alert("Ooops...", err.toString());
		});
	};

	render() {
		return (
			<ScrollView>
				<View style={styles.switchButton}>
					<TouchableOpacity style={styles.center}
									  onPress={() => this.props.navigation.navigate("LoginScreen")}>
						<Text style={[styles.center, styles.switchButtonActiveText]}>Anmelden</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.center}
									  onPress={() => this.props.navigation.navigate("SignUpScreen")}>
						<Text style={[styles.center, styles.switchButtonInactiveText]}>Registrieren</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.simpleContainer}>
					<TextInput style={styles.textInput} underlineColorAndroid='black'
							   onChangeText={(text) => this.setState({email: text})}
						/*value={this.state.email}*/ placeholder='E-mail'/>
					<TextInput style={styles.textInput} underlineColorAndroid='black'
							   onChangeText={(text) => this.setState({password: text})}
						/*value={this.state.password}*/ placeholder='Passwort' secureTextEntry={true}/>
					<View style={styles.smallContainer}>
						<Button title='Anmelden' onPress={this.loginUser}/>
					</View>
					{this.state.isLoading ?
						<View style={styles.simpleContainer}>
							<ActivityIndicator size='large'/>
						</View>
						:
						null
					}
					{this.state.errorHappened ?
						<View style={styles.simpleContainer}>
							<Text style={[styles.center, styles.redText]}>{this.state.errorText}</Text>
						</View>
						:
						null
					}

				</View>

			</ScrollView>
		);
	}
}
