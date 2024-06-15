import React, { useState } from 'react';
import { Modal, Portal, Text, IconButton, Divider, TextInput, Button } from 'react-native-paper';
import { styles } from '../themes/styles';
import { View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { push, ref, set } from 'firebase/database';
import { dbRealTime } from '../configs/firebaseConfig';

interface Props {
    showModalProduct: boolean;
    setShowModalProduct: (visible: boolean) => void;
    loadProducts: () => void;
}

interface FormProduct {
    name: string;
    price: string;
    year: string;
    image: string;
}

export const NewProductModal = ({ showModalProduct, setShowModalProduct, loadProducts }: Props) => {
    const [formProduct, setFormProduct] = useState<FormProduct>({
        name: '',
        price: '',
        year: '',
        image: ''
    });

    const handlerSetValues = (key: string, value: string) => {
        setFormProduct({ ...formProduct, [key]: value });
    }

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            handlerSetValues('image', result.assets[0].uri);
        }
    };

    const handlerSaveProduct = async () => {
        if (!formProduct.name || !formProduct.price || !formProduct.year || !formProduct.image) {
            return;
        }

        const dbRef = ref(dbRealTime, 'products/');
        const saveProduct = push(dbRef);
        try {
            await set(saveProduct, formProduct);
            setFormProduct({
                name: '',
                price: '',
                year: '',
                image: ''
            });
            loadProducts(); 
        } catch (ex) {
            console.log(ex);
        }
        setShowModalProduct(false);
    }

    return (
        <Portal>
            <Modal visible={showModalProduct} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text style={styles.modalTitle}>Nuevo Producto</Text>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon='close-circle-outline'
                            size={28}
                            onPress={() => setShowModalProduct(false)}
                        />
                    </View>
                </View>
                <Divider />
                <TextInput
                    label='Nombre'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('name', value)}
                    value={formProduct.name}
                    style={styles.input}
                />
                <TextInput
                    label='Precio'
                    mode='outlined'
                    keyboardType='numeric'
                    onChangeText={(value) => handlerSetValues('price', value)}
                    value={formProduct.price}
                    style={styles.input}
                />
                <TextInput
                    label='Año'
                    mode='outlined'
                    keyboardType='numeric'
                    onChangeText={(value) => handlerSetValues('year', value)}
                    value={formProduct.year}
                    style={styles.input}
                />
                <Button mode='contained' onPress={pickImage} style={styles.button}>Seleccionar Imagen</Button>
                {formProduct.image ? <Image source={{ uri: formProduct.image }} style={styles.selectedImage} /> : null}
                <Button mode='contained' onPress={handlerSaveProduct} style={styles.button}>Guardar Producto</Button>
            </Modal>
        </Portal>
    );
}