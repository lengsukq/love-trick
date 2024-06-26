'use client'
import React, {useEffect, useState} from "react";
import {getUserInfo, logoutApi, updateUserInfo, uploadImages} from "@/app/utils/client/apihttp";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";
import {Notify} from "react-vant";
import {useRouter} from "next/navigation";
import UserInfoCard from "@/app/components/userInfoCard";
import ConfirmBox from "@/app/components/confirmBox";
import {clearLocalData} from "@/app/utils/client/dataTools";

export default function App() {
    const [userInfo, setUserInfo] = useState({
        avatar: "",
        describeBySelf: "",
        lover: "",
        registrationTime: "",
        userEmail: "",
        userId: 0,
        username: "",
        score: "",
    })
    useEffect(() => {
        getUserInfoAct().then(r => {
        });
    }, [])
    const getUserInfoAct = async () => {
        await getUserInfo().then(res => {
            setUserInfo(res.data ? res.data : {});
            setDescribeBySelf(res.data.describeBySelf);
            setAvatar(res.data.avatar);
            setUsername(res.data.username)
        })
    }
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('')
    const [describeBySelf, setDescribeBySelf] = useState('')

    const avatarUpload = async (event) => {
        try {
            const file = event.target.files[0];
            await uploadImages({file: file, base64: ""}).then(res => {
                setAvatar(res.data.url)
            });

        } catch (error) {
            console.log('avatarUpload', error)
        }

    }

    const updateUserInfoAct = () => {
        if (isInvalidFn(username) || isInvalidFn(describeBySelf)) {
            return;
        }

        try {
            updateUserInfo({username: username, avatar: avatar, describeBySelf: describeBySelf}).then(res => {
                console.log('updateUserInfo', res.data);
                Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
                if (res.code === 200) {
                    getUserInfoAct().then(r => {
                    });
                    onOpenChange(false);
                }
            });

        } catch (error) {
            console.log('updateUserInfo', error)
        }
    }
    const isInvalidFn = (key) => {
        return key === ""
        // 要注意的是，useMemo 主要用于缓存计算昂贵的值，而不是用于创建验证函数。
        // return React.useMemo(() => {
        //     return key === ""
        // }, [key])
    }
    const router = useRouter()
    const toPage = (key) => {
        router.push(key)
    }
    const loginOutModal = useDisclosure()

    // 退出登录弹框
    const loginOut = () => {
        logoutApi().then(res=>{
            console.log(res);
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
            if (res.code===200){
                clearLocalData();
                router.push(`/`)
            }
        })

    }
    return (
        <div className="p-5">
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="center">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">编辑信息</ModalHeader>
                            <ModalBody>
                                <div className={"w-full flex justify-center"}>
                                    <input type="file" name="file" className={"hidden"} id="upload"
                                           onChange={avatarUpload}/>
                                    <label htmlFor="upload">
                                        <Avatar isBordered src={avatar} className="w-20 h-20 text-large"/>
                                    </label>
                                </div>
                                <Input
                                    isInvalid={isInvalidFn(username)}
                                    color={isInvalidFn(username) ? "danger" : "success"}
                                    errorMessage={isInvalidFn(username) && "请输入昵称"}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoFocus
                                    label="昵称"
                                    placeholder="请输入昵称"
                                    variant="bordered"
                                />
                                <Input
                                    isInvalid={isInvalidFn(describeBySelf)}
                                    color={isInvalidFn(describeBySelf) ? "danger" : "success"}
                                    errorMessage={isInvalidFn(describeBySelf) && "请输入一言"}
                                    value={describeBySelf}
                                    onChange={(e) => setDescribeBySelf(e.target.value)}
                                    label="一言"
                                    placeholder="请输入一言"
                                    variant="bordered"
                                />
                                <div className="flex py-2 px-1 justify-between">
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onClick={onClose}>
                                    取消
                                </Button>
                                <Button color="primary" onClick={updateUserInfoAct}>
                                    提交
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <ConfirmBox
                isOpen={loginOutModal.isOpen}
                onClose={loginOutModal.onClose}
                modalText={"要退出登录吗？"}
                confirmAct={loginOut}
                cancelAct={loginOutModal.onClose}
            ></ConfirmBox>
            <UserInfoCard userInfo={userInfo} onOpen={onOpen} avatarBtn={loginOutModal.onOpen}/>
            <UserInfoCard userInfo={userInfo.loverInfo} isLover={true}/>
            <Card className="">
                <CardBody className="overflow-visible py-2">
                    <div className="mt-3 mb-3">
                        <div className="flex items-center space-x-4 text-large justify-evenly">
                            <div><Chip radius="lg" color="default" variant="dot"
                                       onClick={() => toPage('/trick/gift/getList')}>心意</Chip></div>
                            <Divider className="mx-4" orientation="vertical"/>
                            <div><Chip radius="lg" color="success" variant="dot"
                                       onClick={() => toPage('/trick/whisper/TAWhisper')}>心扉</Chip></div>
                            <Divider className="mx-4" orientation="vertical"/>
                            <div><Chip radius="lg" color="warning" variant="dot"
                                       onClick={() => toPage('/trick/favourite/taskList')}>心欢</Chip></div>
                        </div>
                        <Divider className="my-4"/>
                        <div className="space-y-1 flex justify-center items-center">
                            <h4 className="text-small font-thin">时光的最初，故事开始的地方。</h4>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>


    );
}
