import AsyncStorage from "@react-native-async-storage/async-storage";

export const CustomQuestionaires = [
  {
    question: "Do you have a Pet",
    options: ["Yes", "No"]
  },
  {
    question: "Which type of Pet do you Have?",
    options: ["Dog", "Parrot", "Horse", "Goat"]
  },
  {
    question: "What's your favorite type of music",
    options: ["Pop", "Rock", "Classical", "Hip-Hop"]
  }
];



export const SaveQuestionnaire = async () => {
  try {
    await AsyncStorage.setItem(
      'questionnaire',
      JSON.stringify(CustomQuestionaires)
    );
    console.log('Questionnaire saved to AsyncStorage');
  } catch (error) {
    console.error('Failed to save questionnaire:', error);
  }
};

export const LoadQuestionnaire = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('questionnaire');
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }
    return null;
  } catch (error) {
    console.error('Failed to load questionnaire:', error);
  }
};
