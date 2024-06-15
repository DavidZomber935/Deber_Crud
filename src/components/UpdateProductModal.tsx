import React, { useState, useEffect } from 'react';
import { Modal, Portal, Text, IconButton, Divider, TextInput, Button } from 'react-native-paper';
import { styles } from '../themes/styles';
import { View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, set } from 'firebase/database';
import { dbRealTime } from '../configs/firebaseConfig';

interface Props {
    showUpdateModal: boolean;
    setShowUpdateModal: (visible: boolean) => void;
    loadProducts: () => void;
    product: Product | null;
}

interface Product {
    id: string;
    name: string;
    price: string;
    year: string;
    image: string;
}

export const UpdateProductModal = ({ showUpdateModal, setShowUpdateModal, loadProducts, product }: Props) => {
    const [formProduct, setFormProduct] = useState<Product>({
        id: '',
        name: '',
        price: '',
        year: '',
        image: ''
    });

    useEffect(() => {
        if (product) {
            setFormProduct(product);
        }
    }, [product]);

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

    const handlerUpdateProduct = async () => {
        if (!formProduct.name || !formProduct.price || !formProduct.year || !formProduct.image) {
            return;
        }

        const dbRef = ref(dbRealTime, `products/${formProduct.id}`);
        try {
            await set(dbRef, formProduct);
            setFormProduct({
                id: '',
                name: '',
                price: '',
                year: '',
                image: ''
            });
            loadProducts(); 
        } catch (ex) {
            console.log(ex);
        }
        setShowUpdateModal(false);
    }

    return (
        <Portal>
            <Modal visible={showUpdateModal} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text style={styles.modalTitle}>Actualizar Producto</Text>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon='close-circle-outline'
                            size={28}
                            onPress={() => setShowUpdateModal(false)}
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
                {formProduct.image && (
                    <Image source={{ uri: formProduct.image }} style={styles.selectedImage} />
                )}
                <Button mode='contained' onPress={handlerUpdateProduct} style={styles.button}>Actualizar Producto</Button>
            </Modal>
        </Portal>
    );
}