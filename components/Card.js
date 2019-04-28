import React from 'react';
import styles from "../style/style";
import {Text, View, TouchableOpacity, Image} from "react-native";
import validateNavigationCompatibility from "../functions/validateNavigationCompatibility";

export default class Card extends React.Component {

	navigateTo;
	navigationParams;
	cardTitle;
	image;

	constructor(props) {
		super(props);

		const validatedNavigation = validateNavigationCompatibility(props);
		this.navigationFunction = validatedNavigation[0];
		this.itemActiveOpacity = validatedNavigation[1];
	}

	render() {
		return (
			<TouchableOpacity onPress={()=>this.navigationFunction()} activeOpacity={this.itemActiveOpacity}>
				<View style={styles.card}>
					<Image source={this.props.image} style={styles.cardImage}/>
					<View style={styles.cardTitle}>
						<Text style={styles.cardTitleText}>{this.props.cardTitle}</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}

}