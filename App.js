import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Input, Icon , Button , ListItem} from 'react-native-elements';
import { SafeAreaView } from 'react-native-web';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [ShowScore, setShowScore] = useState(false);

  const quizData = [
    {
      question: '23 + 15',
      options: ['38','36','40','39'],
      answer: '38'
    },
    {
      question: '47 + 29',
      options: ['76','77','74','79'],
      answer: '76'
    },
      {
      question: '108 + 92',
      options: ['200','190','210','202'],
      answer: '200'
    },
    {
      question: '64 + 18',
      options: ['80','82','84','78'],
      answer: '82'
    },
    {
      question: '305 + 120',
      options: ['425','415','430','435'],
      answer: '425'
    }
  ]

  const handleAnswer = (selectedAnswer) =>{
    const answer = quizData[currentQuestion]?.answer;
    if(answer == selectedAnswer){
      setScore((prevScore)=> prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if(nextQuestion < quizData.length){
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }

  }

  const handRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  }

  return(
    <View style={styles.container}>
      {ShowScore ? 
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Você acertou {score} de {quizData.length}</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handRestart}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View> :
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{quizData[currentQuestion]?.question}</Text>
            {quizData[currentQuestion]?.options.map((item) => {
              return <TouchableOpacity style={styles.optionButton} onPress={()=> handleAnswer(item)}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            })}
          </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#4e73df',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
  },
  scoreText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#10ac84',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  }
});