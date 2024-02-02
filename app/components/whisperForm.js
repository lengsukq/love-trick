import {Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea,} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import {isInvalidFn} from "@/app/utils/client/dataTools";
import {addWhisper} from "@/app/utils/client/apihttp";
import {Notify} from "react-vant";
import FavButton from "@/app/components/buttonCom/FavButton";

export default function WhisperForm({item = null,addFavAct= () => ""}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    useEffect(() => {
        if (item) {
            setTitle(item.title)
            setContent(item.content)
        }

    }, [item])
    const addWhisperAct = () => {
        let params = {title, content};
        if (isInvalidFn(params)) {
            return;
        }
        addWhisper(params).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
        })
    }
    const FooterLeftCom = () => {
        if (item) {
            return (
                <>
                    <div className={"gap-1 pl-1 pb-0"}>
                        <p className=" text-default-400 text-small">{item.userName}发布于</p>
                        <p className="font-semibold text-default-400 text-small">{item.creationTime}</p>
                    </div>
                    <FavButton isFav={item.favId} btnSize={'sm'} iconSize={18} buttonAct={()=>addFavAct(item)}/>
                </>
            )
        } else {
            return (<Button color="primary" onClick={addWhisperAct}>发布</Button>)
        }

    }
    return (
        <Card className="py-4 mb-5">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Input
                    isInvalid={isInvalidFn(title)}
                    color={item ? "" : (isInvalidFn(title) ? "danger" : "success")}
                    errorMessage={isInvalidFn(title) && "请输入留言标题"}
                    disabled={item}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" label="留言标题"/>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Textarea
                    isInvalid={isInvalidFn(content)}
                    color={item ? "" : (isInvalidFn(content) ? "danger" : "success")}
                    errorMessage={isInvalidFn(content) && "请输入留言内容"}
                    disabled={item}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    label="留言内容"
                    className="pl-1 pr-1"
                />
            </CardBody>
            <CardFooter className={item ? "gap-3 flex justify-between" : "flex justify-center"}>
            <FooterLeftCom/>
            </CardFooter>
        </Card>
    )


};

