import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

export const ConfirmBox = ({isOpen,onClose,cancelAct,confirmAct,modalText=""}) => {
    return (
        <>
            <Modal
                size="xs"
                placement={"center"}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">提示</ModalHeader>
                            <ModalBody>
                                {modalText}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={cancelAct}>
                                    取消
                                </Button>
                                <Button color="primary" onClick={confirmAct}>
                                    确认
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )

};

