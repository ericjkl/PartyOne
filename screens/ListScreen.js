import React from "react";
import styles from "../style/style";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import firebase from "firebase";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import customDate from "../functions/customDate";
import ListItem from '../components/ListItem';
import Empty from '../components/Empty';

export default class ListScreen extends React.Component {
	state = {
		items:        [],
		isLoading:    false,
		isRefreshing: false,
		newItemQuantity: null,
		newItemQuantityUnit: '',
	};

	helper = {
		listKey: this.props.navigation.getParam("listKey", null),
	};

	static navigationOptions = ({navigation}) => {
		return {
			title: navigation.getParam("listTitle", "Liste"),
		};
	};

	componentDidMount() {
		let that = this;
		firebase.database().ref("/lists").child(this.helper.listKey).child("items").on("child_added", (item) => {
			let items = that.state.items;
			items.push(item.val());
			that.setState({items: items});
		});
	}

	newListItem = () => {
		const name = this.state.newItemName;
		if (typeof name !== "string" || name.length < 1) return false;
		const quantity = this.state.newItemQuantity;
		const quantityUnit = this.state.newItemQuantityUnit;
		this.setState({
			newItemName:         "",
			newItemQuantity:     null,
			newItemQuantityUnit: "",
			isLoading:           true,
		});

		const listItemsRef = firebase.database().ref('/lists').child(this.helper.listKey).child('items');
		const itemKey = listItemsRef.push().key;
		listItemsRef.child(itemKey).set({
			name:         name,
			key:          itemKey,
			addedAt:      Date.now(),
			quantity:     quantity,
			quantityUnit: quantityUnit,
		}).then(() => {
			this.setState({
				isLoading: false,
			});
		});
	};

	removeItem = (keyToRemove) => {
		firebase.database().ref("/lists").child(this.helper.listKey).child("items").child(keyToRemove).remove()
		.then(() => {
			let items = this.state.items;
			for (let i=0; i < items.length; i++) {
				if (items[i].key === keyToRemove) {
					items.splice(i, 1);
					this.setState({items: items});
					break;
				}
			}
		});
	};

	headerComponent = () => {
		return (
			<View style={[styles.row, styles.simpleContainer]}>
				<TextInput style={[styles.textInput, {flex: 1}]} underlineColorAndroid='black'
						   placeholder='Hinzufügen'
						   onSubmitEditing={() => this.newListItem()}
						   onChangeText={(text) => this.setState({newItemName: text})}
						   value={this.state.newItemName}
				/>
				<TouchableOpacity onPress={() => this.newListItem()}>
					<View style={[styles.icon, styles.center, {marginLeft: 10}]}>
						<MaterialIcons name='add' size={30}/>
					</View>
				</TouchableOpacity>
			</View>
		);
	};

	renderItem = ({item}) => {
		const timestamp = new Date(item.addedAt);
		const date = customDate(timestamp, 'd.m.y');
		return (
			<ListItem
				itemTitle={item.name}
				date={date}
				onDelete={()=>this.removeItem(item.key)}
				additionalStyle={styles.horizontalContainer}
			/>
		);
	};

	refresh = () => {
		setTimeout(() => this.setState({isRefreshing: false}), 2000);
	};

	render() {
		return (
			<FlatList
				data={this.state.items}
				renderItem={({item}) => this.renderItem({item})}
				ListHeaderComponent={this.headerComponent}
				ListEmptyComponent={<Empty/>}
				onRefresh={() => this.refresh}
				refreshing={this.state.isRefreshing}
			/>
		);
	}
}