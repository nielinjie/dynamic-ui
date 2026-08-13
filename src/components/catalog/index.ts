import Input from "@/components/Input.vue";
import Card from "@/components/Card.vue";
import Sheet from "@/components/Sheet.vue";
import Row from "@/components/Row.vue";
import Table from "@/components/Table.vue";
import Text from "@/components/Text.vue";
import TableColumn from "@/components/TableColumn.vue";

export const catalog: Record<string, any> = {
    "input": Input,
    "card": Card,
    "sheet": Sheet,
    "row": Row,
    "text": Text,
    "table": Table,
    "column": TableColumn,
}
