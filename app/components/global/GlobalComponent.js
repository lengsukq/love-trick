// 全局组件
import { usePathname, useRouter } from "next/navigation";
import { Tab, Tabs } from "@nextui-org/react";
import { TaskListLeftDropdown, TaskListRightDropdown } from "@/app/components/global/taskListDropdown";
import { MyGiftLeftDropdown, MyGiftRightDropdown } from "@/app/components/global/myGiftDropdown";

const LeftComponent = () => {
    const pathname = usePathname();
    const leftComponents = {
        '/trick': <TaskListLeftDropdown />,
        '/trick/gift': <MyGiftLeftDropdown />,
    };
    return leftComponents[pathname] || null;
};

const RightComponent = () => {
    const pathname = usePathname();
    const rightComponents = {
        '/trick': <TaskListRightDropdown />,
        '/trick/gift': <MyGiftRightDropdown />,
    };
    return rightComponents[pathname] || null;
};

const TabsComponent = ({ pathname }) => {
    const router = useRouter();
    const toPage = (key) => router.push(key);
    const childToPage = (key) => router.replace(key);

    const tabsConfig = [
        {
            paths: ['/trick', '/trick/postTask', '/trick/myInfo'],
            tabs: [
                { key: '/trick', title: '首页' },
                { key: '/trick/postTask', title: '发布' },
                { key: '/trick/myInfo', title: '我的' },
            ],
            onSelectionChange: toPage,
        },
        {
            paths: ['/trick/gift', '/trick/gift/addGift', '/trick/gift/getList'],
            tabs: [
                { key: '/trick/gift/getList', title: '兑换' },
                { key: '/trick/gift/addGift', title: '新增' },
                { key: '/trick/gift', title: '货架' },
            ],
            onSelectionChange: childToPage,
        },
        {
            paths: ['/trick/whisper', '/trick/whisper/TAWhisper', '/trick/whisper/myWhisper'],
            tabs: [
                { key: '/trick/whisper/TAWhisper', title: 'TA的' },
                { key: '/trick/whisper', title: '发布' },
                { key: '/trick/whisper/myWhisper', title: '我的' },
            ],
            onSelectionChange: childToPage,
        },
        {
            paths: ['/trick/favourite/taskList', '/trick/favourite/giftList', '/trick/favourite/whisperList'],
            tabs: [
                { key: '/trick/favourite/taskList', title: '任务' },
                { key: '/trick/favourite/giftList', title: '礼物' },
                { key: '/trick/favourite/whisperList', title: '留言' },
            ],
            onSelectionChange: childToPage,
        },
    ];

    const config = tabsConfig.find(config => config.paths.includes(pathname));

    if (!config) return null;

    return (
        <Tabs
            selectedKey={pathname}
            key="lg"
            size="lg"
            aria-label="Options"
            onSelectionChange={config.onSelectionChange}
        >
            {config.tabs.map(tab => (
                <Tab key={tab.key} title={tab.title} />
            ))}
        </Tabs>
    );
};

export function GlobalComponent() {
    const pathname = usePathname();

    return (
        <div className="GlobalComponent bg-gradient-to-b from-white to-default-200 flex flex-wrap gap-4 w-full justify-center fixed bottom-0 pb-3 pt-3 z-10 items-center">
            <LeftComponent />
            <TabsComponent pathname={pathname} />
            <RightComponent />
        </div>
    );
}