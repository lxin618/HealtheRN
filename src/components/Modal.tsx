import Modal from 'react-native-modal';

export const ModalWrapper = ({ isVisible, children, onClose, options }: any) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            onBackButtonPress={onClose}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            avoidKeyboard="true"
            propagateSwipe="true"
            swipeDirection={['down', 'up', 'left', 'right']}
            style={{ margin: 0, justifyContent: 'flex-end' }}
            {...options}
        >
            {children}
        </Modal>
    );
};
