import Input from "@/components/Input.vue";
import Card from "@/components/Card.vue";
import Sheet from "@/components/Sheet.vue";
import Row from "@/components/Row.vue";
import Table from "@/components/Table.vue";
import TableColumn from "@/components/TableColumn.vue";

export const catalog: Record<string, any> = {
    "input": Input,
    "card": Card,
    "sheet": Sheet,
    "row": Row,
    "table": Table,
    "column": TableColumn,
}
