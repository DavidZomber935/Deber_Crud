import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { styles } from '../themes/styles';
import { ref, onValue, remove } from 'firebase/database';
import { dbRealTime } from '../configs/firebaseConfig';
import { NewProductModal } from '../components/NewProductModal';
import { UpdateProductModal } from '../components/UpdateProductModal'; // Nuevo import

interface Product {
    id: string;
    name: string;
    price: string;
    year: string;
    image: string;
}

export const HomeScreen = () => {
    const [showModalProduct, setShowModalProduct] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const loadProducts = () => {
        const dbRef = ref(dbRealTime, 'products/');
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            const loadedProducts: Product[] = [];
            if (data) {
                Object.keys(data).forEach(key => {
                    loadedProducts.push({
                        id: key,
                        ...data[key]
                    });
                });
            }
            setProducts(loadedProducts);
        });
    }

    const handleDeleteProduct = (productId: string) => {
        const dbRef = ref(dbRealTime, `products/${productId}`);
        remove(dbRef)
            .then(() => {
                loadProducts(); // Reload products after deletion
            })
            .catch((error) => {
                console.error("Error deleting product: ", error);
            });
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <ImageBackground source={require('../images/background.jpg')} style={styles.backgroundImage}>
            <View style={styles.root}>
                <Text style={[styles.title, { marginTop: 10 }]}>Productos Yu-Gi-Oh!</Text>
                <Button mode="contained" onPress={() => setShowModalProduct(true)}>Agregar Producto</Button>
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.productContainer}>
                            <Image source={{ uri: item.image }} style={styles.productImage} />
                            <View style={styles.productContent}>
                                <Text style={styles.productName}>Nombre:</Text>
                                <Text style={styles.productName}>{item.name}</Text>
                                <Text style={styles.productPrice}>Precio:</Text>
                                <Text style={styles.productPrice}>{item.price}</Text>
                                <Text style={styles.productYear}>Año:</Text>
                                <Text style={styles.productYear}>{item.year}</Text>
                            </View>
                            <View style={styles.actionButtons}>
                                <Button mode="contained" onPress={() => {
                                    setSelectedProduct(item);
                                    setShowUpdateModal(true);
                                }}>Actualizar</Button>
                                <Button mode="contained" onPress={() => handleDeleteProduct(item.id)}>Eliminar</Button>
                            </View>
                        </View>
                    )}
                    contentContainerStyle={{ flexGrow: 1, marginTop: 10 }}
                />
                <NewProductModal 
                    showModalProduct={showModalProduct} 
                    setShowModalProduct={setShowModalProduct} 
                    loadProducts={loadProducts}
                />
                <UpdateProductModal
                    showUpdateModal={showUpdateModal}
                    setShowUpdateModal={setShowUpdateModal}
                    loadProducts={loadProducts}
                    product={selectedProduct}
                />
            </View>
        </ImageBackground>
    );
}