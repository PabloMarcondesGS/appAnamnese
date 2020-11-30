import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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

export default styles;
