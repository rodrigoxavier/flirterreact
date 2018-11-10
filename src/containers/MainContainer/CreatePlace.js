/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from "firebase"

var { height, width } = Dimensions.get('window');

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class CreatePlace extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            deviceWidth: width,
            deviceHeight: height,
            nome: "",
            cidade: "",
            endereco: "",
            telefone: "",
            abertura: "",
            fechamento: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.backToDashboard()} style={styles.backButton} >
                    <Text style={styles.buttonText}>Voltar para Dashboard</Text>
                </TouchableOpacity>

                <Text style={styles.titleText}>Cadastro de Local 2</Text>

                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(text) => this.setState({ nome: text })}
                    placeholder="Nome"
                    value={this.state.nome}
                />

                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(text) => this.setState({ cidade: text })}
                    placeholder="Cidade"
                    value={this.state.cidade}
                />

                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(text) => this.setState({ endereco: text })}
                    placeholder="Endereço"
                    value={this.state.endereco}
                />

                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(text) => this.setState({ telefone: text })}
                    placeholder="Telefone"
                    value={this.state.telefone}
                />

                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(text) => this.setState({ abertura: text })}
                    placeholder="Abertura"
                    value={this.state.abertura}
                />

                <TextInput
                    style={styles.inputStyle}
                    onChangeText={(text) => this.setState({ fechamento: text })}
                    placeholder="Fechamento"
                    value={this.state.fechamento}
                />


                <TouchableOpacity onPress={() => this.askRegisterPlace()} style={styles.registerButton} >
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    backToDashboard() {
        Actions.dashboard();
    }

    askRegisterPlace() {
        Alert.alert(
            'Registrar Local',
            'Confirma o seu registo do local?',
            [
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                {
                    text: 'OK', onPress: () =>
                        this.registerPlace()
                },
            ],
            { cancelable: false }
        )
    }

    registerPlace() {
        const placeData = {
            nome: this.state.nome,
            cidade: this.state.cidade,
            endereco: this.state.endereco,
            telefone: this.state.telefone,
            abertura: this.state.abertura,
            fechamento: this.state.fechamento
        }

        firebase.database().ref("Places/")
        .push(placeData)
        .then((snapshot) => {
            const placeId = snapshot.key;
            firebase.database().ref("Places/"+placeId)
            .update({
                uid: placeId
            })
            Alert.alert("Sucesso", "Local criado!");
        })
    }

    confirmRegister() {
        const userData = {
            nome: this.state.nome,
            email: this.state.email,
            cidade: this.state.cidade,
            telefone: this.state.telefone,
            idade: this.state.idade,
            altura: 170,
        }
        firebase.database().ref("Shops/").push(userData)
            .then((snapshot) => {
                Alert.alert("Sucesso!", "Usuário criado");
                Actions.pop();
            })
            .catch((error) => {
                console.log("Error: ", error);
                Alert.alert("Errou na persistência!", error.code)
            })

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    backButton: {
        backgroundColor: "gray",
        borderRadius: 10,
        padding: 10,
        margin: 20,
        alignSelf: "flex-start"
    },
    registerButton: {
        backgroundColor: "green",
        borderRadius: 10,
        padding: 10,
        margin: 20,
        width: width * 0.8,
        alignItems: 'center'
    },
    buttonText: {
        color: "white"
    },
    inputStyle: {
        height: height * 0.06,
        width: width * 0.85,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        margin: width * 0.04
    },
    titleText: {
        fontSize: 30,
        alignItems: 'center',
        textAlign: 'center',
        color: "#039BE5"
    }
});
