import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import SwipeCard from './SwipeCard';
import data from '../person.json';
import { AntDesign } from '@expo/vector-icons';



export default function SwipeContainer() {
    const [cards, setCards] = useState(data);


    const onSwipeLeft = (cardIndex) => {
        const newCards = [...cards];
        newCards.splice(cardIndex, 1);
        setCards(newCards);
        console.log('Swiped left on card at index', cardIndex);
    };

    const onSwipeRight = (cardIndex) => {
        const newCards = [...cards];
        newCards.splice(cardIndex, 1);
        setCards(newCards);
        console.log('Swiped right on card at index', cardIndex);
    };

    return (
        <View style={styles.cardContainer}>
            {cards.map((card, cardIndex) => (
                <SwipeCard
                    data={data}
                    key={cardIndex}
                    card={card}
                    onSwipeLeft={() => onSwipeLeft(cardIndex)}
                    onSwipeRight={() => onSwipeRight(cardIndex)}
                >
                    <View style={styles.card}>
                        <Image source={{ uri: card.image }} style={styles.cardImage} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{card.name} {card.surname}</Text>
                            <Text style={styles.profession}>{card.profession}</Text>
                        </View>

                    </View>
                    {/* <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(onSwipeLeft)}
                    >
                        <AntDesign name="close" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} >
                        <AntDesign name="check" size={24} color="white" />
                    </TouchableOpacity> */}
                </SwipeCard>

            ))}

            {/* <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(onSwipeLeft)}
            >
                <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} >
                <AntDesign name="check" size={24} color="white" />
            </TouchableOpacity> */}

        </View>

    );
}


const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: '100%',
        marginTop: 50,
    },

    cardImage: {
        width: '100%',
        height: '80%',
        marginBottom: 10,
        borderRadius: 10,
    },
    card: {
        borderRadius: 10,
        flexDirection: 'column',
        paddingHorizontal: 55,
        paddingVertical: 18,
        width: 400,
        height: "100%",
        alignItems: "center",
        justifyContent: 'center',
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "white",
    },
    profession: {
        fontSize: 16,
        textAlign: 'center',
        color: "white",
    },
    button: {
        width: 50,
        padding: 10,
        position: "absolute",
        bottom: 180,
        left: "30%",
        backgroundColor: 'red',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button2: {
        width: 50,
        padding: 10,
        position: "absolute",
        bottom: 180,
        right: "30%",
        backgroundColor: 'green',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
});


