import Input from "@/components/Input.vue";
import Sheet from "@/components/Sheet.vue";
import Table from "@/components/Table.vue";
import Text from "@/components/Text.vue";
import Contain from "@/components/Container.vue";
import {h} from "vue";
import RootTable from "@/components/RootTable.vue";
import PopTable from "@/components/PopTable.vue";
import MultiItemSheet from "@/components/MultiItemSheet.vue";
import Container from "@/components/Container.vue";
import DropDown from "@/components/DropDown.vue";

const Col = (props: any, {attrs}: any) => {
    return h(Contain, {...attrs, direction: attrs.direction || 'vertical'});
};

export const catalog: Record<string, any> = {
    "input": Input, //文本输入框，支持修改。
    "sheet": Sheet, // 类似于 form，多个 label/component 对
    "multiItemSheet":MultiItemSheet, //多个 sheet，为 array 准备，有增加、删除支持。
    "text": Text, //文本显示，不能修改。
    "table": Table, //表格，展示多条数据。
    "popTable": PopTable, // 弹出的表格，用于在狭窄处展示多条数据。
    "rootTable": RootTable, //根表格，用于展示多条数据，并有增加、删除支持。TODO，增加 post 修改到后台。
    "container": Container, //简单容器。
    "row": Container, //行容器。
    "col": Col, //列容器。
    "dropdown": DropDown
}
