import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SwipeCard from './SwipeCard';
import data from '../person.json';
import {
    Image, Text
} from 'react-native';

const SwipeContainer = () => {
    const [cards, setCards] = useState(data);

    const handleSwipeLeft = (cardIndex) => {
        const newCards = [...cards];
        newCards.splice(cardIndex, 1);
        setCards(newCards);
    };

    const handleSwipeRight = (cardIndex) => {
        const newCards = [...cards];
        newCards.splice(cardIndex, 1);
        setCards(newCards);
    };

    return (
        <View style={styles.container}>
            {cards.map((card, index) => (
                <SwipeCard
                    key={index}
                    cardIndex={index}
                    onSwipeLeft={handleSwipeLeft}
                    onSwipeRight={handleSwipeRight}
                >
                    <View style={styles.card}>
                        <Image source={{ uri: card.image }} style={styles.image} />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{card.name}</Text>
                            <Text style={styles.name}>{card.surname}</Text>
                            <Text style={styles.profession}>{card.profession}</Text>
                        </View>
                    </View>
                </SwipeCard>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '60%',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    profession: {
        fontSize: 18,
        color: '#555',
    },
});

export default SwipeContainer;