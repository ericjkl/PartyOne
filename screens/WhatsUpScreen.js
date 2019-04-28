import React from "react";
import styles from "../style/style";
import {ScrollView, Text} from "react-native";
// import {Body, Header, Icon, Left} from "native-base";

export default class WhatsUpScreen extends React.Component {

	render() {
		return (
			<ScrollView>
				<Text style={[styles.center, styles.simpleContainer]}>Diese Funktion ist noch nicht verfügbar. Hier kannst du bald Events sehen, die öffentlich sind
					oder zu denen du eingeladen wurdest.</Text>
			</ScrollView>
		);
	}
}