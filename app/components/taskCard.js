import {Card, CardBody, CardFooter, CardHeader, Image,} from "@nextui-org/react";
import React from "react";

export default function TaskCard ({item,checkDetails}) {
        return (
            <>
                <Card shadow="sm" key={item.taskId} isPressable onClick={() => checkDetails(item)}>
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className=" text-large uppercase font-bold truncate w-full">{item.taskName}</p>
                        <small className="text-default-500">{item.creationTime}</small>
                        {/*<h4 className="font-bold text-tiny ">Frontend Radio</h4>*/}
                    </CardHeader>
                    <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.taskName}
                            className="w-full object-cover h-[140px]"
                            src={item.taskImage[0]}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{item.publisherName}</b>
                        <p className="text-default-500">{item.taskStatus}</p>
                    </CardFooter>
                </Card>
            </>
        )

};

