import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SvgImageWrapper from '../../component/atoms/svgImageWrapper/SVGImageWrapper';
import { leftArrow } from '../../assets/svgImages/SvgImages';
import CustomText from '../../component/atoms/customText/CustomText';
import CustomBotton from '../../component/atoms/customBotton/CustomBotton';
import { useEffect, useState, useContext } from 'react';
import { LoadQuestionnaire, SaveQuestionnaire } from '../../component/molecules/customQuestionaire/CustomQuestionaire';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../component/molecules/customTheme/CustomTheme';

const Questionaire = () => {
  const { theme } = useContext(ThemeContext);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      await SaveQuestionnaire(); // Save default data (optional)
      const data = await LoadQuestionnaire();
      if (data) {
        setQuestionnaire(data);
      }
    };
    initialize();
  }, []);

  const handleSelectOption = async (optionIndex) => {
    setSelectedIndex(optionIndex);
    const selectedAnswer = questionnaire[index].options[optionIndex];
    await AsyncStorage.setItem(`question_${index}`, selectedAnswer);
    console.log(`Answer saved for Q${index}: ${selectedAnswer}`);

    setTimeout(() => {
      if (index < questionnaire.length - 1) {
        setIndex((prev) => prev + 1);
        setSelectedIndex(null);
      } else {
        console.log('Questionnaire completed');
      }
    }, 200);
  };

  const handleNext = () => {
    if (index < questionnaire.length - 1) {
      setIndex(index + 1);
      setSelectedIndex(null);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      setSelectedIndex(null);
    }
  };

  const currentQuestion = questionnaire[index];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.subContainer}>
        <View style={styles.question}>
          <TouchableOpacity onPress={handlePrevious}>
            <SvgImageWrapper xml={leftArrow} height={24} width={24} color={theme.colors.text} />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext}>
            <CustomText title="Skip" fontsize={20} fontweight={600} Color={theme.colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <CustomText
            title={currentQuestion?.question}
            fontsize={30}
            fontweight={600}
            Color={theme.colors.text}
            style={{ flexWrap: 'wrap', width: '100%' }}
          />
        </View>

        <View style={styles.options}>
          <FlatList
            data={currentQuestion?.options}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
            columnWrapperStyle={{
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              marginBottom: 10,
            }}
            renderItem={({ item, index: optionIndex }) => {
              const isSelected = selectedIndex === optionIndex;
              return (
                <CustomBotton
                  title={item}
                  bgColor={isSelected ? theme.colors.primary : theme.colors.background}
                  BdWidth={1}
                  BorderColor={isSelected ? theme.colors.primary : theme.colors.text}
                  style={{
                    color: isSelected ? 'white' : theme.colors.text,
                    fontSize: 20,
                    fontWeight: '600',
                    height: 40,
                    width: 160,
                    textAlign: 'center',
                    paddingVertical: 10,
                  }}
                  OnPress={() => handleSelectOption(optionIndex)}
                />
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  options: {
    marginTop: 20,
  },
});

export default Questionaire;
