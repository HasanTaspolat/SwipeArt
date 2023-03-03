import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ArtistDashboardPage = () => {
    const [orderCount, setOrderCount] = useState(0);
    const [orderType, setOrderType] = useState('');
    const [activeOrders, setActiveOrders] = useState(0);
    const [rating, setRating] = useState(0);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    useEffect(() => {
        // Here you can fetch data from your API or database
        // and update the state variables accordingly
        // For demonstration purposes, we will use dummy data:
        const data = {
            orderCount: 10,
            orderType: 'Musician',
            activeOrders: 3,
            rating: 4.5,
            name: 'John',
            surname: 'Doe',
        };

        setOrderCount(data.orderCount);
        setOrderType(data.orderType);
        setActiveOrders(data.activeOrders);
        setRating(data.rating);
        setName(data.name);
        setSurname(data.surname);
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello,</Text>
                <Text style={styles.name}>{name} {surname}</Text>
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.card}>

                    <View style={styles.textContainer}>
                        <Icon name="shopping-cart" size={20} color="#fff" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Order Count: {orderCount}</Text>
                    </View>

                </View>
                <View style={styles.card}>
                    <View style={styles.textContainer}>
                        <Icon name="utensils" size={20} color="#fff" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Type: {orderType}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.cardContainer}>

                <View style={styles.card}>
                    <View style={styles.textContainer}>
                        <Icon name="clock" size={20} color="#fff" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Active Orders : {activeOrders}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.textContainer}>
                        <Icon name="star" size={20} color="#fff" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>Rating: {rating}</Text>
                    </View>
                </View>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        padding: 20,
    },
    cardContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    header: {
        marginTop: 20,
        marginBottom: 30,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        padding:10,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        padding:10,
    },
    card: {
        width: '45%',
        height: 120,
        borderRadius: 10,
        backgroundColor: '#000212',
        borderColor:"#004d6b",
        borderWidth:0.3,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        paddingHorizontal: 15,
        elevation: 5,
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: "center",
        marginTop: 10,
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
        color: '#fff',
        marginTop: 5,
    },
});

export default ArtistDashboardPage;