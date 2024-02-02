import React from "react";
import {Button} from "@nextui-org/react";
import {HeartIcon} from "@/app/components/icon/HeartIcon";

export default function FavButton({buttonAct=()=>"",isFav}) {
    return (
        <div className="flex gap-4 items-center">
            <Button isIconOnly variant="faded" aria-label="Like" onClick={()=>buttonAct()}>
                <HeartIcon isFav={isFav}/>
            </Button>
        </div>
    );
}
