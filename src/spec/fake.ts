import type {Spec} from "@/spec/spec.ts";


export const fake: Spec = {
    "namespace": "test",
    "pages": {
        "personSheetView": {
            "components": {
                "sheet@_": {
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
        },
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
                            "dataPath": "/id",
                            "element": "column",
                            "setting": {"prop":"id"}
                        },
                        {
                            "dataPath": "/name",
                            "element": "column",
                            "setting": {"prop":"name"}
                        },
                        {
                            "dataPath": "/age",
                            "element": "column",
                            "setting": {"prop":"age"}
                        },
                        {
                            "dataPath": "/address",
                            "element": "column",
                            "setting": {"prop":"address"}
                        },
                        {
                            "dataPath": "/contact",
                            "element": "column",
                            "setting": {"prop":"contact"}
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