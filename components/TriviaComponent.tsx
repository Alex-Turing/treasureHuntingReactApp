{/*StAuth10244: 
I Alexander Hernandez, 000896328 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.*/}
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import TreasureMapComponent from './TreasureMapComponent';

const TriviaComponent = ({ markerColor, name, question, choices, correctAnswer, onAnswer }: any) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const handleSelection = () => {
    const isCorrect = selectedAnswer === correctAnswer;

    if(isCorrect)
    {
      Alert.alert('Correct!', `You got the right answer, run to the next clue located at ${name}, the ${markerColor} marker on your map!`);
      setShowMap(true);  
    }
    else
    {
      Alert.alert('Try Again!', 'incorrect answer, please try again!');
    }

    onAnswer(isCorrect);
  };

  return(
    <View style={styles.triviaContainer}>
      {showMap && (
        <TreasureMapComponent
          onDeactivateMap={() => setShowMap(false)}
        />
      )}
      <ScrollView>
      <Text style={styles.question}>{question}</Text>
      <RadioButton.Group
        value={selectedAnswer}
        onValueChange={(newValue: React.SetStateAction<string|null>) => setSelectedAnswer(newValue)}
      >
        {choices.map((choice: string, index: number) => (
          <View key={index} style={styles.choiceContainer}>
            <RadioButton value={choice}/>
            <Text style={styles.choiceText}>{choice}</Text>
          </View>
        ))}
      </RadioButton.Group>
      <TouchableOpacity style={styles.submitButton} onPress={handleSelection}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  triviaContainer: {
    padding: 20,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#720e9e',
    padding: 10,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  choiceText: {
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
})

export default TriviaComponent;