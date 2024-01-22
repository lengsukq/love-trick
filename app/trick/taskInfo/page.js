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
import {useRouter, useSearchParams} from 'next/navigation'
import {Notify, Uploader} from "react-vant";
import TaskInfoCom from "@/app/components/taskInfo";
import {isInvalidFn} from "@/app/utils/formValidation";

export default function App() {
    const router = useRouter()
    const searchParams = useSearchParams();
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
    const [defaultValue, setDefaultValue] = useState([])
    useEffect(() => {
        getTaskInfoAct(searchParams.get('taskId')).then(r => {
        });
    }, [])
    const getTaskInfoAct = async (taskId) => {
        await getTaskInfo({taskId: taskId}).then(res => {
            setTaskInfo(res.data);
            setTCompleteRemarks(res.data.completeRemarks);
            let arr = res.data.taskImage.map(item => ({url: item}))
            console.log('获取图片数组', arr)
            setDefaultValue(arr)
        })
    }
    const acceptTask = () => {
        if (taskInfo.acceptanceTime && isInvalid) {
            return;
        }
        let params = {
            actType: taskInfo.acceptanceTime ? "complete" : 'accept',
            taskId: taskInfo.taskId,
            taskName: taskInfo.taskName
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
                onClose={onClose}>
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

            <TaskInfoCom
                acceptanceTime={taskInfo.acceptanceTime}
                completeRemarks={completeRemarks}
                completionTime={taskInfo.completionTime}
                taskDetail={taskInfo.taskDetail}
                taskName={taskInfo.taskName}
                taskReward={taskInfo.taskReward}
                taskStatus={taskInfo.taskStatus}
                defaultValue={defaultValue}
                setTCompleteRemarks={setTCompleteRemarks}
                onOpen={onOpen}
                acceptTask={acceptTask}
            ></TaskInfoCom>
            <Card className={"mb-5"}>
                <CardBody className="flex justify-center items-center">
                    <Textarea
                        isInvalid={isInvalidFn(taskInfo.completeRemarks)}
                        color={isInvalidFn(completeRemarks) ? "danger" : "success"}
                        errorMessage={isInvalidFn(completeRemarks) && "请输入完成备注"}
                        isDisabled={taskInfo.completeRemarks}
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
