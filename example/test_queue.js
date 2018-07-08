let awesome = require("../lib")

async function thread(thread_name)
{
    console.log(`[${Date.now()}] ${thread_name} begin to get first`)

    await awesome.first("mutex")

    console.log(`[${Date.now()}] ${thread_name} become first`)

    setTimeout(() =>
    {
        console.log(`[${Date.now()}] ${thread_name} unfirst`)

        awesome.unfirst("mutex")

    }, 3000)
}

awesome.safe_first("mutex", () =>
{
    console.log("do something1")
})

awesome.safe_first("mutex", () =>
{
    console.log("do something2")
})

for (let i = 0; i < 3; ++i)
{
    setImmediate(() =>
    {
        thread(`thread_${i}`)
    })
}


