import React from 'react';
import styles from "../style/style";
import {ScrollView, Text, View, Alert, Button} from "react-native";
import firebase from "firebase";

export default class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);

		const app = require('../app.json');
		this.version = app.expo.version;
		console.log(app)
	}

	logOut = () => {
		firebase.auth().signOut().then(()=>{
			Alert.alert('Ok!', 'Du wurdest ausgeloggt.')
		}).catch((error)=>{
			Alert.alert('Ooops...', error)
		})
	};

	render() {
		return(
			<ScrollView>
				<View style={styles.simpleContainer}>
					<View style={styles.smallContainer}>
						<Button title={'Ausloggen'} onPress={()=>this.logOut()} />
					</View>
					<View style={styles.smallContainer}>
						<Text style={styles.center}>Version: {this.version}</Text>
					</View>
				</View>
			</ScrollView>
		)
	}
}