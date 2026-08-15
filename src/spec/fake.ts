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
                            "element": "table",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/id",
                            "element": "column",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/name",
                            "element": "column",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/age",
                            "element": "column",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/address",
                            "element": "column",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/contact",
                            "element": "column",
                            "setting": {}
                        }
                    ]
                },
                "sheet@selected": {
                    "items": [
                        {
                            "dataPath": "/",
                            "element": "sheet",
                            "setting": {}
                        },
                        {
                            "dataPath": "/id",
                            "element": "row",
                            "setting": {}
                        },
                        {
                            "dataPath": "/name",
                            "element": "row",
                            "setting": {}
                        },
                        {
                            "dataPath": "/age",
                            "element": "row",
                            "setting": {}
                        },
                        {
                            "dataPath": "/address",
                            "element": "row",
                            "setting": {}
                        },
                        {
                            "dataPath": "/contact",
                            "element": "row",
                            "setting": {}
                        }
                    ]
                }
            }
        }
    }
}