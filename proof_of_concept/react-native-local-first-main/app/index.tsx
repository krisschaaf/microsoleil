import {
  Alert,
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import React from 'react';

type QuestionType = 'text' | 'multipleChoice';

interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
}

interface Answer {
  questionId: string;
  answer: string;
}

const FormBuilder = () => {
  const [mode, setMode] = useState<'building' | 'filling'>('building');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Form builder state
  const [newQuestionType, setNewQuestionType] = useState<QuestionType>('text');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionOptions, setNewQuestionOptions] = useState<string[]>(['']);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  const addQuestion = () => {
    if (!newQuestionText.trim()) {
      Alert.alert('Error', 'Please enter a question');
      return;
    }

    if (newQuestionType === 'multipleChoice') {
      const validOptions = newQuestionOptions.filter(opt => opt.trim() !== '');
      if (validOptions.length < 2) {
        Alert.alert('Error', 'Please provide at least 2 options for multiple choice questions');
        return;
      }

      const newQuestion: Question = {
        id: Date.now().toString(),
        type: 'multipleChoice',
        question: newQuestionText,
        options: validOptions,
      };
      setQuestions([...questions, newQuestion]);
    } else {
      const newQuestion: Question = {
        id: Date.now().toString(),
        type: 'text',
        question: newQuestionText,
      };
      setQuestions([...questions, newQuestion]);
    }

    // Reset form
    setNewQuestionText('');
    setNewQuestionType('text');
    setNewQuestionOptions(['']);
    setEditingQuestionId(null);
  };

  const updateQuestionOption = (index: number, value: string) => {
    const updated = [...newQuestionOptions];
    updated[index] = value;
    setNewQuestionOptions(updated);
  };

  const addOptionField = () => {
    setNewQuestionOptions([...newQuestionOptions, '']);
  };

  const removeOptionField = (index: number) => {
    if (newQuestionOptions.length > 1) {
      const updated = newQuestionOptions.filter((_, i) => i !== index);
      setNewQuestionOptions(updated);
    }
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const handleContinue = () => {
    if (questions.length === 0) {
      Alert.alert('Error', 'Please create at least one question before continuing');
      return;
    }
    setMode('filling');
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validate all questions are answered
      for (const question of questions) {
        if (!answers[question.id] || answers[question.id].trim() === '') {
          Alert.alert('Error', 'Please answer all questions');
          setLoading(false);
          return;
        }
      }

      // Here you can send the form data
      console.log('Form submitted:', { questions, answers });
      Alert.alert('Success', 'Form submitted successfully!');
      
      // Reset for new form
      setQuestions([]);
      setAnswers({});
      setMode('building');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  const updateAnswer = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  // Form Builder View
  if (mode === 'building') {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.header}>Create Form</Text>

          {/* Question Type Selector */}
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                newQuestionType === 'text' && styles.typeButtonActive,
              ]}
              onPress={() => setNewQuestionType('text')}>
              <Text
                style={[
                  styles.typeButtonText,
                  newQuestionType === 'text' && styles.typeButtonTextActive,
                ]}>
                Text Question
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                newQuestionType === 'multipleChoice' && styles.typeButtonActive,
              ]}
              onPress={() => setNewQuestionType('multipleChoice')}>
              <Text
                style={[
                  styles.typeButtonText,
                  newQuestionType === 'multipleChoice' && styles.typeButtonTextActive,
                ]}>
                Multiple Choice
              </Text>
            </TouchableOpacity>
          </View>

          {/* New Question Input */}
          <TextInput
            placeholder="Enter your question"
            value={newQuestionText}
            onChangeText={setNewQuestionText}
            style={styles.inputField}
            placeholderTextColor="#999"
          />

          {/* Multiple Choice Options */}
          {newQuestionType === 'multipleChoice' && (
            <View style={styles.optionsContainer}>
              <Text style={styles.optionsLabel}>Options:</Text>
              {newQuestionOptions.map((option, index) => (
                <View key={index} style={styles.optionRow}>
                  <TextInput
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChangeText={value => updateQuestionOption(index, value)}
                    style={[styles.inputField, styles.optionInput]}
                    placeholderTextColor="#999"
                  />
                  {newQuestionOptions.length > 1 && (
                    <TouchableOpacity
                      onPress={() => removeOptionField(index)}
                      style={styles.removeButton}>
                      <Text style={styles.removeButtonText}>×</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <TouchableOpacity onPress={addOptionField} style={styles.addOptionButton}>
                <Text style={styles.addOptionButtonText}>+ Add Option</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Add Question Button */}
          <TouchableOpacity onPress={addQuestion} style={styles.addButton}>
            <Text style={styles.buttonText}>Add Question</Text>
          </TouchableOpacity>

          {/* Existing Questions List */}
          {questions.length > 0 && (
            <View style={styles.questionsList}>
              <Text style={styles.questionsListTitle}>Questions ({questions.length}):</Text>
              {questions.map(question => (
                <View key={question.id} style={styles.questionItem}>
                  <View style={styles.questionItemContent}>
                    <Text style={styles.questionItemType}>
                      {question.type === 'text' ? '📝' : '☑️'}
                    </Text>
                    <Text style={styles.questionItemText}>{question.question}</Text>
                    {question.type === 'multipleChoice' && question.options && (
                      <Text style={styles.questionItemOptions}>
                        Options: {question.options.join(', ')}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={() => deleteQuestion(question.id)}
                    style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Continue Button */}
          {questions.length > 0 && (
            <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
              <Text style={styles.buttonText}>Continue to Fill Form</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }

  // Form Filler View
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Fill Out Form</Text>

        {questions.map(question => (
          <View key={question.id} style={styles.questionContainer}>
            <Text style={styles.questionLabel}>
              {questions.indexOf(question) + 1}. {question.question}
            </Text>

            {question.type === 'text' ? (
              <TextInput
                placeholder="Your answer"
                value={answers[question.id] || ''}
                onChangeText={value => updateAnswer(question.id, value)}
                style={styles.inputField}
                placeholderTextColor="#999"
                multiline
              />
            ) : (
              <View style={styles.optionsList}>
                {question.options?.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      answers[question.id] === option && styles.optionButtonSelected,
                    ]}
                    onPress={() => updateAnswer(question.id, option)}>
                    <Text
                      style={[
                        styles.optionButtonText,
                        answers[question.id] === option && styles.optionButtonTextSelected,
                      ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit Form</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setMode('building')}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back to Builder</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#151515',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A700FF',
    alignItems: 'center',
    backgroundColor: '#363636',
  },
  typeButtonActive: {
    backgroundColor: '#A700FF',
  },
  typeButtonText: {
    color: '#A700FF',
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: '#fff',
  },
  inputField: {
    marginVertical: 8,
    height: 50,
    borderWidth: 1,
    borderColor: '#A700FF',
    borderRadius: 4,
    padding: 10,
    color: '#fff',
    backgroundColor: '#363636',
  },
  optionsContainer: {
    marginVertical: 10,
  },
  optionsLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionInput: {
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#ff4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  addOptionButton: {
    marginTop: 8,
    padding: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A700FF',
    alignItems: 'center',
  },
  addOptionButtonText: {
    color: '#A700FF',
    fontWeight: '600',
  },
  addButton: {
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#A700FF',
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  questionsList: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#363636',
  },
  questionsListTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  questionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#363636',
    borderRadius: 4,
    alignItems: 'center',
  },
  questionItemContent: {
    flex: 1,
  },
  questionItemType: {
    fontSize: 20,
    marginBottom: 5,
  },
  questionItemText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  questionItemOptions: {
    color: '#999',
    fontSize: 12,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#ff4444',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  continueButton: {
    marginTop: 20,
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#00aa00',
    padding: 15,
    borderRadius: 4,
  },
  questionContainer: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#363636',
    borderRadius: 4,
  },
  questionLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  optionsList: {
    marginTop: 10,
  },
  optionButton: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#A700FF',
    backgroundColor: '#363636',
  },
  optionButtonSelected: {
    backgroundColor: '#A700FF',
  },
  optionButtonText: {
    color: '#A700FF',
    fontSize: 16,
  },
  optionButtonTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 20,
    marginVertical: 15,
    alignItems: 'center',
    backgroundColor: '#00aa00',
    padding: 15,
    borderRadius: 4,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  backButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 12,
  },
  backButtonText: {
    color: '#A700FF',
    fontSize: 16,
  },
});

export default FormBuilder;
