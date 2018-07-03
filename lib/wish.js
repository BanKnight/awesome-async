let wish = require("./head")

let data = {}

/**
 * wish to get something,if not,just wait
 * @param {name} name 
 */
wish.wish = async function (name)
{
    let exist = data[name]

    if (exist == null)
    {
        exist = []
        data[name] = exist
    }

    return new Promise((resolve) =>
    {
        exist.push(resolve)
    })
}

/**
 * 
 * 
 * @param {*} name 
 * @param {*} result 
 */
wish.realize = function(name,result)
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

