import React from "react";
import styles from "../style/style";
import {Alert, Button, FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, ActivityIndicator} from "react-native";
import firebase from "firebase";
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import customDate from "../functions/customDate";
import ListItem from '../components/ListItem';
import Empty from '../components/Empty';

export default class PlanningScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoggedIn:     false,
			user:           firebase.auth().currentUser,
			newListTitle:   "Neue Liste",
			lists:          [],
			modalOpen:      false,
			errorMessage:   "",
			isRefreshing:   false,
			listsIsLoading: true,
		};
	}

	componentDidMount() {
		console.log('did mount');
		this.checkUserStatus(false);
	}

	componentWillMount() {
		console.log('will mount');
		this._subscribe = this.props.navigation.addListener("didFocus", () => {
			this.checkUserStatus(true);
		});
	}

	checkUserStatus = (updateLists) => {
		let user = firebase.auth().currentUser;
		console.log(user);
		this.setState({
			isLoggedIn: user !== null,
			user:       user,
		}, updateLists ? () => this.updateLists() : null);
	};

	updateLists = () => {
		console.log('updating');
		this.setState({listsIsLoading: true});
		if (this.state.user === null) return;
		let that = this;
		const db = firebase.database();
		const listKeysRef = db.ref("/users").child(that.state.user.uid).child("listKeys");
		listKeysRef.on("child_added", (newListKey) => {
			const newKey = newListKey.val();
			for (let i = 0; i < that.state.lists.length; i++) {
				if (that.state.lists[i].key === newKey) {// check if new child already exists in list
					return;
				}
			}
			db.ref("/lists").child(newKey).once("value")
			.then((newList) => {
				if (newList.val() !== null) {
					let lists = that.state.lists;
					lists.push(newList.val());
					that.setState({
						lists: lists,
					});
				}
				console.log('child added');
				that.setState({listsIsLoading: false});
			}).catch((error) => {
				Alert.alert("Ooops...", error);
			});
		});
	};

	submitListCreation = () => {
		const title = this.state.newListTitle;
		if (title && title.length > 0) {
			this.createNewList(title);
			this.setState({
				modalOpen:    false,
				errorMessage: "",
			});
		} else {
			this.setState({
				errorMessage: "Bitte geben Sie einen Titel ein.",
			});
		}
	};

	createNewList = (listTitle) => {
		const db = firebase.database();
		const newKey = db.ref("/lists").push().key;
		const userRef = db.ref("/users").child(this.state.user.uid);
		const newList = {
			createdAt: Date.now(),
			createdBy: this.state.user.uid,
			title:     listTitle,
			key:       newKey,
			items:     [],
		};

		userRef.child("listKeys").once("value")
		.then((snapshot) => {
			if (snapshot.exists()) {
				let listKeys = [...snapshot.val()];
				listKeys.push(newKey);
				return userRef.update({listKeys: listKeys});
			} else {
				return userRef.update({listKeys: [newKey]});
			}
		})
		.then(() => {
			return db.ref("/lists").child(newKey).set(newList);
		})
		.catch((error) => {
			console.log(error);
			Alert.alert("Ooops...", error.toString());
		})
		.then(() => {
			this.setState({isLoading: false});
		});
	};

	removeList = (keyToRemove) => {
		const db = firebase.database();
		const listKeysRef = db.ref("/users").child(this.state.user.uid).child("listKeys");
		listKeysRef.once("value")
		.then((snapshot) => {
			/*db data structure: listKeys: {0: key1, 1: key2, ...}
			-> you cant just rm one key/val pair bc then the indexes of the rest are wrong
			-> to remove a listKey I take whole array with snapshot.val(), rm the key and then set the new array */
			const listKeys = snapshot.val(); // gets an array with only the real list keys -> [key1, key2,...]
			const indexToRemove = listKeys.indexOf(keyToRemove);
			listKeys.splice(indexToRemove, 1);
			return listKeysRef.set(listKeys);
		})
		.then(() => {
			return db.ref("/lists").child(keyToRemove).remove();
		})
		.catch((error) => {
			Alert.alert("Ooops...", error.toString());
		})
		.then(() => {
			let newLists = [...this.state.lists];
			for (let i=0; i < newLists.length; i++) {
				if (newLists[i].key === keyToRemove) {
					newLists.splice(i, 1);
					this.setState({lists: newLists});
					break;
				}
			}
		});
	};

	renderListItems = ({item}) => {
		const key = item.key;
		const timestamp = new Date(item.createdAt);
		const date = customDate(timestamp, "d.m.y");
		return (
			<ListItem
				navigation={this.props.navigation}
				navigateTo='List'
				navigationParams={{
					listKey:   key,
					listTitle: item.title + "     ",
				}}
				itemTitle={item.title}
				date={date}
				onDelete={() => this.removeList(key)}
			/>
		);
	};

	refreshLists = () => {
		this.setState({
			isRefreshing: true,
		});
		Alert.alert("test", "refreshed.");
	};

	render() {
		return (
			<ScrollView>
				{this.state.isLoggedIn ?
					<View style={styles.simpleContainer}>
						<View style={styles.row}>
							<Text style={styles.h2}>Meine Listen</Text>
							<TouchableOpacity onPress={() => this.setState({modalOpen: true})}>
								<View style={styles.icon}>
									<MaterialIcons name='add' size={30}/>
								</View>
							</TouchableOpacity>
						</View>
						{this.state.listsIsLoading
							?
							<View style={styles.smallContainer}>
								<ActivityIndicator size='large'/>
							</View>

							:
							null
						}

						<FlatList
							data={this.state.lists}
							renderItem={({item}) => this.renderListItems({item})}
							ListEmptyComponent={<Empty isVisible={!this.state.listsIsLoading}/>}
							onRefresh={() => {
								this.refreshLists();
							}}
							refreshing={this.state.isRefreshing}
						/>

						<Modal visible={this.state.modalOpen} animationType="slide"
							   onRequestClose={() => this.setState({modalOpen: false})} transparent={true}>
							<View style={styles.modalBackground}>
								<View style={styles.modal}>
									<Text style={styles.h2}>Neue Liste erstellen</Text>
									<View style={styles.smallContainer}>
										<Text>Name</Text>
										<TextInput style={styles.textInput} underlineColorAndroid='black'
												   onChangeText={(text) => this.setState({newListTitle: text})}
												   value={this.state.newListTitle}
										/>
										<Text>{this.state.errorMessage}</Text>
									</View>
									<View style={styles.row2}>
										<View style={styles.button}>
											<Button title='Liste erstellen' onPress={this.submitListCreation}/>
										</View>
										<View style={styles.button}>
											<Button title='schließen'
													onPress={() => this.setState({modalOpen: false})}/>
										</View>
									</View>
								</View>
							</View>
						</Modal>
					</View>
					:
					<View style={styles.simpleContainer}>
						<Text style={[styles.redText, styles.center]}>Um diese Funktion nutzen zu können, musst du
							eingeloggt sein.</Text>
						<View style={styles.smallContainer}>
							<Button title="Jetzt anmelden" onPress={() => this.props.navigation.navigate("Login")}/>
						</View>
					</View>
				}
			</ScrollView>
		);
	}
}