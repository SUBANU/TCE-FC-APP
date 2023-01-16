
import { StyleSheet, View } from 'react-native';
import LoginForm from './app/components/LoginForm';

export default function App() {
  return (
    <View style={styles.container}>
   
      <LoginForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
});
