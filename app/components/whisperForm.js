import {Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea,} from "@nextui-org/react";
import React, {useState} from "react";
import {isInvalidFn} from "@/app/utils/client/dataTools";
import {addWhisper} from "@/app/utils/client/apihttp";
import {Notify} from "react-vant";

export const WhisperForm = ({}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const addWhisperAct = () => {
        let params = {title,content};
        if (isInvalidFn(params)) {
            return;
        }
        addWhisper(params).then(res => {
            Notify.show({type: res.code === 200 ? 'success' : 'warning', message: `${res.msg}`})
        })
    }
    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Input value={title}
                       onChange={(e) => setTitle(e.target.value)}
                       type="text" label="留言标题"/>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    label="Description"
                    placeholder="Enter your description"
                    className=""
                />
            </CardBody>
            <CardFooter className={"flex justify-center"}>
                <Button color="primary" onClick={addWhisperAct}>
                    发布
                </Button>
            </CardFooter>
        </Card>
    )


};

