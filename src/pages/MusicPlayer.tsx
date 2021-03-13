import React, { useState, useEffect } from 'react';
import apiTatu from "../services/apiTatu";
import infoTatuConteudos from "../components/MusicPlayer/infoTatuConteudos";

export default function MusicPlayerAPI() {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const [conteudos, setConteudos] = useState<infoTatuConteudos[]>([]);

    return (
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
    )

} 