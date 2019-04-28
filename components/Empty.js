import React from 'react';
import styles from "../style/style";
import {Text, View} from "react-native";

export default class Empty extends React.Component {

	isVisible;

	constructor(props) {
		super(props);

		this.isVisible = this.props.isVisible;
		console.log(this.isVisible);
		if (typeof this.isVisible !== 'boolean') this.isVisible = true;
	}

	render() {
		return (
			this.isVisible
				?
			<View style={[styles.simpleContainer, styles.center, styles.placeholderContainer]}>
				<Text style={[styles.h3, styles.center, styles.placeholder]}>Nichts als Leere... 🤷</Text>
				<Text style={[styles.center, styles.placeholder]}>Tippe auf das "+"-Symbol, um etwas hinzuzufügen 🤙</Text>
			</View>
				:
				null
		)
	}
}