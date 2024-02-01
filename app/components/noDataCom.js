import {NoData} from "@/app/components/icon/noData";


export default function NoDataCom({}) {
    return (
        <div className={"h-full flex flex-col justify-center items-center"}>
            <NoData/>
            <p className={"mt-5 text-gray-600"}>暂时还没有数据哦</p>
        </div>
    )
};

