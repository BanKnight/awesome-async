let queue = require("./head")

let data = new Map()

/**
 * if your are the first one,return right once
 * @param {name} key 
 */
queue.first = async function (name)
{
    let exist = data.get(name)

    if (exist == null)
    {
        data.set(name, [])
        return
    }

    return new Promise((resolve) =>
    {
        exist.push(resolve)
    })
}

/**
 * quit form the first,then next will return
 * @param {lock-name} name 
 */
queue.unfirst = function (name)
{
    let exist = data.get(name)
    if (exist == null)
    {
        return
    }

    if (exist.length == 0)
    {
        data.delete(name)
        return
    }

    exist.shift()()
}
/**
 * @return:true if you are the first,false when you can't
 */
queue.try_first = function (name)
{
    let exist = data.get(name)

    if (exist == null)
    {
        data.set(name, [])
        return true
    }

    return false
}
/**
 * 
 * @param {*} name 
 * @param {*} cb 
 */
queue.safe_first = async function (name, cb)
{
    try
    {
        await queue.first(name)

        cb()
    }
    catch (e)
    {
        queue.unfirst(name)
        throw e
    }

    queue.unfirst(name)
}
