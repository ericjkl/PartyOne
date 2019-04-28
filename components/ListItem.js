import React from 'react';
import styles from "../style/style";
import {Text, View, TouchableOpacity} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import validateNavigationCompatibility from '../functions/validateNavigationCompatibility'

export default class ListItem extends React.Component {
	navigation;
	navigateTo;
	navigationParams;
	itemTitle;
	date;
	onDelete;
	additionalStyle;
	constructor(props) {
		super(props);

		this.navigationFunction = validateNavigationCompatibility(props)[0];
		this.itemActiveOpacity = validateNavigationCompatibility(props)[1];

		if (typeof props.marginHorizontal !== 'number') {
			this.marginHorizontal = 0;
		} else {
			this.marginHorizontal = props.marginHorizontal;
		}
	}

	render() {
		return (
			<View style={this.props.additionalStyle}>
				<TouchableOpacity onPress={() => this.navigationFunction()} activeOpacity={this.itemActiveOpacity}>
					<View style={styles.listItem}>
						<View style={styles.row}>
							<Text style={[styles.listTitle, {paddingBottom: 2}]}>{this.props.itemTitle}</Text>
							<Text style={styles.listDate}>{this.props.date}</Text>
						</View>
						<TouchableOpacity style={[styles.icon, {verticalAlign: "center"}]}
										  onPress={this.props.onDelete}>
							<AntDesign name='delete' size={20}/>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</View>

		)
	}

}