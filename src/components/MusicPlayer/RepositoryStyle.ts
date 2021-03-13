import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(LinearGradient).attrs({
    colors: ['#e5e5e5', '#fff'],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
})`
    flex: 1;
`;

export const Title = styled.Text`
    font-size: 32px;
    color: #000;
    font-weight: bold;
    padding: 0 20px;
    margin-top: 20px;
`;

export const Form = styled.View`
    flex-direction: row;
    margin-top: 20px;
    padding: 0 20px;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#999',
})`
    flex: 1;
    padding: 12px 15px;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    background: #fff;
    border: 3px solid ${props => (props.error ? '#FF7272' : '#fff')};
`;

export const Submit = styled.TouchableOpacity`
    background: #000;
    margin-left: 10px;
    justify-content: center;
    border-radius: 4px;
    padding: 0 14px;
`;

export const List = styled.FlatList.attrs({
    contentContainerStyle: { paddingHorizontal: 20},
    showsVerticalScrollIndicator: false,
})`
    margin-top: 20px
`;