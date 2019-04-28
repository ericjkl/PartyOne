import React from 'react';
import styles from "../style/style";
import {Picker, ScrollView, Text, TextInput, View, TouchableOpacity, Switch} from "react-native";

export default class ClassicBottleSpinning extends React.Component {

	render() {
		return(
			<ScrollView>
				<View style={styles.switchButton}>
					<TouchableOpacity style={styles.center}
									  onPress={() => this.props.navigation.navigate("SpecialBottleSpinning")}>
						<Text style={[styles.center, styles.switchButtonInactiveText]}>Special</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.center}
									  onPress={() => this.props.navigation.navigate("ClassicBottleSpinning")}>
						<Text style={[styles.center, styles.switchButtonActiveText]}>Klassisch</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}