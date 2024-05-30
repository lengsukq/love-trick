import { useEffect, useRef } from 'react';

const useScrollTrigger = (callback, triggerPixels = 100) => {
    const timeoutIdRef = useRef(null); // 用于存储setTimeout的ID

    useEffect(() => {
        const handleScroll = () => {
            // 清除上一次的setTimeout
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }

            // 设置新的setTimeout
            timeoutIdRef.current = setTimeout(() => {
                // 检查是否滚动到距离底部triggerPixels的位置
                const scrollHeight = document.documentElement.scrollHeight;
                const currentHeight = window.innerHeight + window.pageYOffset;
                if (scrollHeight - currentHeight <= triggerPixels) {
                    callback();
                }
            }, 500); // 500毫秒的节流间隔
        };

        // 添加滚动事件监听
        window.addEventListener('scroll', handleScroll);

        // 组件卸载时清除事件监听
        return () => {
            window.removeEventListener('scroll', handleScroll);
            // 清除可能仍在等待的setTimeout
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, [callback, triggerPixels]);
};

export default useScrollTrigger;