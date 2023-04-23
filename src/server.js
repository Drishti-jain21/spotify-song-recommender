import express from "express"
import path from "path"
import {PORT} from './constants.js'
import { getSpotifyAcessToken, searchSongs,getRecommendedSongs } from "./spotify.utlis.js"

const rootDirectory = path.resolve()

const app = express()
app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.status(400).sendFile(rootDirectory + "/public/index.html")

})

app.get('/recommendations', async (req,res)=>{
    const { 
        title1,
        artist1,
        title2,
        artist2,
        title3,
        artist3,
    } = req.query || null

    if(!title1 || !artist1 || !title2 || !artist2 || !title3 || !artist3){
        res.json({
            message: "Please provide valid data"
        })
        return
    }
    try{
        const accessToken = await getSpotifyAcessToken()
        const songTitles = [title1, title2, title3];
        const artistNames = [artist1, artist2, artist3];
        const songsId = []
        for(let i=0;i<3;i++){
            const searchedSong = await searchSongs(accessToken,songTitles[i],artistNames[i])
            if(!searchedSong){
                res.status(404).json({
                    message: "That song is not available"
                })
                return
            }
            songsId.push(searchedSong.id)
        }
        const recommendedSongs = await getRecommendedSongs(accessToken,songsId)
        res.json(recommendedSongs)

    } catch(err){
        console.log(err.message)
        res.status(500).json({message: "something failed"})
    }
})

app.listen(PORT, ()=>
    console.log(`The application has started on http://localhost:${PORT}`)
)