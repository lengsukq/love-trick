'use client'
import React from "react";

import {Tab, Tabs} from "@nextui-org/react";
// import {usePathname} from "next/navigation";
import {usePathname, useRouter} from 'next/navigation'
import TaskListDropdown from "@/app/components/global/taskListDropdown";
import { Suspense } from 'react'

const LeftComponent = () => {
    // 获取路由信息
    const pathname = usePathname();
    if (pathname === '/trick') {
        return (
            <TaskListDropdown/>
        )
    }
}

// 全局组件
const GlobalComponent = () => {
    const router = useRouter()
    // 获取路由信息
    const pathname = usePathname();
    console.log('pathname', pathname)
    const toPage = (key) => {
        console.log('toPage', key)
        router.push(key)
    }
    // 只在路由为 "/trick" 时显示组件
    if (pathname === '/trick' || pathname === '/trick/postTask' || pathname === '/trick/myInfo') {
        return (
            <div
                className="GlobalComponent bg-gradient-to-b from-white to-default-200 flex flex-wrap gap-4 w-full justify-center fixed bottom-0 pb-3 pt-3 z-10 items-center">
                <LeftComponent/>
                <Tabs selectedKey={pathname} key="lg" size="lg" aria-label="Options"
                      onSelectionChange={(e) => toPage(e)}>
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
        <Suspense>
        <div className="h-lvh">
                <div className={"pb-16"}>{children}</div>
                <GlobalComponent/>
        </div>
        </Suspense>

    );
}
