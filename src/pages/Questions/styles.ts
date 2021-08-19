import styled from 'styled-components/native';
import { fonts, colors } from '../../styles'

import { StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px 30px;
  background-color: ${colors.secondary};
`;

export const Title = styled.Text`
    font-size: ${fonts.bigger};
    color: ${colors.white};
    font-family: ${fonts.fontFamilyRegular};
    margin: 24px 0 24px;
    text-align: center;
`;

export const CardStyled = styled.View`
  background-color: ${colors.secondary};
  padding: 18px;
  border-bottom-width: 2px;
  border-bottom-color: ${colors.primary};
  margin-bottom: 16px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const ViewOption = styled.View`
  align-items: center;
  flex-direction: row;
`;


export const TextStyled = styled.Text`
font-size: ${fonts.small};
color: ${colors.white};
max-width: 60%;
font-family: ${fonts.fontFamilyRegular};
`

export const TextStyledOption = styled.Text`
font-size: ${fonts.small};
color: ${colors.white};
font-family: ${fonts.fontFamilyRegular};
`;

export const TitleStyled = styled.Text`
  font-size: ${fonts.regular};
  color: ${colors.white};
  font-family: ${fonts.fontFamilyRegular};
  text-align: center;
  font-weight: bold;
  padding-bottom: 24px;
`

export const ViewContainer = styled.View`
  flex: 1;
  background-color: ${colors.secondary};
`;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0C4DE',
  },

  backgroundPicker: {
    width: '100%',
    backgroundColor: '#fff',
    marginTop: 4,
    marginBottom: 16,
    borderRadius: 8,
  },

  teacherList: {
    marginTop: -40,
  },

  searchForm: {
    marginBottom: 8,
  },

  label: {
    color: '#d4c2ff',
    fontFamily: 'Poppins_400Regular',
  },

  inputGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputBlock: {
    width: '48%',
  },

  input: {
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },

  submitButton: {
    backgroundColor: '#04d361',
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitButtonText: {
    color: '#FFF',
    fontFamily: 'Archivo_700Bold',
    fontSize: 16,
  },

  buttonStyle: {
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    backgroundColor: '#fff',
    width: '100%',
  },

  textButtonStyle: {
    color: '#000',
    fontSize: 17,
    width: '100%',
    textAlign: 'center',
  },
});
