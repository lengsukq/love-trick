import {Input, Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/react";
import {useEffect, useRef} from "react";
import {SearchIcon} from "@/app/components/icon/SearchICon";

export const SearchModal = ({openKey, keyToFalse,searchWords,setSearchWords,onKeyDown,placeholder='请输入任务名称'}) => {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

    const inputRef = useRef(null);
    useEffect(() => {
        if (openKey) {
            onOpen();
            // 在组件挂载时将输入框聚焦
            setTimeout(()=>{
                inputRef.current.focus();
            },200)
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
                                        ref={inputRef}
                                        onChange={(e) => setSearchWords(e.target.value)}
                                        onClear={() => setSearchWords("")}
                                        onKeyDown={onKeyDown}
                                        value={searchWords}
                                        label=""
                                        isClearable
                                        radius="lg"
                                        type="search"
                                        placeholder={placeholder}
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

