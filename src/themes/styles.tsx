import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 20,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    productContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    productContent: {
        flex: 1,
        marginLeft: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: 'gray',
    },
    productYear: {
        fontSize: 14,
        color: 'gray',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        marginHorizontal: 5,
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    iconEnd: {
        flexDirection: 'row',
    },
    input: {
        marginVertical: 10,
    },
    selectedImage: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
});