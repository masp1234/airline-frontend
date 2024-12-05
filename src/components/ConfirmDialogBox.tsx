import {
Button,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
} from "@chakra-ui/react";

interface ConfirmDialogBoxProps {
    header: string;
    description: string;
    confirmButtonText?: string;
    closeButtonText?: string;
    confirmIsLoading: boolean;
    isOpen: boolean;
    onClose: () => void;
    handleConfirmClick: () => void;
}

const ConfirmDialogBox = ({
    header,
    description,
    confirmButtonText = "Confirm",
    closeButtonText = "Close",
    confirmIsLoading,
    isOpen,
    onClose,
    handleConfirmClick,
}: ConfirmDialogBoxProps) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{header}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            {description}
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={handleConfirmClick} isLoading={confirmIsLoading}>
                {confirmButtonText}
                </Button>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                {closeButtonText}
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        
    )
}

export default ConfirmDialogBox;



