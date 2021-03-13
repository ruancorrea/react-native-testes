import React , { useState, useEffect } from 'react';
import apiTatu from "../services/apiTatu";
import infoTatuAtracoes from "../components/MusicPlayer/infoTatuAtracoes";
import { Container,List } from '../components/Repository/RepositoryStyle' //'./style';
import { ContainerRepository, Name, Description } from '../components/Repository/styles';
import { Button } from 'react-native'
import { StackParams, StackNavProps } from '../components/Navigation/Stack/Routes';
import { RouteProp, useNavigation } from '@react-navigation/core';
 

function AtracoesTatu ({navigation, route} : StackNavProps<"AtracoesTatu">) {
    
    const [atracoes, setAtracoes] = useState<infoTatuAtracoes[]>([]);
    const [conteudoClick, setConteudoClick] = useState<Boolean>();
    async function CarregandoAtracoes(){
        try {
            const response = await apiTatu.get(`/atracao/todos`);
            setAtracoes(response.data);
        }catch (error) {
            console.log("Houve um erro ao carregar as atracoes: " + error );
        }
    }

    function atracaoClicada(){
        setConteudoClick(true);
    }
    
    useEffect(() =>{
        CarregandoAtracoes();
    }, [])

    return(
        <Container>
            <List
              accessible = {true}
              keyboardShouldPersistTaps="handled"
              data = {atracoes}
              keyExtractor={(item: infoTatuAtracoes) => String(item.id)}
              renderItem = {({ item }) => (
                <Atracao 
                data={item}
                navigation = {navigation}
                />
              )} 
           />
        </Container>
    )
}

export const Atracao = ({ data } : {data: infoTatuAtracoes}) => {
    //  {navigation, route} : StackNavProps<"AtracoesTatu">) 
    const navigation = useNavigation();
    //console.log(navigation)
    //const route = useRoute<RouteProp<StackParams, 'Modal'>>(); 
    return (
        <ContainerRepository accessible>
            <Name
                accessible={true}
                accessibilityLabel="Ao clicar duas vezes novamente você será redirecionado para a página na web do repositório:"
                accessibilityHint={data.nome} // navigation.navigate('ConteudosTatu', {idAtracao: data.id})
                onPress={() => navigation.navigate('ConteudosTatu', {idAtracao: data.id})} 
            >{data.nome}</Name>
            <Description accessible >{data.descricao}</Description>
        </ContainerRepository>
    );
  }

export default AtracoesTatu;