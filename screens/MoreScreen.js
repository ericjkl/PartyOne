import React from 'react';
import styles from "../style/style";
import {ScrollView, Text, View, TouchableOpacity, Image} from "react-native";
import Card from '../components/Card'

export default class MoreScreen extends React.Component {

	render() {
		return(
			<ScrollView>
				<Card
					cardTitle='Pro Gaming'
					image={require('../assets/play.jpg')}
					navigation={this.props.navigation}
					navigateTo='Games'
				/>

				<Card
					cardTitle='Musikplayer'
					image={require('../assets/music.jpg')}
				/>

				<Card
					cardTitle='Einstellungen'
					image={require('../assets/settings.jpg')}
					navigation={this.props.navigation}
					navigateTo='Settings'
				/>

				<Card
					cardTitle='Noch mehr'
				/>
			</ScrollView>
		)
	}
}