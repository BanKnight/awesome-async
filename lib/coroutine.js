let coroutine = require("./head")

let data = {}

/**
 * coroutine to get something,if not,just wait
 * @param {name} name 
 */
coroutine.wait = async function (name)
{
    let exist = data[name]

    if (exist == null)
    {
        data[name] = []
        return
    }

    return new Promise((resolve) =>
    {
        exist.push(resolve)
    })
}

/**
 * give what they want so that they no longer wait
 * 
 * @param {*} name 
 * @param {*} result 
 */
coroutine.wake = function(name,result)
{
    let exist = data[name]

    delete data[name]

    if (exist == null)
    {
        return
    }

    for (let i = 0, len = exist.length; i < len; ++i)
    {
        let resolve = exist[i]

        resolve(result)
    }
}

