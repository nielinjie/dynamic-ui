import type {Spec} from "@/spec/spec.ts";


export const fake: Spec = {
    "namespace": "test",
    "pages": {
        "personTableAndSheet": {
            "entry": "员工管理/集合",
            "components": {
                "table@_": {
                    "items": [
                        {
                            "dataPath": "/",
                            "element": "rootTable",

                        },
                        {
                            "dataPath": "/[]/id",
                            "element": "text",

                        },
                        {
                            "dataPath": "/[]/name",
                            "element": "text",

                        },
                        {
                            "dataPath": "/[]/age",
                            "element": "text",

                        },
                        {
                            "dataPath": "/[]/address",
                            "element": "popTable",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/address/[]/city",
                            "element": "text",

                        },
                        {
                            "dataPath": "/[]/address/[]/street",
                            "element": "text",

                        },
                        {
                            "dataPath": "/[]/contact",
                            "element": "row",

                        },
                        {
                            "dataPath": "/[]/contact/phone",
                            "element": "text",

                        },
                        {
                            "dataPath": "/[]/contact/email",
                            "element": "text",

                        }
                    ]
                },
                "sheet@detail": {
                    "items": [
                        {
                            "dataPath": "/",
                            "element": "sheet",

                        },
                        {
                            "dataPath": "/id",
                            "element": "input",

                        },
                        {
                            "dataPath": "/name",
                            "element": "input",

                        },
                        {
                            "dataPath": "/age",
                            "element": "input",

                        },
                        {
                            "dataPath": "/address",
                            "element": "multiItemSheet",

                        },
                        {
                            "dataPath": "/address/[]/city",
                            "element": "input",

                        },
                        {
                            "dataPath": "/address/[]/street",
                            "element": "input",

                        },
                        {
                            "dataPath": "/contact",
                            "element": "sheet",

                        },
                        {
                            "dataPath": "/contact/phone",
                            "element": "input",

                        },
                        {
                            "dataPath": "/contact/email",
                            "element": "input",

                        }
                    ]
                }
            }
        }
    }
}