import React from "react";
import styles from "../style/style";
import {ActivityIndicator, Button, ScrollView, Text, View} from "react-native";
import firebase from "firebase";
import {Feather} from "@expo/vector-icons";

export default class HomeScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn:    false,
			user:          firebase.auth().currentUser,
			password:      "",
			email:         "",
			errorHappened: false,
			isLoading:     true,
		};
	}

	componentDidMount() {
		setTimeout(() => this.checkUserStatus(), 2000);
	}

	componentWillMount() {
		this._subscribe = this.props.navigation.addListener("didFocus", () => {
			this.checkUserStatus();
		});
	}

	checkUserStatus = () => {
		let that = this;
		firebase.auth().onAuthStateChanged(function (user) {
			that.setState({
				isLoggedIn: user !== null,
				user:       user,
				isLoading:  false,
			});
		});
	};

	render() {
		return (
			<ScrollView style={styles.simpleContainer}>
				{
					this.state.isLoading
						?
						<ActivityIndicator size='large'/>
						:
						<View>
							{this.state.isLoggedIn
								?
								<View style={styles.center}>
									<Feather name='user-check' size={35} style={styles.center}/>
									<Text style={[styles.greenText, styles.h2, styles.center]}>Du bist eingeloggt.</Text>
								</View>
								:
								<View>
									<Text style={[styles.redText, styles.center]}>Du bist nicht eingeloggt.</Text>
									<View style={styles.smallContainer}>
										<Button title="Jetzt anmelden"
												onPress={() => this.props.navigation.navigate("Login")}/>
									</View>
								</View>
							}
						</View>
				}

			</ScrollView>
		);
	}
}
