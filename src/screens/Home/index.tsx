import React, { useEffect, useState } from 'react';

import {
    SafeAreaView,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    RefreshControl,
    StatusBar,
    AsyncStorage,
    Alert,
    
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './style';
import { DrawerActions, useNavigation } from '@react-navigation/core';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import api from '../../services/api';
import Load from '../../components/Load';
import { useIsFocused } from '@react-navigation/native';

export default function Home() {
    const navigation: any = useNavigation();
    const isFocused = useIsFocused();

    const [dados, setDados] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
    const [usu, setUsu] = React.useState('');

    async function listarDados() {
        try {
            const response = await api.get('dashboard/ListAllCards.php');
            setDados(response.data);
            
        } catch (error) {
            console.log("Error");
        } finally {
            setIsLoading(false);
            setRefreshing(false);
            
        }
    }

    useEffect(() => {
        listarDados();
    }, []);

    useEffect(() => {
        listarDados();
    }, [isFocused]);

    const onRefresh = () => {
        setRefreshing(true);
        listarDados();
       
    };

    const preffi = 25;


    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={styles.containerHeader}>

                        <TouchableOpacity
                            style={styles.menu}
                            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                        >
                            <MaterialIcons name="menu" size={35} color="black" />
                        </TouchableOpacity>

                        <Image style={styles.logo} source={require('../../assets/logo2.png')} />

                    </View>
                </View>

                {isLoading ?
                    <Load /> :

                    <ScrollView
                        style={{ flex: 1 }}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >

                        <View style={styles.circleProgressView}>
                            <View style={styles.textProgressContainer}>
                                <Text style={styles.textProgressTitle}>Agendamentos</Text>
                                <Text style={styles.textProgress}>2 de 3 finalizadas</Text>
                            </View>

                            <AnimatedCircularProgress
                                size={100}
                                width={10}
                                fill={preffi}
                                tintColor="#00e0ff"
                                backgroundColor="#e0e0e0"
                                lineCap={"round"}
                            >
                                {
                                    (fill) => (
                                        <Text style={styles.numberInside}>2</Text>
                                    )
                                }
                            </AnimatedCircularProgress>
                        </View>


                        <View style={styles.containerBox}>

                            <TouchableOpacity onPress={() => navigation.navigate("Pessoas")}>
                                <View>
                                    <View style={styles.box}>
                                        <MaterialIcons style={styles.iconRegistered} name="people-alt" size={70} color="#17a2b8" />
                                        <View style={styles.textos}>
                                            <Text style={styles.rText}>Clientes</Text>
                                            <Text style={styles.lenghtText}>{dados.quantidade_clientes}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.textFooter}>Clientes cadastrados</Text>
                                </View>
                            </TouchableOpacity>
                            
                        </View>


                    </ScrollView>
                }
            </View>
        </View>


    )
}