'use client'
import React from "react";
import {useEffect, useState} from 'react'

import {Tabs, Tab, Button} from "@nextui-org/react";
// import {usePathname} from "next/navigation";
import {useRouter, usePathname} from 'next/navigation'

// 全局组件
const GlobalComponent = () => {
    const router = useRouter()
    // 获取路由信息
    const pathname = usePathname();
    console.log('pathname',pathname)
    const toPage = (key) => {
        console.log('toPage', key)
        // const pathObj = {
        //     "home": "/trick",
        //     "postTask": "/trick/postTask",
        //     "myInfo": "/trick/myInfo"
        // }
        router.push(key)

    }
    // 只在路由为 "/trick" 时显示组件
    if (pathname === '/trick' || pathname === '/trick/postTask' || pathname === '/trick/myInfo') {
        return (
            <div className="GlobalComponent flex flex-wrap gap-4 w-full justify-center fixed bottom-10 z-10">
                <Tabs selectedKey={pathname} key="lg" size="lg" aria-label="Options" onSelectionChange={(e) => toPage(e)}>
                    <Tab key="/trick" title="首页"/>
                    <Tab key="/trick/postTask" title="发布"/>
                    <Tab key="/trick/myInfo" title="我的"/>
                </Tabs>
            </div>
        );
    }

    // 在其他路由下不显示组件
    return null;
};

export function TrickProviders({children}) {
    return (
        <div className="h-lvh">
            {children}
            <GlobalComponent />
        </div>


    );
}
