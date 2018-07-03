let awesome = require("../lib")

let players = {}

async function thread(name)
{
    console.log(`${name} start wait`)

    let player = await awesome.wait("player")

    if(player == null)
    {
        console.log(`${name} start load player`)

        player = { id : 1}

        players[player.id] = player

        awesome.wake("player",player)

        console.log(`${name} stop load player`)
    }
    else
    {
        console.log(`${name} get the player success`)
    }
}

for(let i = 0;i < 5;++i)
{
    setImmediate(()=>
    {
        thread(`thread_${i}`)
    })
}
