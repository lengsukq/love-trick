'use client'
import React from "react";
import {Tabs, Tab, Button} from "@nextui-org/react";
import {useRouter} from 'next/navigation'

export function TrickProviders({children}) {
    const router = useRouter()

    const toPage = (key) => {
        console.log('toPage', key)
        const pathObj = {
            "home": "/trick",
            "postTask": "/trick/postTask",
            "myInfo": "/trick/myInfo"
        }
        router.push(pathObj[key])

    }
    return (
        <div className="h-lvh">
            {children}
            <div className="flex flex-wrap gap-4 w-full justify-center fixed bottom-10 z-10000">
                <Tabs key="lg" size="lg" aria-label="Tabs sizes" onSelectionChange={(e) => toPage(e)}>
                    <Tab key="home" title="首页"/>
                    <Tab key="postTask" title="发布"/>
                    <Tab key="myInfo" title="我的"/>
                </Tabs>
            </div>
        </div>


    );
}
