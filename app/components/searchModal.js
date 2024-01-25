import {Input, Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/react";
import {useEffect} from "react";
import {SearchIcon} from "@/app/components/icon/SearchICon";

export const SearchModal = ({openKey, keyToFalse,searchWords,setSearchWords,onKeyDown}) => {
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
                classNames={{
                    body: "p-0",
                    wrapper:"mt-5"
                }}
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
                                    <Input
                                        onChange={(e) => setSearchWords(e.target.value)}
                                        onClear={() => setSearchWords("")}
                                        onKeyDown={onKeyDown}
                                        value={searchWords}
                                        label=""
                                        isClearable
                                        radius="lg"
                                        type="search"
                                        placeholder="请输入任务名"
                                        startContent={
                                            <SearchIcon className="" />
                                        }
                                    />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )

};

