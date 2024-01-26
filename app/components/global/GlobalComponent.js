// 全局组件
import {usePathname, useRouter} from "next/navigation";
import {Tab, Tabs} from "@nextui-org/react";
import {TaskListLeftDropdown, TaskListRightDropdown} from "@/app/components/global/taskListDropdown";
import React from "react";

const LeftComponent = () => {
    // 获取路由信息
    const pathname = usePathname();
    if (pathname === '/trick') {
        return (
            <TaskListLeftDropdown/>
        )
    }
}
const RightComponent = () => {
    // 获取路由信息
    const pathname = usePathname();
    if (pathname === '/trick') {
        return (
            <TaskListRightDropdown/>
        )
    }
}


const TabsComponent = ({pathname, toPage}) => {
    // 只在路由为 "/trick" 时显示组件
    if (pathname === '/trick' || pathname === '/trick/postTask' || pathname === '/trick/myInfo') {
        return (
            <Tabs selectedKey={pathname} key="lg" size="lg" aria-label="Options"
                  onSelectionChange={(e) => toPage(e)}>
                <Tab key="/trick" title="首页"/>
                <Tab key="/trick/postTask" title="发布"/>
                <Tab key="/trick/myInfo" title="我的"/>
            </Tabs>
        );
    }else if(pathname === '/trick/gift'){
        return (
            <Tabs selectedKey={pathname} key="lg" size="lg" aria-label="Options"
                  onSelectionChange={(e) => toPage(e)}>
                <Tab key="/trick" title="兑换"/>
                <Tab key="/trick/postTask" title="新增"/>
                <Tab key="/trick/gift" title="货架"/>
            </Tabs>
        );
    }
}

export function GlobalComponent() {
    const router = useRouter()
    const toPage = (key) => {
        router.push(key)
    }
    // 获取路由信息
    const pathname = usePathname();
    console.log('pathname', pathname)


    return (
        <div
            className="GlobalComponent bg-gradient-to-b from-white to-default-200 flex flex-wrap gap-4 w-full justify-center fixed bottom-0 pb-3 pt-3 z-10 items-center">
            <LeftComponent/>
            <TabsComponent pathname={pathname} toPage={toPage}/>
            <RightComponent/>
        </div>
    );
}
