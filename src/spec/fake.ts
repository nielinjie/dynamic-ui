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
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/id",
                            "element": "text",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/name",
                            "element": "text",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/age",
                            "element": "text",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/address",
                            "element": "popTable",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/address/[]/city",
                            "element": "text",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/address/[]/street",
                            "element": "text",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/contact",
                            "element": "contain",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/contact/phone",
                            "element": "text",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/contact/email",
                            "element": "text",
                            "setting": {}
                        }
                    ]
                },
                "sheet@detail": {
                    "items": [
                        {
                            "dataPath": "/",
                            "element": "sheet",
                            "setting": {}
                        },
                        {
                            "dataPath": "/id",
                            "element": "input",
                            "setting": {}
                        },
                        {
                            "dataPath": "/name",
                            "element": "input",
                            "setting": {}
                        },
                        {
                            "dataPath": "/age",
                            "element": "input",
                            "setting": {}
                        },
                        {
                            "dataPath": "/address",
                            "element": "input",
                            "setting": {}
                        },
                        {
                            "dataPath": "/contact",
                            "element": "input",
                            "setting": {}
                        }
                    ]
                }
            }
        }
    }
}