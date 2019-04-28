export default function validateNavigationCompatibility(props) {

	if (typeof props.navigateTo !== 'string' || typeof props.navigation !== 'object') {
		var navigationFunction = () => null;
		var itemActiveOpacity = 1;
	} else if (typeof props.navigationParams !== 'object') {
		var itemActiveOpacity = 0.2;
		var navigationFunction = () => {
			props.navigation.navigate(props.navigateTo);
		}
	} else {
		var itemActiveOpacity = 0.2;
		var navigationFunction = () => {
			props.navigation.navigate(props.navigateTo, props.navigationParams);
		}
	}

	return [navigationFunction, itemActiveOpacity]

}