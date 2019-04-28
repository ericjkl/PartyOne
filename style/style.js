import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
	center:                   {
		flex:           1,
		justifyContent: "center",
		alignContent:   "center",
		textAlign:      "center",
	},
	h2: {
		paddingTop: 5,
		fontSize: 17,
		fontWeight: '800',
		minWidth: 200
	},
	h3: {
		fontSize: 18,
		fontWeight: '500',
		minWidth: 200
	},
	row: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between',
	},
	row2: {
		flexDirection: 'row',
		flexWrap: 'nowrap',
	},
	simpleContainer:          {
		margin:  10,
		padding: 10,
	},
	smallContainer: {
		marginTop: 10,
		marginBottom: 10,
	},
	horizontalContainer: {
		marginRight: 15,
		marginLeft: 15,
	},
	placeholderContainer: {
		marginRight: 15,
		marginLeft: 15,
		padding: 5,
		paddingVertical: 40,
		backgroundColor: '#f9f9f9',
		borderRadius: 5,
	},
	placeholder: {
		margin: 5,
		color: '#828282',
	},
	redText:                  {
		color: "#FF402E",
	},
	greenText: {
		color: '#1db74e'
	},
	card:                     {
		height:          200,
		flex:            1,
		borderRadius:    15,
		backgroundColor: "grey",
		margin:          10,
		padding:         20,
		overflow:        "hidden",
		elevation:       5,
	},
	cardImage:                {
		position: "absolute",
	},
	cardTitle:                {
		marginTop: 135,
		elevation: 100,
	},
	cardTitleText:            {
		fontSize:   25,
		color:      "#fff",
		fontWeight: "600",
	},
	modalBackground: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		flex: 1,
	},
	modal: {
		marginTop: 150,
		marginRight: 20,
		marginBottom: 150,
		marginLeft: 20,
		padding: 20,
		paddingRight: 10,
		paddingLeft: 10,
		alignContent: 'space-between',
		backgroundColor: '#fff',
		borderRadius: 2,
	},
	switchButton:             {
		flexDirection:   "row",
		margin:          15,
		padding:         10,
		flex:            1,
		backgroundColor: "#D4D4D4",
		borderRadius:    6,
	},
	switchButtonActiveText:   {
		fontWeight: "500",
	},
	switchButtonInactiveText: {
		color: "#828282",
	},
	button:                   {
		flex: 1,
		margin: 5,
	},
	textInput:                {
		borderColor:     "#000",
		height:          45,
		marginTop: 10,
		marginBottom: 10,
		backgroundColor: "#f5f5f5",
		paddingLeft:     10,
		paddingRight:    10,
		borderRadius:    5,
		fontSize:        18,
	},
	listItem: {
		backgroundColor: "#f9f9f9",
		marginTop: 5,
		marginBottom: 5,
		padding: 7,
		paddingTop: 12,
		paddingBottom: 12,
		borderRadius:    5,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	listTitle: {
		fontSize: 15,
	},
	listDate: {
		marginLeft: 5,
		paddingTop: 3,
		color: '#dcdcdc',
		fontSize: 12,
	},
	personsContainer:         {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 5,
		marginRight: -5,
		marginLeft: -5,
	},
	personContainer:          {
		flexDirection:   'row',
		flexWrap:        'nowrap',
		backgroundColor: '#7284a2',
		borderRadius:    5,
		padding: 10,
		margin: 5,
	},
	personText: {
		color: '#fff',
		fontSize: 20,
	}

});
export default styles;