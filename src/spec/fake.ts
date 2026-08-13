import type {Spec} from "@/spec/spec.ts";


export const fake: Spec = {
    "namespace": "test",
    "pages": {
        "personTableAndSheet": {
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
                            "element": "text",
                            "setting": {"prop": "id"}
                        },
                        {
                            "dataPath": "/[]/name",
                            "element": "text",
                            "setting": {"prop": "name"}
                        },
                        {
                            "dataPath": "/[]/age",
                            "element": "text",
                            "setting": {"prop": "age"}
                        },
                        {
                            "dataPath": "/[]/address",
                            "element": "row",
                            "setting": {"prop": "address", "label": "Address"}
                        },
                        {
                            "dataPath": "/[]/address/city",
                            "element": "text",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/address/street",
                            "element": "text",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/contact",
                            "element": "text",
                            "setting": {"prop": "contact"}
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
                            "element": "text",
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