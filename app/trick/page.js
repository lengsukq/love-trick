import React from "react";
import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";

export default function App() {
    const list = [
        {
            title: "Orange",
            img: "https://picss.sunbangyan.cn/2023/12/31/f30dfa2fec1f3fe21f919c78eb6ee987.jpeg",
            price: "$5.50",
        },
        {
            title: "Tangerine",
            img: "https://picss.sunbangyan.cn/2023/12/31/f30dfa2fec1f3fe21f919c78eb6ee987.jpeg",
            price: "$3.00",
        },
        {
            title: "Raspberry",
            img: "https://picss.sunbangyan.cn/2023/12/31/f30dfa2fec1f3fe21f919c78eb6ee987.jpeg",
            price: "$10.00",
        },
        {
            title: "Lemon",
            img: "https://picss.sunbangyan.cn/2023/12/31/f30dfa2fec1f3fe21f919c78eb6ee987.jpeg",
            price: "$5.30",
        },
        {
            title: "Avocado",
            img: "https://picss.sunbangyan.cn/2023/12/31/f30dfa2fec1f3fe21f919c78eb6ee987.jpeg",
            price: "$15.70",
        },
        {
            title: "Lemon 2",
            img: "https://picss.sunbangyan.cn/2023/12/31/f30dfa2fec1f3fe21f919c78eb6ee987.jpeg",
            price: "$8.00",
        },
        {
            title: "Banana",
            img: "https://picss.sunbangyan.cn/2023/12/31/f30dfa2fec1f3fe21f919c78eb6ee987.jpeg",
            price: "$7.50",
        },
        {
            title: "Watermelon",
            img: "https://picss.sunbangyan.cn/2023/12/31/f30dfa2fec1f3fe21f919c78eb6ee987.jpeg",
            price: "$12.20",
        },
    ];
    const onPressHandler = () => {
        console.log("item pressed")
    }
    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-5">
            {list.map((item, index) => (
                <Card shadow="sm" key={index} isPressable>
                    <CardBody className="overflow-visible p-0">
                        <Image
                            shadow="sm"
                            radius="lg"
                            width="100%"
                            alt={item.title}
                            className="w-full object-cover h-[140px]"
                            src={item.img}
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <b>{item.title}</b>
                        <p className="text-default-500">{item.price}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
