'use client'
import React, {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardBody,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure
} from "@nextui-org/react";
import {deleteTask, getTaskInfo, upDateTaskState} from "@/app/utils/apihttp";
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {Notify} from "react-vant";


export default function App() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [taskInfo, setTaskInfo] = useState({
        acceptanceTime: '',
        completeRemarks: '',
        completionTime: '',
        creationTime: "",
        publisherEmail: "",
        publisherName: "",
        receiverEmail: '',
        taskDetail: "",
        taskId: '',
        taskImage: [],
        taskName: "",
        taskReward: "",
        taskStatus: "未开始"
    })
    const [completeRemarks, setTCompleteRemarks] = useState('')
    const {isOpen, onOpen, onClose} = useDisclosure();
    useEffect(() => {
        getTaskInfoAct(searchParams.get('taskId')).then(r => {
        });
    }, [])
    const getTaskInfoAct = async (taskId) => {
        await getTaskInfo({taskId: taskId}).then(res => {
            setTaskInfo(res.data);
            setTCompleteRemarks(res.data.completeRemarks)
        })
    }
    const acceptTask = () => {
        if (taskInfo.acceptanceTime && isInvalid){
            return;
        }
        let params = {
            actType: taskInfo.acceptanceTime ? "complete" : 'accept',
            taskId: taskInfo.taskId,
        };
        if (completeRemarks) {
            params['completeRemarks'] = completeRemarks
        }

        upDateTaskState(params).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
            if (res.code === 200) {
                getTaskInfoAct(taskInfo.taskId).then(r => {
                });
            }
        })
    }
    const deleteTaskAct = () => {
        onClose();
        deleteTask({taskId: taskInfo.taskId}).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
            if (res.code === 200) {
                router.back();
            }
        })
    }
    const isInvalid = React.useMemo(() => {
        return completeRemarks === ""
    }, [completeRemarks]);
    return (
        <div className="p-5">
            <Modal
                size="xs"
                placement={"center"}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">提示</ModalHeader>
                            <ModalBody>
                                确认删除吗？
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button color="primary" onPress={deleteTaskAct}>
                                    确认
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Card className="mb-5">
                <CardBody className="flex justify-center">
                    <p>{taskInfo.taskStatus}</p>
                </CardBody>
            </Card>
            <Card className="mb-5">
                <CardBody className="flex justify-center">
                    <Input type="text" isDisabled
                           labelPlacement="outside"
                           label="任务名称"
                           placeholder="请输入任务名称"
                           value={taskInfo.taskName}
                           className="mb-5"/>
                    <Textarea
                        isDisabled
                        label="任务描述"
                        labelPlacement="outside"
                        placeholder="请输入任务描述"
                        className="mb-5"
                        value={taskInfo.taskDetail}
                    />
                    <Textarea
                        isDisabled
                        label="任务奖励"
                        labelPlacement="outside"
                        placeholder="请输入任务奖励"
                        className="mb-5"
                        value={taskInfo.taskReward}
                    />
                </CardBody>
            </Card>

            <Card className="mb-5">
                <CardBody className="flex justify-center items-center">
                    <Textarea
                        isInvalid={isInvalid}
                        color={isInvalid ? "danger" : "success"}
                        errorMessage={isInvalid && "请输入完成备注"}
                        isDisabled={taskInfo.completionTime}
                        onChange={(e) => setTCompleteRemarks(e.target.value)}
                        label="完成备注"
                        labelPlacement="outside"
                        placeholder="请输入完成备注"
                        className={taskInfo.acceptanceTime ? "mb-5" : "hidden"}
                        value={completeRemarks}
                    />
                    <div className="flex justify-evenly w-full">
                        <Button color="danger" className={"w-1/4"}
                                onClick={() => onOpen()}>删除</Button>
                        <Button color="primary" className={taskInfo.completionTime ? "hidden" : "w-1/4"}
                                onClick={() => acceptTask()}>
                            {taskInfo.acceptanceTime ? '完成' : '接受'}</Button>
                    </div>


                </CardBody>
            </Card>
        </div>

    );
}
