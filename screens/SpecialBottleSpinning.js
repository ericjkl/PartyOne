import React from "react";
import styles from "../style/style";
import {Button, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons'

export default class SpecialBottleSpinning extends React.Component {

	stateDefault = {
		didChoosePerson: false,
		selectedPerson:  null,
		didChooseTask:   false,
		selectedTask:    0,
		personsIsEmpty: true,
		newPerson:       "",
		persons:         [],
		personsComponents: [],
	};

	state = this.stateDefault;

	tasks = [
		{
			name:        "hug",
			description: "Umarmt euch solange ihr wollt.",
			points:      15,
		}, {
			name:        "drink",
			description: "Trinkt beide.",
			points:      10,
		}, {
			name:        "bellyShot",
			description: "Trinke einen Belly Shot von der genannten Person",
			points:      50,
		}, {
			name:        "irgendwas",
			description: "mach irgendwas, mir fällt nichts mehr ein.",
			points:      100,
		},
	];

	addPerson = () => {
		let persons = this.state.persons;
		persons.push(this.state.newPerson);
		this.setState({
			persons: persons,
			newPerson: '',
			personsIsEmpty: false,
		}, this.renderPersons);
	};

	deletePerson = (index) => {
		let persons = this.state.persons;
		persons.splice(index, 1);
		if (persons.length < 1) {
			this.setState({
				personsIsEmpty: true,
			})
		}
		this.setState({
			persons: persons,
		}, this.renderPersons);
	};

	renderPersons = () => {
		const persons = this.state.persons;
		let personsComponents = persons.map((value, index) => {
			return(
				<View style={styles.personContainer}>
					<Text style={styles.personText}>{value}</Text>
					<TouchableOpacity style={styles.personIconContainer} onPress={() => this.deletePerson(index)}>
						<MaterialIcons name='close' size={27}/>
					</TouchableOpacity>
				</View>
			)
		});
		this.setState({personsComponents: personsComponents});
	};

	spin = (chooseTask) => {
		let person = this.state.persons[Math.round(Math.random() * (this.state.persons.length - 1))];
		this.setState({
			selectedPerson:  person,
			didChoosePerson: true,
		});

		if (chooseTask) {
			let task = this.tasks[Math.round(Math.random() * (this.tasks.length - 1))];
			this.setState({
				selectedTask:  task,
				didChooseTask: true,
			});
		}
	};

	render() {
		return (
			<ScrollView>
				<View style={styles.switchButton}>
					<TouchableOpacity style={styles.center}
									  onPress={() => this.props.navigation.navigate("SpecialBottleSpinning")}>
						<Text style={[styles.center, styles.switchButtonActiveText]}>Special</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.center}
									  onPress={() => this.props.navigation.navigate("ClassicBottleSpinning")}>
						<Text style={[styles.center, styles.switchButtonInactiveText]}>Klassisch</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.simpleContainer}>
					<TextInput style={styles.textInput} underlineColorAndroid='black'
							   onSubmitEditing={this.addPerson}
							   onChangeText={(text) => this.setState({newPerson: text})}
						value={this.state.newPerson} placeholder='Mitspieler hinzufügen'/>
					<View style={styles.personsContainer}>
						{this.state.personsComponents}
					</View>
				</View>
				<View style={styles.simpleContainer}>
					<Button onPress={() => this.spin(true)} title="Drehen"/>
				</View>
				{this.state.personsIsEmpty ?
					<Text style={[styles.redText, styles.center]}>Du musst zuerst einen Mitspieler hinzufügen!</Text>
					:
					<View>
						<View style={[styles.simpleContainer, styles.center]}>
							{this.state.didChoosePerson ? <Text>Deine Person ist:</Text> : null}
							<Text>{this.state.selectedPerson}</Text>
						</View>
						<View style={[styles.simpleContainer, styles.center]}>
							{this.state.didChooseTask ?
								<Text>Deine Aufgabe ist:{"\n"}{this.state.selectedTask.description}{"\n\n"}Wenn du die Aufgabe
									erfolgreich meisterst, bekommst du {this.state.selectedTask.points} Punkte!</Text>
								:
								null}
						</View>
					</View>
				}


			</ScrollView>
		);
	}
}
