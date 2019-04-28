import React from "react";
import styles from "../style/style";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";

export default class GamesScreen extends React.Component {

	render() {
		return (
			<ScrollView>
				<TouchableOpacity onPress={()=>this.props.navigation.navigate('GameBottleSpinning')}>
					<View style={styles.card}>
						<Image style={styles.cardImage}/>
						<View style={styles.cardTitle}>
							<Text style={styles.cardTitleText}>Flaschendrehen</Text>
						</View>
					</View>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}