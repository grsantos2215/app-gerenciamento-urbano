import { React, Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WebView from 'react-native-webview';

export default class MapScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
        };
    }

    async componentDidMount() {
        fetch('https://api.hgbrasil.com/geoip?key=cfdec058&address=remote')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    latitude: responseJson.results.latitude,
                    longitude: responseJson.results.longitude,
                });
            });
    }

    render() {
        const { latitude, longitude } = this.state;
        return <WebView source={{ html: `<iframe src="https://embed.waze.com/iframe?zoom=25&lat=${latitude}&lon=${longitude}" width="100%" height="100%" ></iframe>` }} style={styles.container} />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5FCFF',
    },
    card: {
        // borderWidth: 2,
        borderRadius: 10,
        width: '100%',
        flex: 0.3,
        backgroundColor: '#ffffff',
        elevation: 5,
        alignItems: 'center',
        padding: 15,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        margin: 10,
    },

    forecast: {
        // borderWidth: 2,
        borderRadius: 10,
        width: '100%',
        flex: 0.3,
        backgroundColor: '#ffffff',
        elevation: 5,
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingVertical: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 10,
    },

    cardContent: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '100%',
    },

    temp: {
        fontSize: 54,
    },

    tempForecast: {
        fontSize: 24,
    },

    light: {
        backgroundColor: '#EEEEEE',
    },
    dark: {
        backgroundColor: '#222831',
    },

    darkText: {
        color: '#ffffff',
    },
    lightText: {
        color: '#000000',
    },
});
