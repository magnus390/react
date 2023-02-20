import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Button,
} from "@chakra-ui/react";
import Cart from "../cart/index";
const ModalComponent = ({ onOpen, isOpen, onClose }: any) => {
    return (
        <>
            <Modal blockScrollOnMount={false} size='full' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cart</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Cart />
                    </ModalBody>

                    {/* <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalComponent;