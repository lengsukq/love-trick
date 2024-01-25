import {Input, Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/react";
import {useEffect} from "react";

export const SearchModal = ({openKey, keyToFalse}) => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    useEffect(() => {
        if (openKey) {
            onOpen();
        } else {
            onClose();
        }
    }, [openKey])

    return (
        <>
            <Modal
                size="xs"
                hideCloseButton={true}
                placement={"top"}
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={keyToFalse}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <Input type="text" label="任务名"/>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )

};

