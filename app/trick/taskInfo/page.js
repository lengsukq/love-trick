'use client'
import React, {useEffect, useState} from "react";
import {Button, Card, CardBody, Textarea, useDisclosure} from "@nextui-org/react";
import {addFav, deleteTask, getTaskInfo, upDateTaskState} from "@/app/utils/client/apihttp";
import {useRouter, useSearchParams} from 'next/navigation'
import {Notify} from "react-vant";
import TaskInfoCom from "@/app/components/taskInfo";
import {isInvalidFn} from "@/app/utils/client/dataTools";
import ConfirmBox from "@/app/components/confirmBox";

export default function App() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState('');
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
        taskScore: 0,
        taskStatus: "未开始",
        favId: null,
    })
    const [completeRemarks, setTCompleteRemarks] = useState('')
    const {isOpen, onOpen, onClose} = useDisclosure();
    const notModal = useDisclosure()
    const passModal = useDisclosure()
    const [defaultValue, setDefaultValue] = useState([])
    useEffect(() => {
        getTaskInfoAct(searchParams.get('taskId')).then(r => {
        });
        const {userEmail} = JSON.parse(localStorage.getItem('myUserInfo'));
        setUserEmail(userEmail);
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
    const acceptTask = (actType) => {
        if ((taskInfo.acceptanceTime && isInvalid) && (actType === "complete")) {
            return;
        }
        let params = {
            actType: actType,
            taskId: taskInfo.taskId,
            taskName: taskInfo.taskName
        };
        if (completeRemarks) {
            params['completeRemarks'] = completeRemarks
        }
        passModal.onClose();
        notModal.onClose();
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
    const addFavAct = async () => {
        console.log('addFavAct')
        await addFav({id: taskInfo.taskId, type: 'task'}).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
            if (res.code === 200) {
                getTaskInfoAct(taskInfo.taskId).then(r => {
                });
            }
        })
    }
    const isInvalid = React.useMemo(() => {
        return completeRemarks === ""
    }, [completeRemarks]);
    return (
        <div className="p-5">
            <ConfirmBox
                isOpen={isOpen}
                onClose={onClose}
                modalText={"确认删除吗？"}
                confirmAct={deleteTaskAct}
                cancelAct={onClose}
            ></ConfirmBox>
            <ConfirmBox
                isOpen={notModal.isOpen}
                onClose={notModal.onClose}
                modalText={"确认驳回吗？"}
                confirmAct={() => acceptTask("notPassed")}
                cancelAct={notModal.onClose}
            ></ConfirmBox>
            <ConfirmBox
                isOpen={passModal.isOpen}
                onClose={passModal.onClose}
                modalText={"确认通过吗？"}
                confirmAct={() => acceptTask("pass")}
                cancelAct={passModal.onClose}
            ></ConfirmBox>
            <TaskInfoCom
                favId={taskInfo.favId}
                addFavAct={addFavAct}
                acceptanceTime={taskInfo.acceptanceTime}
                completionTime={taskInfo.completionTime}
                taskDetail={taskInfo.taskDetail}
                taskName={taskInfo.taskName}
                taskReward={taskInfo.taskReward}
                taskStatus={taskInfo.taskStatus}
                defaultValue={defaultValue}
                deleteButton={onOpen}
                taskScore={taskInfo.taskScore}
            ></TaskInfoCom>
            <Card className={userEmail === taskInfo.publisherEmail && !taskInfo.completeRemarks? "hidden" : "mb-5"}>
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
                    <div className={"flex justify-evenly w-full"}>
                        <Button color="primary" className={taskInfo.completionTime ? "hidden" : "w-1/4"}
                                onClick={() => acceptTask(taskInfo.acceptanceTime ? 'complete' : 'accept')}>
                            {taskInfo.acceptanceTime ? '完成' : '接受'}</Button>
                    </div>
                </CardBody>
            </Card>
            <Card
                className={userEmail === taskInfo.publisherEmail && taskInfo.taskStatus === "待核验" ? "mb-5" : "hidden"}>
                <CardBody className="flex justify-center items-center">
                    <div className={"flex justify-evenly w-full"}>
                        <Button color="danger" className={"w-1/4"}
                                onClick={notModal.onOpen}>驳回</Button>
                        <Button color="primary" className={"w-1/4"}
                                onClick={passModal.onOpen}>通过</Button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
