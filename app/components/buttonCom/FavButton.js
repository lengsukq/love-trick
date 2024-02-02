import React from "react";
import {Button} from "@nextui-org/react";
import {HeartIcon} from "@/app/components/icon/HeartIcon";

export default function FavButton() {
    return (
        <div className="flex gap-4 items-center">
            <Button isIconOnly color="danger" aria-label="Like">
                <HeartIcon />
            </Button>
        </div>
    );
}
