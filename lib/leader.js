let exploration = require("./head")

let data = new Map()

/**
 * lead the queue,if you are the leader,you must tell others the result,
 * then they all can get your result
 * @param {} name 
 * @return [is_leader,the result]
 */
exploration.lead = async function (name)
{
    let exist = data.get(name)

    if (exist == null)
    {
        data.set(name, [])
        return [true]
    }

    return new Promise((resolve) =>
    {
        exist.push(resolve)
    })
}

/**
 * 
 * @param {*} name 
 * @param {*} result 
 */
exploration.unlead = function (name, result)
{
    let exist = data.get(name)
    if (exist == null)
    {
        return
    }

    data.delete(name)

    let ret = [false, result]

    for (let i = 0, len = exist.length; i < len; ++i)
    {
        let resolve = exist[i]

        resolve(ret)
    }
}

