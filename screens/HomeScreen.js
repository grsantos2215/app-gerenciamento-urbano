import { React, Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allItems: [],
            forecast: [],
        };
    }

    async componentDidMount() {
        fetch('https://api.hgbrasil.com/weather?user_ip=remote')
            .then((res) => res.json())
            .then((response) => {
                const obj = JSON.stringify(response);
                const json = JSON.parse(obj);

                this.setState({ allItems: json.results, forecast: json.results.forecast });
            })
            .catch((err) => console.log(err));
    }

    render() {
        const { allItems, forecast } = this.state;
        var icon;

        if (allItems.condition_slug == 'rain') {
            icon = 'rainy';
        } else if ((allItems.condition_slug == 'fog' || allItems.condition_slug == 'cloudly_night') && allItems.currently == 'noite') {
            icon = 'cloudy-night';
        } else if ((allItems.condition_slug == 'fog' || allItems.condition_slug == 'cloudly_day') && allItems.currently == 'dia') {
            icon = 'partly-sunny';
        } else if (allItems.condition_slug == 'cloud') {
            icon = 'cloud';
        } else if (allItems.condition_slug == 'storm') {
            icon = 'thunderstorm';
        } else if ((allItems.condition_slug = 'clear_day')) {
            icon = 'sunny';
        } else if ((allItems.condition_slug = 'clear_night')) {
            icon = 'moon';
        } else {
            icon = 'cloud';
        }

        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={[styles.card, allItems.currently == 'noite' ? styles.dark : styles.light]}>
                            <Ionicons name={icon} size={100} color={allItems.currently == 'noite' ? '#fff' : '#000'} />
                            <View style={styles.cardContent}>
                                <Text style={[styles.temp, allItems.currently == 'noite' ? styles.darkText : styles.lightText]}>{allItems.temp}°</Text>
                                <Text style={[allItems.currently == 'noite' ? styles.darkText : styles.lightText]}>{allItems.description}</Text>
                                <Text style={[allItems.currently == 'noite' ? styles.darkText : styles.lightText]}>Umidade do Ar: {allItems.humidity}</Text>
                                <Text style={[allItems.currently == 'noite' ? styles.darkText : styles.lightText]}>{allItems.city}</Text>
                            </View>
                        </View>
                        <Text>Próximos dias</Text>
                        {Array.from(forecast).map((forecast) => {
                            {
                                if (forecast.condition == 'rain') {
                                    icon = 'rainy';
                                } else if ((forecast.condition == 'fog' || forecast.condition == 'cloudly_night') && allItems.currently == 'noite') {
                                    icon = 'cloudy-night';
                                } else if ((forecast.maxcondition == 'fog' || forecast.condition == 'cloudly_day') && allItems.currently == 'dia') {
                                    icon = 'partly-sunny';
                                } else if (forecast.condition == 'cloud') {
                                    icon = 'cloud';
                                } else if (forecast.condition == 'storm') {
                                    icon = 'thunderstorm';
                                } else if ((forecast.condition = 'clear_day')) {
                                    icon = 'sunny';
                                } else if ((forecast.condition = 'clear_night')) {
                                    icon = 'moon';
                                } else {
                                    icon = 'cloud';
                                }
                            }
                            return (
                                <View style={[styles.forecast, allItems.currently == 'noite' ? styles.dark : styles.light]} key={forecast.date}>
                                    <Ionicons name={icon} size={100} color={allItems.currently == 'noite' ? '#fff' : '#000'} />
                                    <View style={styles.cardContent}>
                                        <Text style={[styles.tempForecast, allItems.currently == 'noite' ? styles.darkText : styles.lightText]}>
                                            {forecast.min}° ~ {forecast.max}°
                                        </Text>
                                        <Text style={[allItems.currently == 'noite' ? styles.darkText : styles.lightText]}>{forecast.description}</Text>
                                        <Text style={[allItems.currently == 'noite' ? styles.darkText : styles.lightText]}>
                                            {forecast.weekday}, {forecast.date}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
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
