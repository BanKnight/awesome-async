let awesome = require("../lib")

async function producer()
{
    awesome.realize("msg","1")

    for(let i = 0; i < 14;++i)
    {
        await awesome.wish("idle")

        awesome.realize("msg",i)
    }
}

async function consumer()
{
    for(let i = 0;i < 15;++i)
    {
        let msg = await awesome.wish("msg")

        console.log("get msg:" + msg)

        await awesome.realize("idle")
    }
}
setImmediate(consumer)
setImmediate(producer)
