import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api';
import infoRepository from '../components/Repository/infoRepository';
import { Keyboard, Linking } from 'react-native';
import { Container, Title, Form, Input, Submit, List } from '../components/Repository/RepositoryStyle' //'./style';
import { ContainerRepository, Name, Description, Stats, Stat, StatCount } from '../components/Repository/styles';
import Tts from 'react-native-tts';

export const Repository = ({ data } : {data: infoRepository}) => {

  return (
      <ContainerRepository accessible>
          <Name
              accessible={true}
              accessibilityLabel="Ao clicar duas vezes novamente você será redirecionado para a página na web do repositório:"
              accessibilityHint={data.name} 
              onPress={() => Linking.openURL('http://www.github.com/' + data.full_name)}
          >{data.name}</Name>
          <Description accessible >{data.description}</Description>
          
          <Stats>
              <Stat>
                  <Icon name="star" size={16} color="#333" />
                  <StatCount>{data.stargazers_count}</StatCount>
              </Stat>

              <Stat>
                  <Icon name="code-fork" size={16} color="#333" />
                  <StatCount>{data.forks_count}</StatCount>
              </Stat>
          </Stats>
      </ContainerRepository>
  );
}

export default function RepositoryAPI() {

  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [repositorios, setRepositorios] = useState<infoRepository[]>([]);

  async function SearchUserGithub(){
    try {
      const response = await api.get(`/users/${input}/repos`);
      setRepositorios(response.data);
      setInput('');
      Tts.setDefaultLanguage('pt-BR');
      Tts.speak(`Repositórios carregados com sucesso! ${input}.`);
    
      setError(false);
      Keyboard.dismiss();
    } catch (error) {
        setError(true);
        Tts.setDefaultLanguage('pt-BR');
        Tts.speak(`Erro! Houve um problema ao carregar os repositórios do usuário ${input}. Verifique se o nome do usuário está correto.`);
    
    }
  }

  useEffect(() =>{
      Tts.setDefaultLanguage('pt-BR');
      Tts.speak(`Página Github API. Temos um campo para inclusão do username.`);
  }, [])

  return(
      <Container>
          <Form>
              <Input
                accessible={true}
                accessibilityLabel="Campo de entrada de dados"
                value={input}
                error={error}
                onChangeText={setInput}
                autoCapitalize = "none"
                autoCorrect={false}
                placeholder="Digite o nome do usuário"
              />

              <Submit 
                onPress={SearchUserGithub}
                accessible={true}
                accessibilityLabel="Botão de envio do campo do usuário. Ao clicar você buscará os repositórios deste usuário. O usuário digitado foi:"
                accessibilityHint={input}     
              >
                
                <Icon name="search" size={22} color= "#FFF" />
              </Submit>
          </Form>

          <Title>Repositórios</Title>

           <List
              accessible = {true}
              keyboardShouldPersistTaps="handled"
              data = {repositorios}
              keyExtractor={(item: infoRepository) => String(item.id)}
              renderItem = {({ item }) => (
                <Repository data={item} />
              )}
           />
      </Container>
  );
}