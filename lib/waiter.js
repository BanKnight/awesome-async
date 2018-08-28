let coroutine = require("./head")

let data = new Map()

/**
 * waiting for someone to give what you want
 * @param {name} name 
 */
coroutine.wait = async function (name)
{
    let exist = data.get(name)

    if (exist == null)
    {
        exist = []
        data.set(name, exist)
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
coroutine.wake = function (name, result)
{
    let exist = data.get(name)
    if (exist == null)
    {
        return
    }

    data.delete(name)
    for (let i = 0, len = exist.length; i < len; ++i)
    {
        let resolve = exist[i]

        resolve(result)
    }
}

