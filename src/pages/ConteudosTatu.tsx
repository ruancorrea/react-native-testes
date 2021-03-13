import React , { useState, useEffect } from 'react';
import apiTatu from "../services/apiTatu";
import infoTatuConteudos from "../components/MusicPlayer/infoTatuConteudos";
import { Container,List } from '../components/Repository/RepositoryStyle' //'./style';
import { ContainerRepository, Name, Description, Stats, Stat, StatCount } from '../components/Repository/styles';
import { StackNavProps, StackParams } from '../components/Navigation/Stack/Routes';
import { TouchableHighlight } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { useNavigation } from '@react-navigation/core';

function ConteudosTatu ({navigation, route} : StackNavProps<"ConteudosTatu">){
    const [conteudos, setConteudos] = useState<infoTatuConteudos[]>([]);    
    async function CarregandoConteudos(){
        try {
            setConteudos([])
            const response = await apiTatu.get(`/conteudo/byatracao/`+ route.params.idAtracao);
            setConteudos(response.data);
        }catch (error) {
            console.log("Houve um erro ao carregar os conteudos: " + error );
        }
    } 

    useEffect(() =>{
        CarregandoConteudos(); 
    }, [route.params.idAtracao]) 

    return(
        <Container>
            <List
            accessible = {true}
            keyboardShouldPersistTaps="handled"
            data = {conteudos} 
            keyExtractor={(item: infoTatuConteudos) => String(item.id)}
            renderItem = {({ item }) => (
                <Conteudo data={item}/>
            )}
            />
        </Container>
    )
}

function Conteudo({ data } : {data: infoTatuConteudos}){
    const navigation = useNavigation();
    return (
        <ContainerRepository accessible>
            <Name
                accessible={true}
                accessibilityLabel="Ao clicar duas vezes novamente você será redirecionado para a página na web do repositório:"
                accessibilityHint={data.nome}
                onPress = {() => { navigation.navigate("MusicPlayer", {data:data});}}
            >{data.nome}
            </Name>
            <Description accessible >{data.descricao}</Description>
        </ContainerRepository>
    );
  }

export default ConteudosTatu;