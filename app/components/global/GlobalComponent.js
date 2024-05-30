// 全局组件
import {usePathname, useRouter} from "next/navigation";
import {Tab, Tabs} from "@nextui-org/react";
import {TaskListLeftDropdown, TaskListRightDropdown} from "@/app/components/global/taskListDropdown";
import {MyGiftLeftDropdown, MyGiftRightDropdown} from "@/app/components/global/myGiftDropdown";

const LeftComponent = () => {
    // 获取路由信息
    const pathname = usePathname();
    if (pathname === '/trick') {
        return (
            <TaskListLeftDropdown/>
        )
    } else if (pathname === '/trick/gift') {
        return (
            <MyGiftLeftDropdown/>
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
    } else if (pathname === '/trick/gift') {
        return (
            <MyGiftRightDropdown/>
        )
    }
}


const TabsComponent = ({pathname}) => {
    const router = useRouter()
    const toPage = (key) => {
        router.push(key)
    }
    const childToPage = (key) => {
        router.replace(key)

    }
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
    } else if (pathname === '/trick/gift' || pathname === '/trick/gift/addGift' || pathname === '/trick/gift/getList') {
        return (
            <Tabs selectedKey={pathname} key="lg" size="lg" aria-label="Options"
                  onSelectionChange={(e) => childToPage(e)}>
                <Tab key="/trick/gift/getList" title="兑换"/>
                <Tab key="/trick/gift/addGift" title="新增"/>
                <Tab key="/trick/gift" title="货架"/>
            </Tabs>
        );
    } else if (pathname === '/trick/whisper' || pathname === '/trick/whisper/TAWhisper' || pathname === '/trick/whisper/myWhisper') {
        return (
            <Tabs selectedKey={pathname} key="lg" size="lg" aria-label="Options"
                  onSelectionChange={(e) => childToPage(e)}>
                <Tab key="/trick/whisper/TAWhisper" title="TA的"/>
                <Tab key="/trick/whisper" title="发布"/>
                <Tab key="/trick/whisper/myWhisper" title="我的"/>
            </Tabs>
        );
    } else if (pathname === '/trick/favourite/taskList' || pathname === '/trick/favourite/giftList' || pathname === '/trick/favourite/whisperList'){
        return (
            <Tabs selectedKey={pathname} key="lg" size="lg" aria-label="Options"
                  onSelectionChange={(e) => childToPage(e)}>
                <Tab key="/trick/favourite/taskList" title="任务"/>
                <Tab key="/trick/favourite/giftList" title="礼物"/>
                <Tab key="/trick/favourite/whisperList" title="留言"/>
            </Tabs>
        );
    }
}

export function GlobalComponent() {
    // 获取路由信息
    const pathname = usePathname();
    // console.log('pathname', pathname)


    return (
        <div className={"GlobalComponent bg-gradient-to-b from-white to-default-200 flex flex-wrap gap-4 w-full justify-center fixed bottom-0 pb-3 pt-3 z-10 items-center"}>
            <LeftComponent/>
            <TabsComponent pathname={pathname}/>
            <RightComponent/>
        </div>
    );
}
