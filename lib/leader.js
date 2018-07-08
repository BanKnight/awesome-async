let exploration = require("./head")

let data = {}

/**
 * lead the queue,if you are the leader,you must tell others the result,
 * then they all can get your result
 * @param {} name 
 * @return [is_leader,the result]
 */
exploration.lead = async function (name)
{
    let exist = data[name]

    if (exist == null)
    {
        data[name] = []
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
    let exist = data[name]
    if (exist == null)
    {
        return
    }

    delete data[name]

    let ret = [false, result]

    for (let i = 0, len = exist.length; i < len; ++i)
    {
        let resolve = exist[i]

        resolve(ret)
    }
}

