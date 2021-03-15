import React , { useState, useEffect } from 'react';
import apiTatu from "../services/apiTatu";
import infoTatuConteudos from "../components/MusicPlayer/infoTatuConteudos";
import { Container,List } from '../components/Repository/RepositoryStyle' //'./style';
import { ContainerRepository, Name, Description } from '../components/Repository/styles';
import { StackNavProps, StackParams } from '../components/Navigation/Stack/Routes';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import { TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Stats } from '../components/Repository/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

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
            >{data.nome}
            </Name>
            <Description accessible >{data.descricao}</Description>
            <Stats>
                <TouchableHighlight
                    onPress={() => {
                        navigation.navigate("MusicPlayer", {data:data, url: data.audio_desc, type: "Áudio descrição"})
                    }}
                    style = {{marginLeft: '2%', width: 45, marginTop: '1%'}}
                >
                    <Icon name="audio-description" size={38} color="#333" />   
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => {
                        navigation.navigate("MusicPlayer", {data:data, url: data.audio_guia, type: "Áudio guia"})
                    }}
                    style = {{marginLeft: '2%', width: 25, marginTop: '1%'}}
                >
                    <Icon name="blind" size={38} color="#333" />   
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={() => {
                        navigation.navigate("VideoPlayer", {data:data})
                    }}
                    style = {{marginLeft: '2%', width: 44, marginTop: '1%'}}
                >
                    <Icon name="cc" size={38} color="#333" />   
                </TouchableHighlight>
            </Stats>
            
        </ContainerRepository>
    );
  }

export default ConteudosTatu;