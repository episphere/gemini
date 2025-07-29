// get the data
txt = await (await fetch('https://raw.githubusercontent.com/episphere/gemini/main/doc/Electronic%20path%20data%20example(Sheet1).csv')).text()
rows = txt.split(/\r\n/).slice(0, -1)
// blank tail removed
rows = rows.map(function(row) {
    return {
        txt: row,
        report_id: row.match(/[\w]+/)[0]
    }
})
// read schema
schema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Cervical Health Data",
    "description": "A schema for recording basic cervical health indicators.",
    "type": "object",
    "properties": {
        "Chronic cervicitis": {
            "description": "Indicates the presence or absence of chronic cervicitis.",
            "type": "string",
            "enum": ["yes", "no"]
        },
        "HPV 18": {
            "description": "Indicates the presence or absence of HPV type 18.",
            "type": "string",
            "enum": ["yes", "no"]
        },
        "Transformation Zone/Endocervical Glands": {
            "description": "Indicates the presence or absence of the transformation zone or endocervical glands.",
            "type": "string",
            "enum": ["Present", "Absent"]
        }
    },
    "required": ["Chronic cervicitis", "HPV 18", "Transformation Zone/Endocervical Glands"]
}

extractNico = async function(i) {
    let session = await LanguageModel.create()
    // start new session
    let res = await session.prompt(rows[i].txt, {
        responseConstraint: schema
    })
    res = JSON.parse(res)
    return  {
        "Chronic cervicitis": res["Chronic cervicitis"],
        "HPV 18": res["HPV 18"],
        "Transformation Zone/Endocervical Glands": res["Transformation Zone/Endocervical Glands"]
    }
}
export {
    extractNico
}
