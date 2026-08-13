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
                            componentPath: "/",
                            "element": "table",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/id",
                            componentPath: "/id",
                            "element": "text",
                            "setting": {"prop": "id"}
                        },
                        {
                            "dataPath": "/[]/name",
                            "componentPath": "/name",
                            "element": "text",
                            "setting": {"prop": "name"}
                        },
                        {
                            "dataPath": "/[]/age",
                            componentPath: "/age",
                            "element": "text",
                            "setting": {"prop": "age"}
                        },
                        {
                            "dataPath": "/[]/address",
                            componentPath: "/address",
                            "element": "card",
                            "setting": {"prop": "address", "label": "Address"}
                        },
                        {
                            "dataPath": "/[]/address/city",
                            "componentPath": "/address/city",
                            "element": "text",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/address/street",
                            "componentPath": "/address/street",
                            "element": "text",
                            "setting": {}
                        },
                        {
                            "dataPath": "/[]/contact",
                            "componentPath": "/contact",
                            "element": "text",
                            "setting": {"prop": "contact"}
                        }
                    ]
                },
                "sheet@selected": {
                    "items": [
                        {
                            "dataPath": "/",
                            "componentPath": "/",
                            "element": "sheet",
                            "setting": {}
                        },
                        {
                            "dataPath": "/id",
                            "componentPath": "/id",
                            "element": "row",
                            "setting": {}
                        },
                        {
                            "dataPath": "/name",
                            "componentPath": "/name",
                            "element": "row",
                            "setting": {}
                        },
                        {
                            "dataPath": "/age",
                            "componentPath": "/age",
                            "element": "row",
                            "setting": {}
                        },
                        {
                            "dataPath": "/address",
                            "componentPath": "/address",
                            "element": "row",
                            "setting": {}
                        },
                        {
                            "dataPath": "/contact",
                            "componentPath": "/contact",
                            "element": "row",
                            "setting": {}
                        }
                    ]
                }
            }
        }
    }
}