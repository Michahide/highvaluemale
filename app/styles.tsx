import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    width: 200,
    height: 100,
    justifyContent: 'center',
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  taskDescription: {
    fontSize: 16,
    color: 'black',
  },
  headTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  headSpecialTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ff0026',
  },
});
