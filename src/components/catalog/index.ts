import Input from "@/components/Input.vue";
import Card from "@/components/Card.vue";
import Sheet from "@/components/Sheet.vue";
import Table from "@/components/Table.vue";
import Text from "@/components/Text.vue";
import Contain from "@/components/Contain.vue";
import {h} from "vue";
import RootTable from "@/components/RootTable.vue";
import PopTable from "@/components/PopTable.vue";
import MultiItemSheet from "@/components/MultiItemSheet.vue";

const Col = (props: any, {attrs}: any) => {
    return h(Contain, {...attrs, direction: attrs.direction || 'vertical'});
};

export const catalog: Record<string, any> = {
    "input": Input,
    "card": Card,
    "sheet": Sheet,
    "multiItemSheet":MultiItemSheet,
    "text": Text,
    "table": Table,
    "popTable": PopTable,
    "rootTable": RootTable,
    "contain": Contain,
    "row": Contain,
    "col": Col
}
