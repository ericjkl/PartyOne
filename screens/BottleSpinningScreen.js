import React from "react";
import styles from "../style/style";
import {Button, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import {MaterialIcons} from '@expo/vector-icons'

export default class BottleSpinningScreen extends React.Component {

	stateDefault = {
		specialScreenIsActive: true, //true: special screen active; false: classic screen active
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
			description: "Freundschaftliche Umarmung.",
			points:      15,
		}, {
			name:        "drink",
			description: "Trinkt beide.",
			points:      10,
		}, {
			name:        "rockPaperScissors",
			description: "Spielt eine Runde Schere-Stein-Papier. Der Verlierer muss trinken.",
			points:      10,
		}, {
			name:        "choose",
			description: "Wähle selbst eine Aufgabe aus.",
			points:      100,
		},{
			name:        "europeanCities",
			description: "Zählt nacheinander europäische Hauptstädte auf. Wem als erster keine mehr einfällt muss trinken.",
			points:      25,
		},{
			name:        "question",
			description: "Stelle eine Frage deiner Wahl. Dein Gegner muss die Frage wahrheitsgemäß beantworten oder trinken.",
			points:      20,
		},{
			name:        "mixture",
			description: "Du darfst deinem Gegner eine Mische deiner Wahl machen. Wenn dein Gegner nicht auf ex austrinken kann, müssen beide trinken.",
			points:      40,
		},{
			name:        "message",
			description: "Schicke eine Nachricht an einen Kontakt deines Gegners. Nachricht und Kontakt sind frei wählbar.",
			points:      50,
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
									  onPress={() => this.setState({specialScreenIsActive: true})}>
						<Text style={
							this.state.specialScreenIsActive
								?
							[styles.center, styles.switchButtonActiveText]
								:
							[styles.center, styles.switchButtonInactiveText]
						}>Special</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.center}
									  onPress={() => this.setState({specialScreenIsActive: false})}>
						<Text style={
							this.state.specialScreenIsActive
								?
								[styles.center, styles.switchButtonInactiveText]
								:
								[styles.center, styles.switchButtonActiveText]
						}>Klassisch</Text>
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
					<Button onPress={() => this.spin(this.state.specialScreenIsActive)} title="Drehen"/>
				</View>
				{this.state.personsIsEmpty ?
					<Text style={[styles.redText, styles.center]}>Du musst zuerst einen Mitspieler hinzufügen!</Text>
					:
					<View>
						<View style={[styles.simpleContainer, styles.center]}>
							{this.state.didChoosePerson ? <Text>Dein Gegner ist:</Text> : null}
							<Text>{this.state.selectedPerson}</Text>
						</View>
						{this.state.specialScreenIsActive ?
							<View style={[styles.simpleContainer, styles.center]}>
							{this.state.didChooseTask ?
								<Text>Deine Aufgabe ist:{"\n"}{this.state.selectedTask.description}{"\n\n"}Wenn du die Aufgabe
									erfolgreich meisterst, bekommst du {this.state.selectedTask.points} Punkte!</Text>
								:
								null}
						</View>:
						null}
					</View>
				}


			</ScrollView>
		);
	}
}
